# from sqlalchemy.ext.asyncio import (
#     AsyncSession,
#     create_async_engine,
#     async_sessionmaker
# )
# from sqlalchemy.orm import declarative_base
# from typing import AsyncGenerator
# import os

# DATABASE_URL = os.getenv("DATABASE_URL")
# if ( DATABASE_URL): 
#     print( "database url is fine !")
# # Format:
# # postgresql+asyncpg://user:password@host:port/dbname

# engine = create_async_engine(
#     DATABASE_URL,
#     echo=True
# )

# AsyncSessionLocal = async_sessionmaker(
#     bind=engine,
#     expire_on_commit=False
# )

# Base = declarative_base()


# async def get_db() -> AsyncGenerator[AsyncSession, None]:
#     async with AsyncSessionLocal() as session:
#         yield session