from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.core.security import (
    get_password_hash,
    verify_password,
    create_access_token,
)
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin

router = APIRouter(prefix="/auth", tags=["Auth"])


#Signup
@router.post("/signup", status_code=status.HTTP_201_CREATED)
async def signup(
    user_data: UserCreate,
    db: AsyncSession = Depends(get_db),
):
    # Check if user already exists
    result = await db.execute(
        select(User).where(User.email == user_data.email)
    )
    existing_user = result.scalar_one_or_none()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered",
        )

    # Create user
    new_user = User(
        name=user_data.name,
        email=user_data.email,
        hashed_password=get_password_hash(user_data.password),
    )

    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)

    return {"message": "User created successfully"}


#Login
@router.post("/login")
async def login(
    credentials: UserLogin,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(User).where(User.email == credentials.email)
    )
    user = result.scalar_one_or_none()

    if not user or not verify_password(
        credentials.password, user.hashed_password
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    access_token = create_access_token(
        data={"sub": str(user.id)}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }
