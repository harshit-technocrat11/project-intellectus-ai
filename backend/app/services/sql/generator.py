from app.core.llm_client import client
from app.core.prompts import SQL_SYSTEM_PROMPT
import re
# re = regular expression
# converting NL to SQL

class SQLGenerator:

    async def generate ( self, question: str):
        response= client.chat.completions.create(
            model = "gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": SQL_SYSTEM_PROMPT
                },
                {
                    "role": "user",
                    "content": question
                }
            ]
        )

        sql = response.choices[0].message.content.strip()
        print("Raw LLM output:", sql)

        # remove markdown sql blocks
        cleaned_sql = re.sub(r"```sql|```", "", sql).strip()

        print("Cleaned SQL:", cleaned_sql)
        return cleaned_sql