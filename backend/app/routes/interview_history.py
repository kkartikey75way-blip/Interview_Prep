from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.interview_history import InterviewHistory
from app.schemas.interview_history import (
    InterviewHistoryCreate,
    InterviewHistoryOut,
)

router = APIRouter(prefix="/interview/history", tags=["Interview History"])


@router.post("/", response_model=dict)
async def save_history(
    data: InterviewHistoryCreate,
    db: AsyncSession = Depends(get_db),
    user=Depends(get_current_user),
):
    history = InterviewHistory(
        user_id=user.id,
        track=data.track,
        question=data.question,
        answer=data.answer,
        difficulty=data.difficulty,
    )

    db.add(history)
    await db.commit()
    return {"message": "Interview history saved"}


@router.get("/{track}", response_model=list[InterviewHistoryOut])
async def get_history_by_track(
    track: str,
    db: AsyncSession = Depends(get_db),
    user=Depends(get_current_user),
):
    stmt = (
        select(InterviewHistory)
        .where(
            InterviewHistory.user_id == user.id,
            InterviewHistory.track == track,
        )
        .order_by(InterviewHistory.created_at.desc())
    )

    result = await db.execute(stmt)
    return result.scalars().all()
