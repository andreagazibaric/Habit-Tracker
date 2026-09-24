import jwt

from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from database import get_db
from models.user import User
from settings import ALGORITHM, SECRET_KEY

security = HTTPBearer()

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    token = credentials.credentials

    try: 
        payload = jwt.decode(
            token, SECRET_KEY, algorithms=[ALGORITHM]
        )

        username = payload.get("sub")

        if username is None: 
            raise HTTPException(status_code=401, detail="Invalid token")

    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = (
        db.query(User).filter(User.username == username).first() 
    )

    if user is None: 
        raise HTTPException(status_code=401, detail="User not found")

    return user
