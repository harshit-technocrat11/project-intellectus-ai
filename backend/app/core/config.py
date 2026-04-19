from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    CLERK_ISSUER_URL : str
    NEON_DATABASE_URL: str

    class Config:
        env_file= ".env"

settings = Settings()

