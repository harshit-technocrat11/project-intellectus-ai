from dotenv import load_dotenv
load_dotenv()

import os
from contextlib import asynccontextmanager

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from openai import OpenAI

from app.core.database import get_db, engine
from app.intelligence.sql_executor import execute_sql
from app.models.base import Base

import app.models.business
import app.models.people
import app.models.system


# 🔹 Lifespan manager (modern replacement for on_event)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup logic
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    print("Database initialized successfully.")

    yield

    # Shutdown logic (if needed later)
    await engine.dispose()
    print("Engine disposed.")


app = FastAPI(lifespan=lifespan)


# 🔹 CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# 🔹 DB health check
@app.get("/")
async def test_db(db: AsyncSession = Depends(get_db)):
    result = await db.execute(text("SELECT 1"))
    return {"db_status": result.scalar()}


# 🔹 Query endpoint
@app.post("/query")
async def query(sql: str, db: AsyncSession = Depends(get_db)):
    return await execute_sql(db, sql)