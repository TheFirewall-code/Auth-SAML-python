from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from routes.user_routes import user_router
from routes.auth_routes import auth_router
from routes.custom_routes import custom_router
import os

load_dotenv()

app = FastAPI()

# Read CORS origins from .env
origins = os.getenv("ALLOWED_ORIGINS", "").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("OKTA_DOMAIN:", os.getenv("OKTA_DOMAIN"))
print("OKTA_CLIENT_ID:", os.getenv("OKTA_CLIENT_ID"))
print("OKTA_CLIENT_SECRET:", os.getenv("OKTA_CLIENT_SECRET"))
print("OKTA_REDIRECT_URI:", os.getenv("OKTA_REDIRECT_URI"))

app.include_router(user_router, prefix="/user", tags=["User"])
app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(custom_router, prefix="/custom", tags=["Custom"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
