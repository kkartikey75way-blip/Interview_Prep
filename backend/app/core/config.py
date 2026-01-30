from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # Database
    DATABASE_URL: str

    # JWT
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    # AI
    AI_PROVIDER: str = "gemini"
    GEMINI_API_KEY: str | None = None

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
        case_sensitive=False,
    )


settings = Settings()
