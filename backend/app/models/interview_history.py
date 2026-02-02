from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.core.database import Base

class InterviewHistory(Base):
    __tablename__ = "interview_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    track = Column(String, index=True)
    question = Column(Text)
    answer = Column(Text)
    difficulty = Column(String)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
