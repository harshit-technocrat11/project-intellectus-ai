from langgraph.graph import StateGraph, START, END
from .state import AgentState
from .nodes import call_model_node, execute_tools_node

def should_continue(state: AgentState):
    """Guardrails: Logic to decide if we exit or call tools."""
    last_message = state["messages"][-1]
    if last_message.tool_calls:
        return "tools"
    return END

def create_intellectus_agent():
    # Initialize the Orchestration Layer
    workflow = StateGraph(AgentState)

    # Add our components
    workflow.add_node("agent", call_model_node)
    workflow.add_node("tools", execute_tools_node)

    # Define the workflow logic
    workflow.add_edge(START, "agent")
    workflow.add_conditional_edges("agent", should_continue)
    workflow.add_edge("tools", "agent")

    # Compile with persistence (Memory System)
    # NOTE: 'checkpointer' will be your Neon/Postgres connection
    return workflow.compile()