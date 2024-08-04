from pydantic import BaseModel

class Admin(BaseModel):
    username: str
    password: str
    initialLogin: bool
