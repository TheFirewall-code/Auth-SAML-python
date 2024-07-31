from pydantic import BaseModel
from typing import Dict, List

class User(BaseModel):
    access_token: str
    role: Dict[str, List[str]]
