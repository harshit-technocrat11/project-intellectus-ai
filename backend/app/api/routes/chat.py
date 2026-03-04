from fastapi import APIRouter , Depends
from sqlalchemy.ext.asyncio import AsyncSession


from app.core.database import get_db
from app.copilot.orchestrator import CopilotOrchestrator
from app.schemas.chat import ChatRequest

router = APIRouter()
copilot = CopilotOrchestrator()


@router.post("/chat", response_model=dict)
async def chat(req: ChatRequest, db: AsyncSession = Depends(get_db)):
    result = await copilot.handle(db, req.question)
    return result