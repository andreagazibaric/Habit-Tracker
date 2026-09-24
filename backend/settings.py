from pathlib import Path
import os

from dotenv import load_dotenv


PROJECT_ROOT = Path(__file__).resolve().parent.parent
load_dotenv(PROJECT_ROOT / ".env")

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://habit_user:habit_password@localhost:5432/habit_tracker",
)
SECRET_KEY = os.getenv("SECRET_KEY", "change-this-later")
ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")

POSTGRES_USER = os.getenv("POSTGRES_USER", "habit_user")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD", "habit_password")
POSTGRES_DB = os.getenv("POSTGRES_DB", "habit_tracker")
POSTGRES_HOST = os.getenv("POSTGRES_HOST", "localhost")
POSTGRES_PORT = os.getenv("POSTGRES_PORT", "5432")