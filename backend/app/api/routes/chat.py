import json
from fastapi import APIRouter, Depends, Body, HTTPException
from fastapi.responses import StreamingResponse
from app.auth.context import get_tenant_id  # Using your specific helper
from app.agents.service import run_intellectus_session 

router = APIRouter(prefix="/chat", tags=["chat"])

@router.post("")
async def chat_interaction(
    payload: dict = Body(...), 
    tenant_ctx: dict = Depends(get_tenant_id)
):
    """
    Primary entry point for the Agentic Reasoning loop.
    Enforces Multi-tenant isolation via get_tenant_id.
    """
    # 1. Extract and Validate Input
    try:
        # Get the latest message content from the frontend payload
        user_input = payload["messages"][-1]["content"]
        
        # Memory System: thread_id is used to resume state from Neon
        thread_id = payload.get("thread_id")
        if not thread_id:
            raise HTTPException(status_code=400, detail="thread_id is required for session persistence")
            
    except (KeyError, IndexError):
        raise HTTPException(status_code=400, detail="Invalid message payload structure")

    # 2. Extract context from your auth helper
    tenant_id = tenant_ctx["tenant_id"] 

    async def stream_generator():
        # 3. Call the Orchestration Layer (LangGraph + MCP Discovery)
        # We pass tenant_id to ensure the Reasoning Engine is scoped
        async for event in run_intellectus_session(
            query=user_input, 
            org_id=tenant_id, 
            thread_id=thread_id
        ):
            kind = event["event"]
            
            # --- Reasoning Engine Output (Text Stream) ---
            if kind == "on_chat_model_stream":
                content = event["data"]["chunk"].content
                if content:
                    # Yield structured JSON for the frontend to parse
                    yield f"data: {json.dumps({'type': 'text', 'content': content})}\n\n"
            
            # --- UI Trace Panel (Thinking Steps) ---
            elif kind == "on_tool_start":
                tool_name = event['name']
                # Standardized tool/call notification for the user
                yield f"data: {json.dumps({'type': 'trace', 'content': f'Running {tool_name}...'})}\n\n"
            
            elif kind == "on_tool_end":
                # Signal that a specific tool execution is finished
                yield f"data: {json.dumps({'type': 'trace', 'content': '✔ Step completed'})}\n\n"

    # 4. Return as a REST stream (EventStream)
    return StreamingResponse(stream_generator(), media_type="text/event-stream")