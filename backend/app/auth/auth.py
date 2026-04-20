import httpx
from jose import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.core.config import settings

security = HTTPBearer()

JWKS_URL = f"{settings.CLERK_ISSUER_URL}/.well-known/jwks.json"

async def get_user_clerk_id(res: HTTPAuthorizationCredentials = Depends(security)):
    token = res.credentials
    try:
        #JWKs clerk;s key 

        async with httpx.AsyncClient() as client:
            jwks_response = await client.get(JWKS_URL)
            jwks = jwks_response.json()

        # 2. Decode and Verify
        #  checks: Signature, Expiry (exp), and Issuer (iss)
        payload = jwt.decode(
            token, 
            jwks, 
            algorithms=["RS256"], 
            audience=None, 
            issuer=settings.CLERK_ISSUER_URL
        )
        
        clerk_id = payload.get("sub")
        if not clerk_id:
            raise HTTPException(status_code=401, detail="Invalid token: sub missing")
            
        return clerk_id

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Authentication failed: {str(e)}"
        )