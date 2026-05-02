from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from urllib.parse import urlparse, parse_qs, urlencode, urlunparse
from app.core.config import settings


def clean_db_url(url: str) -> str:
    parsed = urlparse(url)
    query = parse_qs(parsed.query)

    # ❌ remove unsupported params
    query.pop("channel_binding", None)
    query.pop("sslmode", None)

    new_query = urlencode(query, doseq=True)
    return urlunparse(parsed._replace(query=new_query))


# --- CLEAN URL ---
DATABASE_URL = clean_db_url(settings.INTELLECTUS_DB_URL)

# --- FORCE asyncpg ---
if DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = DATABASE_URL.replace(
        "postgresql://", "postgresql+asyncpg://", 1
    )

# --- ENGINE ---
engine = create_async_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    echo=False,
    connect_args={
        "ssl": True,  # ✅ THIS is the correct SSL for asyncpg
        "server_settings": {"search_path": "public"},
    }
)

# --- SESSION ---
AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

# --- DEPENDENCY ---
async def get_db():
    async with AsyncSessionLocal() as session:
        yield session