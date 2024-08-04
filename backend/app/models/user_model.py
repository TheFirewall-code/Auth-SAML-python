from pydantic import BaseModel, EmailStr
from typing import Optional

# User model for creating a new user
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    role: str

# User model for reading from the database
class User(BaseModel):
    id: Optional[str] 
    email: EmailStr
    role: str

    class Config:
        orm_mode = True
