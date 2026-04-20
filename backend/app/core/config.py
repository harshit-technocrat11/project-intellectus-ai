from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    CLERK_ISSUER_URL: str
    OPENAI_API_KEY: str
    INTELLECTUS_DB_URL: str 
    
    model_config = SettingsConfigDict(
        env_file=".env", 
        extra="ignore"
    )

settings = Settings()