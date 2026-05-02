from fastapi import APIRouter, Depends, HTTPException
from fastapi_mcp import FastApiMCP
from sqlalchemy.orm import Session
from sqlalchemy import select
from typing import List, Dict

# Use existing modules in your program
from app.db.database import get_db
from app.models.generated import Connector
from app.tools.utils.db_executer import execute_dynamic_query

router = APIRouter()

@router.get("/list-databases", operation_id="list_databases")
async def list_databases(org_id: str, db: Session = Depends(get_db)):
    """
    Component: Tool Interface (MCP Discovery).
    Fetches available database names for the specific Organization.
    """
    # Guardrails: Ensure cross-tenant isolation
    statement = select(Connector).where(Connector.tenant_id == org_id)
    connectors = db.exec(statement).all()
    
    if not connectors:
        return {"message": "No databases connected for this organization."}
    
    return [
        {
            "connection_id": c.name, 
            "db_type": c.db_type, 
            "status": "active"
        } for c in connectors
    ]

@router.get("/get-schema", operation_id="get_schema")
async def get_schema(connection_id: str, org_id: str, db: Session = Depends(get_db)):
    """
    Component: Orchestration Layer (Progressive Discovery).
    Helps the agent 'see' table structures before writing SQL to avoid hallucination.
    """
    # Introspection query for Postgres/Supabase
    schema_query = """
        SELECT table_name, column_name, data_type 
        FROM information_schema.columns 
        WHERE table_schema = 'public'
        ORDER BY table_name;
    """
    # Calls your secure JIT execution service
    return await execute_dynamic_query(connection_id, schema_query, org_id, db)

@router.post("/execute-sql", operation_id="execute_sql")
async def execute_sql(
    connection_id: str, 
    query: str, 
    org_id: str, 
    db: Session = Depends(get_db)
):
    """
    Component: Reasoning Engine (Action Execution).
    Executes the generated SQL query securely using SQLAlchemy.
    """
    # Guardrails: Simple check for read-only safety
    forbidden_keywords = ["drop", "delete", "update", "insert", "truncate", "alter"]
    if any(keyword in query.lower() for keyword in forbidden_keywords):
        return {"error": "Only SELECT queries are permitted for security reasons."}

    # Execute and return result as JSON for the LLM
    return await execute_dynamic_query(connection_id, query, org_id, db)

# Mount the MCP server to expose these as tools
# Your MultiServerMCPClient in the agent will discover these automatically
