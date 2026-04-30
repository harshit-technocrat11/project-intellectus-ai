from fastapi import APIRouter, Depends, Body
from fastapi.responses import StreamingResponse
from app.auth.context import get_tenant_id # Your Clerk helper
from app.services.reasoning import intellectus_brain
from langchain_core.messages import HumanMessage

router = APIRouter(prefix="/chat", tags=["chat"])

@router.post("")
async def chat_interaction(
    payload: dict = Body(...), 
    tenant_ctx: dict = Depends(get_tenant_id)
):
    user_input = payload["messages"][-1]["content"]
    tenant_id = tenant_ctx["tenant_id"] # Extracted from Clerk JWT

    async def stream_generator():
        # INPUTS for the graph
        inputs = {"messages": [HumanMessage(content=user_input)]}
        
        # CONFIG: This is where we securely pass the tenant_id 
        # so the tools can access it via the 'ctx' argument
        config = {"configurable": {"tenant_id": tenant_id}}
        
        async for event in intellectus_brain.astream_events(
            inputs, 
            config=config, 
            version="v2"
        ):
            kind = event["event"]
            
            # Stream AI text
            if kind == "on_chat_model_stream":
                content = event["data"]["chunk"].content
                if content:
                    yield content
            
            # Stream "Thinking" trace for your UI Source Panel
            elif kind == "on_tool_start":
                yield f"\n[Status: Accessing {event['name']}...]\n"

    return StreamingResponse(stream_generator(), media_type="text/event-stream")