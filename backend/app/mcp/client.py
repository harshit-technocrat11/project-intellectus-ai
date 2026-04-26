import logging
from fastmcp import Client
from app.db.session import engine as master_engine
from sqlalchemy import text

logger = logging.getLogger("mcp-dispatcher")

class IntellectusMCPDispatcher:
    def __init__(self):
        # Create a client using the modern syntax
        self.client = Client("http://localhost:8001/mcp")

    async def call_tool(self, tool_name: str, arguments: dict):
        """Call a tool on the MCP server."""
        async with self.client:
            result = await self.client.call_tool(tool_name, arguments)
            return result.content[0].text

    async def execute_tenant_query(self, tenant_id: str, query: str):
        """
        The Gatekeeper: Resolves credentials and injects them 
        into the specialist call.
        """
        try:
            # 1. Identity Resolution (Backend only has access to Neon)
            async with master_engine.connect() as conn:
                res = await conn.execute(
                    text("SELECT connection_url FROM connectors WHERE tenant_id = :tid"),
                    {"tid": tenant_id}
                )
                secret_url = res.scalar()

            if not secret_url:
                return "❌ Error: This workspace has no linked database."

            # 2. Networked Execution (Injecting the resolved URL)
            return await self.call_tool("execute_sql", {
                "target_connection_url": secret_url,
                "sql_query": query
            })

        except Exception as e:
            logger.error(f"MCP Dispatcher Error: {e}")
            return f"⚠️ System Error: {str(e)}"

mcp_client = IntellectusMCPDispatcher()   