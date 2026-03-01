from typing import List

class SQLValidationError(Exception):
    """custom exception"""
    pass

def validate_sql(sql: str)-> str :
    """
    validates SQL to ensure it is safe to execute.
     Returns cleaned SQL if valid. 
      Raises SQLValidationError if invalid """
    
    # basic clean up
    cleaned_sql = sql.strip()

    # add the validation constraints
    FORBIDDEN_KEYWORDS: List[str] = [
        "insert",
        "update",
        "delete",
        "drop",
        "alter",
        "truncate",
        "create",
        "grant",
        "revoke"
    ]
    

    if not cleaned_sql.lower().startswith("select"):
        raise SQLValidationError("Only SELECT queries are allowed")

    lower_sql = cleaned_sql.lower()

    # Block Forbidden Keywords
    for keyword in FORBIDDEN_KEYWORDS:
        if keyword in lower_sql:
            raise SQLValidationError(f"Forbidden keyword detected : {keyword}")
    
    # block semicolons, i.e mulitple statements

    if ";" in cleaned_sql:
        raise SQLValidationError("Multiple SQL statements are not allowed.")
    if "--" in cleaned_sql or "/*" in cleaned_sql:
        raise SQLValidationError("SQL comments are not allowed.")

    return cleaned_sql