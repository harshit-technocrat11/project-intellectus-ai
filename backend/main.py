import uvicorn
from contextlib import asynccontextmanager
from dotenv import load_dotenv

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession
# Internal imports
from app.auth.context import get_tenant_id
from app.db.session import engine, get_db
from app.auth.auth import get_user_clerk_id
from app.api.routes import chat

load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("🚀 Connecting to Intellectus Neon DB...")
    async with engine.begin() as conn:
        await conn.execute(text("SELECT 1"))
    yield
    print("🛑 Closing DB connections...")
    await engine.dispose()

app = FastAPI(title="Intellectus AI",lifespan=lifespan)

# --- MIDDLEWARE ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- GLOBAL ROUTES ---
app.get("/api/lookup")(get_tenant_id)

# --- ROUTERS ---
app.include_router(
    chat.router,
    prefix="/api", 
    dependencies=[Depends(get_user_clerk_id)]
)
if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)