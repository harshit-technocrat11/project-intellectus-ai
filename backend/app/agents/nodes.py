import asyncio
from langchain_openai  import ChatOpenAI
from .state import AgentState
from app.core.config import settings
from langchain_core.runnables.config import RunnableConfig   

api_key = settings.OPENAI_API_KEY

llm = ChatOpenAI(model="gpt-4o", streaming=True, api_key=api_key)

async def call_model_node(state: AgentState, config: RunnableConfig):
    """Reasoning Engine: Decisions and Planning."""
    # Discover tools passed from the MCP client in the config
    tools = config.get("configurable", {}).get("tools", [])
    model = llm.bind_tools(tools)
    
    # Generate response (includes potential tool calls)
    response = await model.ainvoke(state["messages"])
    return {"messages": [response]}

async def execute_tools_node(state: AgentState, config: RunnableConfig):
    """Async Tool Interface: Handles parallel tool execution."""
    last_message = state["messages"][-1]
    tool_calls = last_message.tool_calls
    
    # Component: MCP Tool Interface (Async Execution)
    # We create a list of coroutines to run them in parallel
    # NOTE: You will implement 'dispatch_tool_call' in your tools/ layer
    from backend.app.tools.utils.dispatcher import dispatch_tool_call
    
    tasks = [
        dispatch_tool_call(call, org_id=state["org_id"]) 
        for call in tool_calls
    ]
    
    # Run all tool calls simultaneously to avoid context bloat/latency
    tool_outputs = await asyncio.gather(*tasks)
    
    return {"messages": tool_outputs}