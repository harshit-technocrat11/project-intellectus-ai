from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from app.core.config import settings
import re

def get_async_url(url: str) -> str:
    """
    Strips all query parameters to prevent driver conflicts 
    and ensures the asyncpg prefix.
    """
    # 1. Force the asyncpg driver prefix
    if url.startswith("postgresql://"):
        url = url.replace("postgresql://", "postgresql+asyncpg://", 1)
    
    # 2. REMOVE ALL QUERY PARAMETERS (Everything after the ?)
    # This removes sslmode, channel_binding, etc., from the string
    # so we can set them manually and safely below.
    url = url.split('?')[0]
    
    return url

# Clean the URL
DATABASE_URL = get_async_url(settings.INTELLECTUS_DB_URL)

engine = create_async_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    # Here is where we handle the SSL and Neon-specific settings safely
    connect_args={
        "ssl": "require", # This replaces sslmode=require safely
        "server_settings": {
            "jit": "off", # Recommended for Neon
            "client_encoding": "utf8"
        }
    }
)

AsyncSessionLocal = async_sessionmaker(
    bind=engine, 
    class_=AsyncSession, 
    expire_on_commit=False
)

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session