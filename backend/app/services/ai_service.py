import re
import google.generativeai as genai
from app.core.config import settings


# =========================
# Validate API Key
# =========================
if not settings.GEMINI_API_KEY:
    raise RuntimeError("GEMINI_API_KEY is missing. Check your .env file.")


# =========================
# Configure Gemini
# =========================
genai.configure(api_key=settings.GEMINI_API_KEY)

# Use stable, available model
model = genai.GenerativeModel("gemini-2.5-flash")


# =========================
# Helper: clean markdown
# =========================
def clean_text(text: str) -> str:
    """
    Removes markdown symbols like *, **, extra spaces
    """
    text = re.sub(r"\*\*", "", text)
    text = re.sub(r"\*", "", text)
    return text.strip()


# =========================
# Main AI function
# =========================
def generate_interview_qa(role: str, difficulty: str) -> dict:
    prompt = f"""
You are an expert technical interviewer.

Generate ONE interview question and a clear, structured answer.

Role: {role}
Difficulty: {difficulty}

Rules:
- Question should be practical
- Answer should be concise and clear
- Avoid unnecessary verbosity

Format exactly like this:

Question:
<question>

Answer:
<answer>
"""

    # Call Gemini
    response = model.generate_content(prompt)

    # Extract only the text
    content = response.text.strip()

    # Safety check
    if "Answer:" not in content:
        return {
            "question": clean_text(content),
            "answer": "Unable to clearly parse AI response.",
        }

    # Split into question and answer
    question_part, answer_part = content.split("Answer:", 1)

    question = clean_text(
        question_part.replace("Question:", "")
    )
    answer = clean_text(answer_part)

    return {
        "question": question,
        "answer": answer,
    }
