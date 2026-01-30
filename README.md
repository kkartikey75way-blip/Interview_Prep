# AI Interview Prep Platform

An AI-powered interview preparation platform that helps users practice interview questions across multiple domains like Frontend, Backend, DSA, System Design, AI/ML, DevOps, and more — with **real-time AI-generated questions and answers**.

---

## ✨ Features

### 🔐 Authentication
- User Signup & Login (JWT-based)
- Protected routes (Dashboard, Profile, Interview)
- Automatic logout on page refresh (no session persistence)

### 🧠 AI Interview Practice
- Domain-wise interview tracks
- AI-generated questions & answers
- Supports multiple roles:
  - Frontend
  - Backend
  - Full Stack
  - DSA
  - System Design
  - DevOps
  - Cloud
  - AI / ML
  - Data Engineering
  - Security
  - Testing
  - Mobile
  - Behavioral / HR

### 👤 Profile Management
- Fetch authenticated user profile
- Data comes directly from database (no static data)

### 🎨 Frontend
- React + TypeScript
- Tailwind CSS
- Redux Toolkit
- React Router v6
- Clean, modular UI

### ⚙️ Backend
- FastAPI
- PostgreSQL
- SQLAlchemy (Async)
- JWT Authentication
- AI integration (Gemini / OpenAI)

---

## 🏗️ Tech Stack

### Frontend
- React
- TypeScript
- Redux Toolkit
- Axios
- Tailwind CSS
- React Icons

### Backend
- FastAPI
- PostgreSQL
- SQLAlchemy (Async)
- Pydantic
- JWT (OAuth2 Password Flow)

### AI Providers
- Google Gemini
- OpenAI (optional)

---

## 📁 Project Structure

### Frontend

src/
├── components/
├── layouts/
├── pages/
├── router/
├── services/
│ └── api.ts
├── store/
│ ├── reducers/
│ ├── hooks.ts
│ └── store.ts
└── utils/

### Backend

app/
├── core/
│ ├── config.py
│ ├── database.py
│ ├── security.py
│ └── deps.py
├── models/
├── routes/
│ ├── auth.py
│ ├── interview.py
│ └── users.py
├── services/
│ └── ai_service.py
└── main.py

---

## 🔑 Environment Variables

Create a `.env` file in the backend root:

```env
DATABASE_URL=postgresql+asyncpg://username@localhost:5432/interview_prep

SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

# AI
GEMINI_API_KEY=your_gemini_api_key
# OR
OPENAI_API_KEY=your_openai_api_key

## Running Project
Backend:- 

cd backend
python -m venv venv
source venv/bin/activate   # Mac/Linux
venv\Scripts\activate      # Windows

pip install -r requirements.txt
uvicorn app.main:app --reload

Frontend:-
cd frontend
npm install
npm run dev
