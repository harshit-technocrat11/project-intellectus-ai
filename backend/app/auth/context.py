from fastapi import Depends, HTTPException, status
from app.auth.auth import get_user_clerk_id # Your JWT extractor
from app.db.session import get_db
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

async def get_tenant_id(
    clerk_id: str = Depends(get_user_clerk_id),  
    db: AsyncSession = Depends(get_db)
) -> int:
    """
    Global Resolver: clerk userId --> to extract tenant ID
    """
    # look up for tenantID
    query = text("SELECT tenant_id FROM user_tenant_mapping WHERE clerk_user_id = :cid")
    result = await db.execute(query, {"cid": clerk_id})
    tenant_id = result.scalar()

    if not tenant_id:
        raise HTTPException(status_code=403, detail="User not mapped to any tenant workspace.")

    return {"tenant_id": tenant_id}