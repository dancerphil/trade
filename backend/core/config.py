from pydantic_settings import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    # API 配置
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Trade Platform"
    VERSION: str = "1.0.0"

    # 服务器配置
    HOST: str = "0.0.0.0"
    PORT: int = int(os.getenv("PORT", 8000))
    DEBUG: bool = os.getenv("DEBUG", "True").lower() == "true"

    # 安全配置
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days

    # CORS 配置
    ALLOWED_ORIGINS: List[str] = os.getenv(
        "ALLOWED_ORIGINS",
        "http://localhost:3000,https://localhost:3000"
    ).split(",")

    # 数据库配置
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "sqlite:///./trade.db"
    )

    class Config:
        case_sensitive = True

settings = Settings()
