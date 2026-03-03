from pydantic import BaseModel

class ChatRequest(BaseModel):
    message:str

class ChatResponse(BaseModel):
    summary: Optional[str]
    route : str
    generated_sql: str
    colums: List[str]
    rows: List[list[Any]]
    row_count: int
    latency: float