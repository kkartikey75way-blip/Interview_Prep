from pydantic import BaseModel, EmailStr

#Base
class UserBase(BaseModel):
    email: EmailStr
    name: str


#Request Schemas
class UserCreate(UserBase):
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


#Response Schemas
class UserResponse(UserBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True
