from datetime import datetime, timedelta
from typing import Optional

from jose import jwt
from passlib.context import CryptContext

from app.core.config import settings

pwd_context = CryptContext(
    schemes=["argon2", "bcrypt"],
    deprecated="auto",
)

MAX_BCRYPT_BYTES = 72


def _normalize_password(password: str) -> bytes:
    """
    Normalize password to UTF-8 bytes and truncate to bcrypt limit.
    """
    password_bytes = password.encode("utf-8")
    return password_bytes[:MAX_BCRYPT_BYTES]


# ---------- Password utils ----------
def get_password_hash(password: str) -> str:
    normalized = _normalize_password(password)
    return pwd_context.hash(normalized)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    normalized = _normalize_password(plain_password)
    return pwd_context.verify(normalized, hashed_password)


# ---------- JWT utils ----------
def create_access_token(
    data: dict,
    expires_delta: Optional[timedelta] = None,
) -> str:
    to_encode = data.copy()

    expire = datetime.utcnow() + (
        expires_delta
        if expires_delta
        else timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    )

    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(
        to_encode,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM,
    )

    return encoded_jwt
