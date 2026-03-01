# app/intelligence/sql_executor.py

from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Dict, Any, List


async def execute_sql(
    session: AsyncSession,
    sql: str
) -> Dict[str, Any]:

    try:
        result = await session.execute(text(sql))

        rows = result.fetchall()
        columns = result.keys()

        data: List[List[Any]] = [
            list(row) for row in rows
        ]

        return {
            "columns": list(columns),
            "rows": data,
            "row_count": len(data)
        }

    except Exception as e:
        raise Exception(f"SQL Execution Error: {str(e)}")