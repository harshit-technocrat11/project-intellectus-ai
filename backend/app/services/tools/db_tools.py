import psycopg2
from sqlalchemy import text

async def query_tenant_db(sql_query: str, tenant_id: int, db_session):
    """
    Looks up the connector URL for the specific tenant and executes SQL.
    """
    # 1. look up for url
    query = text("SELECT connection_url FROM connectors WHERE tenant_id = :tid AND type = 'supabase'")
    connector_url = (await db_session.execute(query, {"tid": tenant_id})).scalar()
    
    # 2. Connection and Execution
    try:
        conn = psycopg2.connect(connector_url)
        with conn.cursor() as cur:
            cur.execute(sql_query)
            return str(cur.fetchall())
    except Exception as e:
        return f"Database Error: {str(e)}"
    finally:
        if 'conn' in locals(): conn.close()