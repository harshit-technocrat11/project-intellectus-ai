import psycopg2
from mcp.server.fastmcp import FastMCP
# 

# TESTING 

mcp = FastMCP("DB-Connector")

@mcp.tool()
def query_tenant_db(sql_query: str, db_url: str) -> str:
    """
    Executes a read-only SQL query against a tenant's specific database.
    Args:
        sql_query: The SQL SELECT statement to execute.
        db_url: The connection string for the tenant's database.
    """
    # Safety check: Force read-only
    if not sql_query.strip().upper().startswith("SELECT"):
        return "Error: Only SELECT queries are allowed for security."

    try:
        conn = psycopg2.connect(db_url)
        with conn.cursor() as cur:
            cur.execute(sql_query)
            columns = [desc[0] for desc in cur.description]
            results = [dict(zip(columns, row)) for row in cur.fetchall()]
            
            if not results:
                return "Query executed successfully. No rows returned."
                
            return str(results)
    except Exception as e:
        return f"Database Error: {str(e)}"
    finally:
        if 'conn' in locals(): 
            conn.close()