import asyncio
from langchain_core.messages import ToolMessage
from langchain_mcp_adapters.client import MultiServerMCPClient

async def dispatch_tool_call(tool_call: dict, org_id: str):
    tool_name = tool_call["name"]
    tool_args = tool_call["args"]

    # Inject tenant context
    tool_args["org_id"] = org_id

    try:
        # ✅ create client (NO async with)
        client = MultiServerMCPClient({
            "internal": {
                "url": "http://localhost:8000/mcp",
                "transport": "streamable_http",  # ✅ correct transport
            }
        })

        # ✅ get tools
        tools = await client.get_tools()

        # ✅ find the correct tool
        tool = next(t for t in tools if t.name == tool_name)

        # ✅ call tool
        result = await tool.ainvoke(tool_args)

        return ToolMessage(
            tool_call_id=tool_call["id"],
            content=str(result)
        )
    except Exception as e:
        return ToolMessage(
            tool_call_id=tool_call["id"],
            content=f"Error executing {tool_name}: {str(e)}",
            status="error"
        )