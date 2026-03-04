from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text

# returns the retrieved rows[] and cols[]

class SQLExecutor :

    async def execute( self, db: AsyncSession, sql: str):
        result = await db.execute(text(sql))
        rows = result.fetchall()
        columns = result.keys()

        return {
            "columns": list(columns),
            "rows": [list(row) for row in rows],
            "row_count": len(rows)
        }