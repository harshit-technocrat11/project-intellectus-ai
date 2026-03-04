import re

class SQLValidationError (Exception):
    pass

def validate_sql(sql: str)-> str :
    """
    basic sql safety validation.
    only allows select queries
    """

    sql = sql.strip().lower()
    print(" sql query generated : ", sql)
    if not sql.startswith("select"):
        raise SQLValidationError("only SELECT queries are allowed")
    
    forbidden = [
        "insert",
        "update",
        "delete",
        "drop",
        "alter",
        "truncate",
        "create",
    ]

    for keyword in forbidden:
        if re.search(rf"\b{keyword}\b", sql):
            raise SQLValidationError(f"Forbidden SQL keyword detected: {keyword}")

    # return valid query string
    return sql