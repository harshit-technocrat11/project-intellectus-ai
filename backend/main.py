from dotenv import load_dotenv
import uvicorn
from fastapi import Depends
from app.auth.auth import get_current_user_id

load_dotenv()

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db.models.base import Base

from app.api.routes import  chat

app = FastAPI()

@app.get("/api/routes/")
async def get_tenant_config( clerk_id: str = Depends( get_current_user_id)): 
    return {"status": "authenticated", "clerk_id":clerk_id}



app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# protected middleware - for authentication
app.include_router(
    chat.router,
    prefix="/api",
    dependencies=[Depends(get_current_user_id)]
    )


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)