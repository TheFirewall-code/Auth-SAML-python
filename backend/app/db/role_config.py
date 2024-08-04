from models.role_model import Role, RoleCreate
from motor.motor_asyncio import AsyncIOMotorClient
from typing import List, Optional

# MongoDB connection and database initialization
client = AsyncIOMotorClient("mongodb://localhost:27017")
db = client['authentication']
role_collection = db['roles']

# Function to fetch all roles
async def fetch_all_roles() -> List[Role]:
    roles_cursor = role_collection.find({})
    roles = await roles_cursor.to_list(length=None)
    # Map _id to id for Role model
    roles = [{**role, "id": str(role["_id"])} for role in roles]
    return [Role(**role) for role in roles]

# Function to fetch a specific role by role_name
async def fetch_role_by_name(role_name: str) -> Optional[Role]:
    role = await role_collection.find_one({"role_name": role_name})
    if role:
        return Role(**role)
    return None

# Function to add a new role
async def add_role(role_create: RoleCreate) -> Role:
    role_dict = role_create.dict()
    result = await db["roles"].insert_one(role_dict)
    role_dict["id"] = str(result.inserted_id)
    return Role(**role_dict)