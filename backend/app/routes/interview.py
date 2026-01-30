from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from fastapi.concurrency import run_in_threadpool

from app.services.ai_service import generate_interview_qa

router = APIRouter(prefix="/interview", tags=["Interview"])


class InterviewRequest(BaseModel):
    role: str
    difficulty: str


class InterviewResponse(BaseModel):
    question: str
    answer: str


@router.post("/generate", response_model=InterviewResponse)
async def generate_interview(request: InterviewRequest):
    try:
        result = await run_in_threadpool(
            generate_interview_qa,
            request.role,
            request.difficulty,
        )
        return result
    except Exception as e:
        # Log real error in terminal
        print("AI ERROR:", e)
        raise HTTPException(
            status_code=500,
            detail="AI generation failed",
        )
