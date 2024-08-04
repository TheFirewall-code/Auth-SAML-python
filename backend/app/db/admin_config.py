from pymongo import MongoClient
from pymongo.collection import Collection
from pydantic import BaseModel
from typing import Optional
from models.admin_model import Admin

# MongoDB client setup
client = MongoClient("mongodb://localhost:27017/")
db = client['authentication']
admin_collection: Collection = db['admin']


def insert_admin(admin: Admin) -> str:
    result = admin_collection.insert_one(admin.dict())
    if result.acknowledged:
        return str(result.inserted_id)
    raise Exception("Failed to insert document")

def change_admin_password(username: str, new_password: str) -> bool:
    result = admin_collection.update_one(
        {"username": username},
        {"$set": {"password": new_password, "initialLogin": False}}
    )
    return result.modified_count > 0

def verify_admin_login(username: str, password: str) -> Optional[dict]:
    admin = admin_collection.find_one({"username": username, "password": password})
    return admin
