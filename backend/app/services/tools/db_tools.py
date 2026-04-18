# MCP tool test

import os 
from mcp.server.fastmcp import FastMCP
import psycopg2
from dotenv import load_dotenv

mcp = FastMCP("DexterDB-1")

@mcp.tool()
def query_dexter_db(sql_query: str)-> str:
    """
    Executes a read-only SQL SELECT query against the Dexter Corp Supabase database.
    """
    db_url = os.getenv("DEXTER_SUPABASE_URL")

    try:
        conn = psycopg2.connect(db_url)
        with conn.cursor() as cur:
            cur.execute(sql_query)
            columns = [desc[0] for desc in cur.description]
            results = [dict(zip(columns, row)) for row in cur.fetchall()]
            return str(results)
    except Exception as e:
        return f"Database Error: {str(e)}"
    finally:
        if 'conn' in locals(): conn.close()