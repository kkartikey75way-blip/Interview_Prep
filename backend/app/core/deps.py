from fastapi import Depends, HTTPException, status
from jose import JWTError, jwt
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.core.config import settings
from app.models.user import User
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_db),
):
    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM],
        )
        user_id: int = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401)
    except JWTError:
        raise HTTPException(status_code=401)

    result = await db.execute(select(User).where(User.id == int(user_id)))
    user = result.scalar_one_or_none()

    if not user:
        raise HTTPException(status_code=401)

    return user
