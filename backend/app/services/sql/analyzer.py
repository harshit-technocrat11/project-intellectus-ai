from app.core.llm_client import client


class SQLAnalyzer:
    async def analyze(self, question: str, data: dict):

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": "You are a business intelligence assistant."
                },
                {
                    "role": "user",
                    "content": f"""
Question:
{question}

Data:
{data}

Explain the insights briefly.
"""
                }
            ]
        )

        return response.choices[0].message.content
