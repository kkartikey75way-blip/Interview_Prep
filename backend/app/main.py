from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import auth, interview, user, interview_history
from app.core.database import init_db

app = FastAPI(title="AI Interview Prep API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(interview.router)
app.include_router(user.router)
app.include_router(interview_history.router)


@app.on_event("startup")
async def on_startup():
    await init_db()


@app.get("/")
def root():
    return {"message": "AI Interview Prep Backend is running 🚀"}
