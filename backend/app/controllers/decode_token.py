from fastapi import HTTPException
import jwt

def decode_access_token(token: str) -> dict:
    try:
        decoded = jwt.decode(token, options={"verify_signature": False}) 
        return decoded
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")