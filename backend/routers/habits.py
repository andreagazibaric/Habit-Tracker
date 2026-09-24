from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from auth import get_current_user
from database import get_db
from models.habit import Habit
from models.user import User
from schemas.habit import HabitCreate, HabitUpdate, HabitResponse


router = APIRouter(prefix="/habits", tags=["habits"])


@router.get("/", response_model=list[HabitResponse])
def get_habits(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return (
        db.query(Habit)
        .filter(Habit.user_id == current_user.id)
        .all()
    )


@router.post("/", response_model=HabitResponse)
def create_habit(
    habit: HabitCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    new_habit = Habit(
        name=habit.name,
        completed=False,
        user_id=current_user.id
    )

    db.add(new_habit)
    db.commit()
    db.refresh(new_habit)

    return new_habit


@router.put("/{habit_id}", response_model=HabitResponse)
def update_habit(
    habit_id: int,
    habit: HabitUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    existing_habit = (
        db.query(Habit)
        .filter(
            Habit.id == habit_id,
            Habit.user_id == current_user.id
        )
        .first()
    )

    if existing_habit is None:
        raise HTTPException(
            status_code=404,
            detail="Habit not found"
        )

    existing_habit.name = habit.name
    existing_habit.completed = habit.completed

    db.commit()
    db.refresh(existing_habit)

    return existing_habit


@router.delete("/{habit_id}")
def delete_habit(
    habit_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    existing_habit = (
        db.query(Habit)
        .filter(
            Habit.id == habit_id,
            Habit.user_id == current_user.id
        )
        .first()
    )

    if existing_habit is None:
        raise HTTPException(
            status_code=404,
            detail="Habit not found"
        )

    db.delete(existing_habit)
    db.commit()

    return {
        "message": "Habit deleted successfully"
    }