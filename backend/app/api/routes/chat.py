import os
from fastapi import APIRouter, Body
from fastapi.responses import StreamingResponse
from openai import AsyncOpenAI # Use the Async version
import dotenv

dotenv.load_dotenv()

router = APIRouter(prefix="/chat", tags=["chat"])

# Initialize the ASYNC client 
client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

async def stream_intellectus(messages):
    try:
        stream = await client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are Intellectus AI. Provide technical, data-driven answers."},
                *messages
            ],
            stream=True,
        )
        
        # Async iteration over the stream chunks
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
    
    formatted_messages = [
        {"role": m["role"], "content": m["content"]} 
        for m in raw_messages
    ]
    
    return StreamingResponse(
        stream_intellectus(formatted_messages), 
        media_type="text/event-stream"
    )