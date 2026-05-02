import re
import uuid
from typing import List, Dict, Any, Union
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text
from sqlalchemy.orm import  Session
from sqlalchemy import select

# Use the migrated models from your program
from app.models.generated import Connectors

def validate_sql_query(query: str) -> bool:
    """
    Guardrails: Basic SQL safety check.
    Ensures the agent only attempts SELECT operations.
    """
    forbidden_pattern = re.compile(
        r"\b(DROP|DELETE|UPDATE|INSERT|TRUNCATE|ALTER|CREATE|GRANT|REVOKE)\b", 
        re.IGNORECASE
    )
    if forbidden_pattern.search(query):
        return False
    # Ensure the query actually starts with SELECT
    return query.strip().upper().startswith("SELECT")

async def execute_dynamic_query(
    connection_name: str, 
    query: str, 
    tenant_id: Union[str, uuid.UUID], 
    control_plane_session: Session
) -> List[Dict[str, Any]]:
    """
    Component: Tool Interface (The 'standardized tool/call').
    1. Fetches connection URL from Neon.
    2. Validates SQL for safety.
    3. Executes query via JIT async engine.
    """
    
    # 1. Component: Guardrails & Safety (Input Validation)
    if not validate_sql_query(query):
        return [{"error": "Security Breach: Only SELECT queries are permitted."}]

    # 2. Fetch the Connector Metadata
    # Convert tenant_id string to UUID for the migrated schema
    target_tenant_id = uuid.UUID(str(tenant_id))
    
    statement = select(Connectors).where(
        Connectors.source_name == connection_name,
        Connectors.tenant_id == target_tenant_id
    )
    connector = control_plane_session.exec(statement).first()

    if not connector or not connector.connection_url:
        return [{"error": f"Connection '{connection_name}' not found for this tenant."}]

    # 3. Component: Tool Interface (Execution)
    # Ensure URL is using asyncpg driver: postgresql+asyncpg://
    raw_url = connector.connection_url
    if "postgresql://" in raw_url and "+asyncpg" not in raw_url:
        async_url = raw_url.replace("postgresql://", "postgresql+asyncpg://")
    else:
        async_url = raw_url

    # Create an ephemeral engine for this specific database call
    engine = create_async_engine(
        async_url, 
        pool_pre_ping=True,
        connect_args={"server_settings": {"search_path": "public"}}
    )

    try:
        async with engine.connect() as conn:
            # Set a statement timeout to prevent long-running queries
            await conn.execute(text("SET statement_timeout = '15s'"))
            
            result = await conn.execute(text(query))
            
            # Convert result rows into a list of dicts for the LLM
            return [dict(row) for row in result.mappings()]

    except Exception as e:
        return [{"error": f"Database Error: {str(e)}"}]
    
    finally:
        # Clean up the engine immediately to release the connection
        await engine.dispose()