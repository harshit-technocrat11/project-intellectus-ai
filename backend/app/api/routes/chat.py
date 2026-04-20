import os
import json
from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.responses import StreamingResponse
from openai import AsyncOpenAI
import dotenv
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

# Internal Imports
from app.services.tools.db_tools import query_tenant_db 
from app.auth.context import get_tenant_id
from app.db.session import get_db

dotenv.load_dotenv()

router = APIRouter(prefix="/chat", tags=["chat"])
client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Define the tool for the LLM
tools = [
    {
        "type": "function",
        "function": {
            "name": "query_tenant_db",
            "description": "Query the company database for facts like employees, projects, and revenue.",
            "parameters": {
                "type": "object",
                "properties": {
                    "sql_query": {
                        "type": "string",
                        "description": "The SQL SELECT query to run."
                    }
                },
                "required": ["sql_query"]
            }
        }
    }
]

async def stream_intellectus(messages, tenant_id: str, db: AsyncSession):
    try:
        # 1. Decision Phase: Ask LLM if it needs a tool
        response = await client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are Intellectus AI. Use query_tenant_db for any workspace-specific data questions."},
                *messages
            ],
            tools=tools,
            tool_choice="auto"
        )

        response_message = response.choices[0].message
        tool_calls = response_message.tool_calls

        # 2. Execution Phase: If tool called, fetch URL from Neon and connect to Tenant DB
        if tool_calls:
            messages.append(response_message)
            
            for tool_call in tool_calls:
                function_args = json.loads(tool_call.function.arguments)
                sql = function_args.get("sql_query")
                
                yield f"🔍 [TRACE: Executing SQL for Tenant {tenant_id}...]\n\n"
                
                try:
                    # SECURE LOOKUP: Get the URL matching this specific tenant
                    query = text("SELECT connection_url FROM connectors WHERE tenant_id = :tid AND type = 'supabase'")
                    result = await db.execute(query, {"tid": tenant_id})
                    connector_url = result.scalar()

                    if not connector_url:
                        tool_result = "Error: No data connector found for this workspace."
                    else:
                        # Call the tool with the dynamic URL
                        tool_result = await query_tenant_db(sql, connector_url)
                        
                except Exception as tool_err:
                    tool_result = f"Error in DB Tool: {str(tool_err)}"
                
                messages.append({
                    "tool_call_id": tool_call.id,
                    "role": "tool",
                    "name": "query_tenant_db",
                    "content": str(tool_result),
                })
        
        # 3. Final Answer Phase: Stream the synthesized response
        stream = await client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are Intellectus AI. Provide technical, data-driven answers using proper markdown formatting."},
                *messages
            ],
            stream=True,
        )

        async for chunk in stream:
            content = chunk.choices[0].delta.content
            if content:
                yield content

    except Exception as e:
        print(f"Error in stream: {e}")
        yield f" [Error: {str(e)}]"

@router.post("")
async def chat_interaction(
    payload: dict = Body(...),
    tenant_ctx: dict = Depends(get_tenant_id),
    db: AsyncSession = Depends(get_db)
):
    raw_messages = payload.get("messages", [])
    formatted_messages = [{"role": m["role"], "content": m["content"]} for m in raw_messages]
    
    tenant_id = tenant_ctx["tenant_id"]
    
    return StreamingResponse(
        stream_intellectus(formatted_messages, tenant_id, db), 
        media_type="text/event-stream"
    )