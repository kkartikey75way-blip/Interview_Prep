from pydantic import BaseModel
from datetime import datetime

class InterviewHistoryCreate(BaseModel):
    track: str
    question: str
    answer: str
    difficulty: str

class InterviewHistoryOut(InterviewHistoryCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
