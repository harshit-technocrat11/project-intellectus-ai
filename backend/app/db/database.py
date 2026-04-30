from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base
import os
from app.core.config import settings

# making an Async connection 
DATABASE_URL = settings.INTELLECTUS_DB_URL.replace("sslmode=require", "ssl=true")

if "postgresql+asyncpg://" not in DATABASE_URL:
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://")

engine = create_async_engine(DATABASE_URL,pool_pre_ping=True, echo=False)

AsyncSessionLocal=  async_sessionmaker(
    bind= engine, 
    class_= AsyncSession, 
    expire_on_commit=False

)

# instance of intellectus NEON
async def get_db():
    async with AsyncSessionLocal() as session:
        yield session