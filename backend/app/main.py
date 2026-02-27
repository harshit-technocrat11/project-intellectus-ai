import os
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from openai import OpenAI

from app.core.database import engine
from sqlalchemy import text

from app.models.base import Base

# Import models 
import app.models.business
import app.models.people
import app.models.system

Base.metadata.create_all(bind=engine)

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


api_key = os.getenv("OPENAI_API_KEY")
if ( api_key): 
    print("openai api key is legit!!")
else :
    print("openai api key not working")

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class ChatRequest(BaseModel):
    message: str
    

@app.get("/")
def test_db():
    with engine.connect() as connection:
        result = connection.execute(text("SELECT 1"))
        print("backend running - status 200")
        return {"db_status": result.scalar()}


@app.post("/chat")
async def chat(req: ChatRequest):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a helpful AI assistant."},
            {"role": "user", "content": req.message},
        ],
    )

    reply = response.choices[0].message.content

    return {"reply": reply}



