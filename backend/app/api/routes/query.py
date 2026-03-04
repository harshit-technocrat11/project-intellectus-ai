from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.tools.sql.validator import validate_sql, SQLValidationError
from app.tools.sql.executor import execute_sql

router = APIRouter()

@router.post("/query")
async def query(sql: str, db: AsyncSession = Depends(get_db)):
    try:
        safe_sql = validate_sql(sql)
        return await execute_sql(db, safe_sql)
    except SQLValidationError as e:
        raise HTTPException(status_code=400, detail=str(e))