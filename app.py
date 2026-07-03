from fastapi import FastAPI
from chatbot_service import get_hr_response
from reminder_service import get_employee_reminders
from tax_service import get_tax_suggestions
from meeting_service import extract_action_items
from resume_parser import parse_resume
from token_logger import log_token_usage
from models import ChatRequest, MeetingRequest, ResumeRequest
import time
import uvicorn

app = FastAPI(title="HRMS AI Chatbot (Gemini)")


@app.post("/api/ai/chat")
async def chat(request: ChatRequest):

    start_time = time.time()

    reply = get_hr_response(
        user_message=request.user_message,
        employee_id=request.employee_id,
        role=request.role,
        portal=request.portal
    )

    end_time = time.time()

    response_time = round(end_time - start_time, 3)

    log = log_token_usage(
        employee_id=request.employee_id,
        role=request.role,
        feature="HR Chatbot",
        prompt_tokens=120,
        completion_tokens=80,
        response_time=response_time
    )

    return {
        "response": reply,
        "response_time_seconds": response_time,
        "token_usage": log
    }

@app.get("/api/reminders/{employee_id}")
async def reminders(employee_id: str):

    reminders = get_employee_reminders(employee_id)

    return {
        "employee_id": employee_id,
        "reminders": reminders
    }


@app.get("/api/tax-suggestions/{employee_id}")
async def tax_suggestions(employee_id: str):

    suggestions = get_tax_suggestions(employee_id)

    return {
        "employee_id": employee_id,
        "tax_savings_suggestions": suggestions
    }

@app.post("/api/meeting/action-items")
async def meeting_action_items(request: MeetingRequest):

    actions = extract_action_items(request.meeting_notes)

    return {
        "action_items": actions
    }

@app.post("/api/resume-parser")
async def resume_parser(request: ResumeRequest):

    result = parse_resume(request.resume_text)

    return result

if __name__ == "__main__":
    print("Starting HRMS AI Chatbot...")
    print("Swagger Docs: http://127.0.0.1:8000/docs")

    uvicorn.run(
        app,
        host="127.0.0.1",
        port=8000
    )