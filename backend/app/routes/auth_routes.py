from fastapi import APIRouter, Request, Response, HTTPException
from fastapi.responses import RedirectResponse
from httpx import AsyncClient
from urllib.parse import urlencode
from controllers.auth_controller import pkce_pair, okta_domain, client_id, client_secret, redirect_uri
from controllers.decode_token import decode_access_token
from pydantic import BaseModel
from db.admin_config import change_admin_password, verify_admin_login

auth_router = APIRouter()

class TokenRequest(BaseModel):
    token: str



@auth_router.post('/admin/login')
async def admin_login(request: Request, response: Response):
    request_body = await request.json()
    username = request_body.get('username')
    password = request_body.get('password')
    
    admin = verify_admin_login(username, password)
    if admin:
        return {
            "message": "Admin login successful",
            "status": True,
            "initialLogin": admin.get('initialLogin')
        }
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")

@auth_router.post('/admin/change/pass')
async def admin_change_password(request: Request):
    request_body = await request.json()
    print(request_body)
    username = "admin"
    new_password = request_body.get('password')
    
    if change_admin_password(username, new_password):
        return {"message": "Password updated successfully", "status": True}
    else:
        raise HTTPException(status_code=404, detail="Admin user not found")



@auth_router.get("/login")
async def login(response: Response):
    # Debugging prints to ensure environment variables are set
    if not client_id or not okta_domain:
        raise HTTPException(status_code=500, detail="Client ID or Okta domain not set")
    
    params = {
        "client_id": client_id,
        "response_type": "code",
        "scope": "openid profile email app-role",
        "redirect_uri": redirect_uri,
        "state": "random_state_string",
        "code_challenge": pkce_pair["code_challenge"],
        "code_challenge_method": "S256"
    }
    url = f"{okta_domain}/oauth2/default/v1/authorize?{urlencode(params)}"
    response.status_code = 302
    response.headers["Location"] = url
    return response

@auth_router.get("/login/callback")
async def callback(request: Request):
    code = request.query_params.get("code")
    if not code:
        raise HTTPException(status_code=400, detail="Code not found")

    async with AsyncClient() as client:
        token_response = await client.post(
            f"{okta_domain}/oauth2/default/v1/token",
            data={
                "grant_type": "authorization_code",
                "code": code,
                "scope": "openid profile email app-role",
                "redirect_uri": redirect_uri,
                "client_id": client_id,
                "client_secret": client_secret,
                "code_verifier": pkce_pair["code_verifier"]
            },
            headers={"Content-Type": "application/x-www-form-urlencoded"}
        )
    if token_response.status_code != 200:
        raise HTTPException(status_code=token_response.status_code, detail="Token exchange failed")

    tokens = token_response.json()
    access_token = tokens["access_token"]


    response = RedirectResponse(url=f"http://localhost:3000/dashboard?token={access_token}")

    return response


@auth_router.post("/get/user")
async def userData(request: Request, token_request: TokenRequest):
    token = token_request.token
    data = decode_access_token(token)
    return {"data": data}
