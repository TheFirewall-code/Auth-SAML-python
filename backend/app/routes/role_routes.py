from fastapi import APIRouter, HTTPException
from typing import List
from db.role_config import fetch_all_roles, fetch_role_by_name, add_role, RoleCreate, Role

role_router = APIRouter()

@role_router.get("/", response_model=List[Role])
async def get_roles():
    return await fetch_all_roles()

@role_router.get("/roles/{role_name}", response_model=Role)
async def get_role(role_name: str):
    role = await fetch_role_by_name(role_name)
    if role is None:
        raise HTTPException(status_code=404, detail="Role not found")
    return role

@role_router.post("/", response_model=Role)
async def create_role(role_create: RoleCreate):
    return await add_role(role_create)
