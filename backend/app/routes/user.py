from fastapi import APIRouter, Depends
from pydantic import BaseModel

from app.core.deps import get_current_user
from app.models.user import User

router = APIRouter(prefix="/users", tags=["Users"])

class UserProfileResponse(BaseModel):
    id: int
    name: str
    email: str
    is_active: bool

@router.get("/me", response_model=UserProfileResponse)
async def get_my_profile(current_user: User = Depends(get_current_user)):
    return current_user
