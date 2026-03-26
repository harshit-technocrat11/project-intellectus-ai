from app.services.sql.sql_service import SQLService

# hybrid query router
class CopilotOrchestrator:

    def __init__(self):
        self.sql_service = SQLService()

    async def handle(self, db, question: str):

        # temporary
        schema = """
        employees(id, first_name, last_name, department, salary, location, hire_date)
        products(id, name, brand, category, price, stock_quantity)
        orders(id, product_id, customer_id, quantity, order_date, total_amount)
        """

        return await self.sql_service.run(db, question, schema)

        