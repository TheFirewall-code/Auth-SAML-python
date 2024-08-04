from fastapi import APIRouter, HTTPException
from models.user_model import UserCreate, User
from db.user_config import add_user, fetch_user_by_email_and_password, fetch_all_users
from typing import List

user_router = APIRouter()

@user_router.post("/register", response_model=User)
async def register_user(user_create: UserCreate):
    user = await add_user(user_create)
    return user

@user_router.post("/login", response_model=User)
async def login_user(email: str, password: str):
    user = await fetch_user_by_email_and_password(email, password)
    if user is None:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return user

@user_router.get("/", response_model=List[User])
async def get_users():
    try:
        users = await fetch_all_users()
        return users
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error fetching users")