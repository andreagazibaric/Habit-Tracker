from datetime import datetime, timedelta, timezone
import jwt
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models.user import User
from schemas.user import UserCreate, UserResponse, UserLogin
from pwdlib import PasswordHash
from settings import ALGORITHM, SECRET_KEY

router = APIRouter(prefix="/auth", tags=["auth"])

pass_hash = PasswordHash.recommended()

@router.post("/register", response_model=UserResponse)
def register(user:UserCreate, db: Session = Depends(get_db)):
    existing_user = (
        db.query(User).filter(User.username == user.username).first()
    )

    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")

    hashed_pass = pass_hash.hash(user.password)

    new_user = User(
        username=user.username,
        hashed_pass=hashed_pass
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

def create_access_token(username: str):
    expire = datetime.now(timezone.utc) + timedelta(minutes=30)

    payload = {
        "sub": username,
        "exp": expire
    }

    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    existing_user = (
        db.query(User).filter(User.username == user.username).first()
    )

    if not existing_user: 
        raise HTTPException(status_code=401, detail="Invalid username or password")

    if not pass_hash.verify(user.password, existing_user.hashed_pass):
        raise HTTPException(status_code=401, detail="Invalid username or password")

    access_token = create_access_token(existing_user.username)

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }