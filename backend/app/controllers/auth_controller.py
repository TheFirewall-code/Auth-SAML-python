from okta_jwt_verifier import AccessTokenVerifier
from datetime import datetime, timezone
import base64
import hashlib
import os
from fastapi import HTTPException
from httpx import AsyncClient
from typing import Dict
from dotenv import load_dotenv

load_dotenv()

okta_domain = os.getenv("OKTA_DOMAIN")
client_id = os.getenv("OKTA_CLIENT_ID")
client_secret = os.getenv("OKTA_CLIENT_SECRET")
redirect_uri = os.getenv("OKTA_REDIRECT_URI")

role_to_apis = {
    "admin": ["/admin-api", "/user-api"],
    "superadmin": ["/superadmin-api", "/admin-api", "/user-api"],
    "user": ["/user-api"]
}

verifier = AccessTokenVerifier(
    issuer='https://dev-90538725.okta.com/oauth2/default',
    audience='api://default'
)

def generate_pkce_pair() -> Dict[str, str]:
    code_verifier = base64.urlsafe_b64encode(os.urandom(32)).rstrip(b'=').decode('utf-8')
    code_challenge = base64.urlsafe_b64encode(hashlib.sha256(code_verifier.encode('utf-8')).digest()).rstrip(b'=').decode('utf-8')
    return {"code_verifier": code_verifier, "code_challenge": code_challenge}

pkce_pair = generate_pkce_pair()

async def get_current_user(token: str) -> Dict[str, str]:
    try:
        print("Token", token)
        jwt = await verifier.verify(token)
        print("JWT", jwt)
        user_roles = token.get("scp", [])
        return {"sub": token["sub"], "roles": user_roles}
    

    except Exception as e:
        print(e)
        raise HTTPException(status_code=401, detail="Invalid token")

async def get_user_info(access_token: str) -> Dict[str, str]:
    async with AsyncClient() as client:
        response = await client.get(
            f"{okta_domain}/oauth2/default/v1/userinfo",
            headers={"Authorization": f"Bearer {access_token}"}
        )
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Failed to fetch user info")
    return response.json()


async def get_stored_access_token():
    try:
        with open("access_token.txt", "r") as file:
            token = file.read().strip()
        if not token:
            raise HTTPException(status_code=401, detail="No access token found")
        return token
    except FileNotFoundError:
        raise HTTPException(status_code=401, detail="No access token found")