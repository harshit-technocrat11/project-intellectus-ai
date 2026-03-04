from app.services.sql.generator import SQLGenerator
from app.services.sql.validator import validate_sql
from app.services.sql.executor import SQLExecutor
from app.services.sql.analyzer import SQLAnalyzer


class SQLService:

    def __init__(self):
        self.generator = SQLGenerator()
        self.executor = SQLExecutor()
        self.analyzer = SQLAnalyzer()

    async def run (self, db , question: str):
        sql =  await self.generator.generate(question)

        safe_sql = validate_sql(sql)

        result = await self.executor.execute(db, safe_sql)

        analysis = await self.analyzer.analyze(question, result)

        return {
            "generated_sql": sql,
            "summary": analysis,
            "data": result
        }