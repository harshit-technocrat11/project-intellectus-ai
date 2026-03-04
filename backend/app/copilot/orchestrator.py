from app.services.sql.sql_service import SQLService

# hybrid query router
class CopilotOrchestrator:

    def __init__(self):
        self.sql_service = SQLService()

    async def handle(self, db, question: str):
        return await self.sql_service.run(db, question)