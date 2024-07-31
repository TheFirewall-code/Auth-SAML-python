from fastapi import HTTPException
from models.user_model import User
from db.db_config import db
from typing import Dict

async def add_user(user: User):
    try:
        await db["users"].insert_one(user.dict())
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to add user")

async def update_user_roles(access_token: str, roles: Dict[str, list]):
    try:
        await db["users"].update_one({"access_token": access_token}, {"$set": {"role": roles}})
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to update roles")
