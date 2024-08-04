from models.user_model import User, UserCreate
from motor.motor_asyncio import AsyncIOMotorClient
from typing import List, Optional
import bcrypt

# MongoDB connection and database initialization
client = AsyncIOMotorClient("mongodb://localhost:27017")
db = client['your_database_name']
user_collection = db['users']

# Function to add a new user
async def add_user(user_create: UserCreate) -> User:
    # Hash the password before storing it
    hashed_password = bcrypt.hashpw(user_create.password.encode('utf-8'), bcrypt.gensalt())
    
    user_dict = user_create.dict()
    user_dict['password'] = hashed_password.decode('utf-8')  # Store the hashed password
    
    result = await user_collection.insert_one(user_dict)
    user_dict["id"] = str(result.inserted_id)  # Set the ID field
    return User(**user_dict)

# Function to fetch a user by email and password
async def fetch_user_by_email_and_password(email: str, password: str) -> Optional[User]:
    user = await user_collection.find_one({"email": email})
    if user and bcrypt.checkpw(password.encode('utf-8'), user["password"].encode('utf-8')):
        user["id"] = str(user["_id"])  # Set the ID field
        return User(**user)
    return None

# Function to fetch all users
async def fetch_all_users() -> List[User]:
    users_cursor = user_collection.find({})
    users = await users_cursor.to_list(length=None)
    # Map _id to id for User model
    users = [{**user, "id": str(user["_id"])} for user in users]
    return [User(**user) for user in users]

# Function to update a user's details
async def update_user(user_id: str, user_update: UserCreate) -> Optional[User]:
    user_dict = user_update.dict()
    # Optionally update the password
    if 'password' in user_dict:
        hashed_password = bcrypt.hashpw(user_dict['password'].encode('utf-8'), bcrypt.gensalt())
        user_dict['password'] = hashed_password.decode('utf-8')
    
    result = await user_collection.update_one(
        {"_id": user_id},
        {"$set": user_dict}
    )
    
    if result.matched_count:
        # Fetch the updated user data
        updated_user = await user_collection.find_one({"_id": user_id})
        updated_user["id"] = str(updated_user["_id"])
        return User(**updated_user)
    return None
