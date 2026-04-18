import os
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv

load_dotenv()

# temporary - connection

def get_tenant_connection(tenant_name="Dexter Corp Pvt Ltd"):
    """Fetches the Supabase connection string from the Neon Control Plane."""
    try:
        conn = psycopg2.connect(os.getenv("INTELLECTUS_DB_URL"))
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
          
            query = "SELECT connection_url FROM connectors WHERE source_name = %s LIMIT 1;"
            cur.execute(query, (tenant_name,))
            result = cur.fetchone()
            return result['connection_url'] if result else None
    except Exception as e:
        print(f"Neon Lookup Error: {e}")
        return None
    finally:
        if 'conn' in locals(): conn.close()