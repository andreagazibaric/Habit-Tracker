from pydantic import BaseModel


class HabitCreate(BaseModel):
    name: str


class HabitUpdate(BaseModel):
    name: str
    completed: bool

class HabitResponse(BaseModel):
    id: int
    name: str
    completed: bool
    user_id: int

    class Config: 
        from_attributes = True