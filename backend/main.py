from fastapi import FastAPI
from pydantic import BaseModel

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


class ChatRequest(BaseModel):
    message: str

    
app.add_middleware(
    CORSMiddleware,
    allow_origins =  ["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers = ["*"]
)

@app.get("/")
async def root():
    return {"status":"Backend running" }

@app.post("/chat")
async def chat( req: ChatRequest):
    return {
        "reply": f"You said: {req.message}"
    }

