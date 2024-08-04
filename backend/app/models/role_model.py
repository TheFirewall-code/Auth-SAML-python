from pydantic import BaseModel
from typing import List, Optional
from bson import ObjectId

# Role model for creation
class RoleCreate(BaseModel):
    role_name: str
    apis: List[str]

# Role model for reading from database
class Role(BaseModel):
    id: Optional[str]
    role_name: str
    apis: List[str]

    class Config:
        orm_mode = True
        json_encoders = {ObjectId: str}