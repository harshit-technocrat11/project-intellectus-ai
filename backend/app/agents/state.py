from typing import Annotated, TypedDict, List, Union
from langchain_core.messages import BaseMessage
from langgraph.graph.message import add_messages

class AgentState(TypedDict):
    # add_messages allows the graph to append new messages to history automatically
    messages: Annotated[List[BaseMessage], add_messages]
    # Context injected from the API/Auth layer
    org_id: str 
    user_id: str
    # Tracks which DB the agent is currently "looking at"
    active_connection_id: Union[str, None]