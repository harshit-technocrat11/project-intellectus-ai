from fastmcp import FastMCP
import pandas as pd
from sqlalchemy import create_engine, text
# importing - master- database for lookup
from app.db.session import engine as master_engine 
import logging

# Initialize 
mcp = FastMCP("Intellectus-DB-Specialist")

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("mcp-db-server")

# decorator
@mcp.tool() 
async def query_workspace_data(tenant_id: str, sql_query: str) -> str:
    """
    Acts as an intelligent bridge. Automatically resolves the secure 
    connection for the given tenant and executes the SQL.
    
    Args:
        tenant_id: The unique identifier for the company (e.g., 'dexter_corp').
        sql_query: The PostgreSQL query to execute.
    """
    logger.info(f"Resolving credentials for tenant: {tenant_id}")
    
    # 1. Internal Credential Resolution (The Identity Bridge)
    try:
        async with master_engine.connect() as conn:
            result = await conn.execute(
                text("SELECT connection_url FROM connectors WHERE tenant_id = :tid"),
                {"tid": tenant_id}
            )
            connection_url = result.scalar()

        if not connection_url:
            return f"❌ Error: No database configured for tenant {tenant_id}"

        # 2. target execution- temporary connection estb--then break
        target_engine = create_engine(connection_url)
        with target_engine.connect() as connection:
            df = pd.read_sql_query(text(sql_query), connection)
        
        target_engine.dispose() # cleanup

        if df.empty:
            return "Query successful, but no data matches your criteria."
            
        return df.to_markdown(index=False)

    except Exception as e:
        logger.error(f"Execution failed: {str(e)}")
        return f"❌ SQL Error: {str(e)}"

if __name__ == "__main__":
    mcp.run(transport="stdio")