import os
import json
from fastapi import APIRouter, Body
from fastapi.responses import StreamingResponse
from openai import AsyncOpenAI
import dotenv
from app.services.tools.db_tools import query_dexter_db 
dotenv.load_dotenv()

router = APIRouter(prefix="/chat", tags=["chat"])
client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))


tools = [
    {
        "type": "function",
        "function": {
            "name": "query_dexter_db",
            "description": "Query the Dexter Corp database for live facts (employees, projects, revenue).",
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

async def stream_intellectus(messages):
    try:
       
        response = await client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are Intellectus AI. Use the query_dexter_db tool for any questions about Dexter Corp's data."},
                *messages
            ],
            tools=tools,
            tool_choice="auto"
        )

        response_message = response.choices[0].message
        tool_calls = response_message.tool_calls

  
        if tool_calls:
            messages.append(response_message)
            
            for tool_call in tool_calls:
            
                function_args = json.loads(tool_call.function.arguments)
                sql = function_args.get("sql_query")
                
                yield f"🔍 [TRACE: Querying Supabase for: {sql}]\n\n"
                
             
                try:
                    tool_result = query_dexter_db(sql)
                except Exception as tool_err:
                    tool_result = f"Error in DB Tool: {str(tool_err)}"
                
                messages.append({
                    "tool_call_id": tool_call.id,
                    "role": "tool",
                    "name": "query_dexter_db",
                    "content": str(tool_result),
                })
       
        stream = await client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are Intellectus AI. Provide technical, data-driven answers based on the tool results provided. Please return the data using proper spacing and all ... "},
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
async def chat_interaction(payload: dict = Body(...)):
    raw_messages = payload.get("messages", [])
    formatted_messages = [{"role": m["role"], "content": m["content"]} for m in raw_messages]
    
    return StreamingResponse(
        stream_intellectus(formatted_messages), 
        media_type="text/event-stream"
    )