from fastapi import APIRouter, Depends
from controllers.user_controller import add_user, update_user_roles
from models.user_model import User
from typing import Dict

user_router = APIRouter()

@user_router.post("/add")
async def add_user_route(user: User):
    await add_user(user)
    return {"message": "User added successfully"}

@user_router.put("/update-roles")
async def update_user_roles_route(access_token: str, roles: Dict[str, list]):
    await update_user_roles(access_token, roles)
    return {"message": "Roles updated successfully"}
