import os
from dotenv import load_dotenv
from fastmcp import FastMCP
import pandas as pd
from typing import Dict, List, Any
from sqlalchemy import create_engine, text
from tavily import TavilyClient
import logging

load_dotenv();

# Initialize the Universal Specialist Hub
mcp = FastMCP("Intellectus-Specialist-Hub")

tavily = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("mcp-server")

@mcp.tool()
async def execute_sql(target_connection_url: str, sql_query: str) -> List[Dict[str, Any]]:
    """
    Execute a SQL query on a database using the provided connection URL.
    
    Args:
        target_connection_url: The database connection URL.
        sql_query: The SQL query to execute. Only SELECT queries are allowed.
    """
    logger.info("Executing SQL Specialist Task...")
    engine = create_engine(target_connection_url)
    try:
        async with engine.connect() as conn:
            result = await conn.execute(text(sql_query))
            rows= [dict(row) for row in result.fetchall()]
            
            if not rows:
                return "Query successful, but no data was found."
            
            return rows
        
        
    except Exception as e:
        return f"❌ database query failed: {str(e)}"
    finally:
        await engine.dispose()


if __name__ == "__main__":
    # Standard SSE transport for microservices
    mcp.run(
        transport="http",
        host="127.0.0.1", 
        port=8001,
       
        path="/mcp"
        )