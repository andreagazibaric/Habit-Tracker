from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.auth import router as auth_router
from routers.habits import router as habits_router
from models.user import User
from models.habit import Habit
from database import engine, Base
from settings import FRONTEND_ORIGIN

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_ORIGIN],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(habits_router)

@app.get("/")
def root():
    return {"message": "Habit Tracker API is running!"}
