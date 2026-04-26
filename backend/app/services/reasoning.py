from typing import Annotated, TypedDict
from langgraph.graph import StateGraph, END
from langgraph.prebuilt import ToolNode
from langchain_openai import ChatOpenAI
from langchain_core.messages import BaseMessage, SystemMessage
from langchain_core.tools import tool
from app.mcp.client import mcp_client
from app.core.config import settings
from langgraph.graph.message import add_messages

# 1. State Definition
class AgentState(TypedDict):
    messages: Annotated[list[BaseMessage], add_messages]
    tenant_id: str

# openai key
api_key= settings.OPENAI_API_KEY

# 2. Tool Definition (The Hands)
@tool
async def query_company_database(tenant_id: str, sql_query: str):
    """
    Executes a PostgreSQL query against the workspace database.
    Use for metrics, employee lists, or financial data.
    """
    return await mcp_client.execute_tenant_query(tenant_id, sql_query)

# 3. Logic Node
class IntellectusBrain:
    def __init__(self):
        self.llm = ChatOpenAI(model="gpt-4o", temperature=0, streaming=True,api_key=api_key)
        self.tools = [query_company_database]
        self.llm_with_tools = self.llm.bind_tools(self.tools)

    async def call_model(self, state: AgentState):
        messages = state['messages']
        tenant_id = state['tenant_id']
        
        # Injecting tenant identity into the system context
        system_msg = SystemMessage(content=f"You are Intellectus AI for tenant {tenant_id}. Use tools for data.")
        response = await self.llm_with_tools.ainvoke([system_msg] + messages)
        return {"messages": [response]}

    def build_graph(self):
        workflow = StateGraph(AgentState)
        
        # Add Nodes
        workflow.add_node("agent", self.call_model)
        workflow.add_node("action", ToolNode(self.tools))
        
        # Define Edges
        workflow.set_entry_point("agent")
        workflow.add_conditional_edges(
            "agent",
            lambda x: "action" if x["messages"][-1].tool_calls else END
        )
        workflow.add_edge("action", "agent")
        
        return workflow.compile()

intellectus_brain = IntellectusBrain().build_graph()