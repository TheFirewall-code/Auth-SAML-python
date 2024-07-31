from fastapi import Depends, APIRouter
from controllers.auth_controller import get_stored_access_token, get_current_user
from typing import Dict


custom_router = APIRouter()


@custom_router.get("/admin-api")
async def admin_api(token: str = Depends(get_stored_access_token)):
    user = await get_current_user(token)
    return {"message": "Welcome to the admin API", "roles": user["roles"]}

@custom_router.get("/superadmin-api")
async def superadmin_api(token: str = Depends(get_stored_access_token)):
    user = await get_current_user(token)
    return {"message": "Welcome to the superadmin API", "roles": user["roles"]}

@custom_router.get("/user-api")
async def user_api(token: str = Depends(get_stored_access_token)):
    user = await get_current_user(token)
    return {"message": "Welcome to the user API", "roles": user["roles"]}