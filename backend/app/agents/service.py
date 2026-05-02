from langchain_mcp_adapters.client import MultiServerMCPClient
from .workflows import create_intellectus_agent

# Instantiate once
agent_executor = create_intellectus_agent()

# ✅ Initialize MCP client ONCE (global, not per request)
mcp_client = MultiServerMCPClient({
    "internal": {
        "url": "http://localhost:8000/mcp",
        "transport": "streamable_http",  # ✅ FIX transport
    }
})

# Optional: cache tools (better performance)
mcp_tools_cache = None


async def run_intellectus_session(query: str, org_id: str, thread_id: str):
    """Entry point for the Chat API."""
    global mcp_tools_cache

    # ✅ Fetch tools once (lazy load)
    if mcp_tools_cache is None:
        mcp_tools_cache = await mcp_client.get_tools()

    config = {
        "configurable": {
            "thread_id": thread_id,
            "tools": mcp_tools_cache
        }
    }

    async for event in agent_executor.astream_events(
        {
            "messages": [("user", query)],
            "org_id": org_id,
            "thread_id": thread_id
        },
        config,
        version="v2"
    ):
        yield event