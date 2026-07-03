from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI
from typing import List, Dict, Optional
import uvicorn

app = FastAPI(title="HR Chatbot API")

# ====================== CONFIG ======================
client = OpenAI(
    api_key="sk-..."   # ← Team will give you real key later
)

SYSTEM_PROMPT = """
You are a professional and helpful HR Assistant called "HR Bot" for TechVision Solutions.

You can help employees with:
- Leave related queries (apply leave, balance, policy, status, cancel)
- Payslip related queries
- Attendance related queries
- Company policies

Strict Rules:
1. Always be polite, professional and clear.
2. For any personal information (leave balance, payslip, attendance), always ask for Employee ID first.
3. Never make up information. If unsure, say "I will check with HR team and get back to you."
4. Keep responses short and easy to understand.
5. Respond only in English.
"""

HR_POLICY = """
Leave Policy:
- Annual Leave: 12 Days
- Sick Leave: 6 Days

Attendance Policy:
- Working Hours: 9:30 AM to 5:00 PM

Payroll Policy:
- Payslips are generated monthly.
"""

EMPLOYEES = {
    "EMP101": {
        "name": "Akhila",
        "leave_balance": 10,
        "attendance": "Present",
        "department": "IT"
    }
}

# ====================== REQUEST MODEL ======================
class ChatRequest(BaseModel):
    user_message: str
    employee_id: Optional[str] = None
    history: List[Dict] = []

# ====================== HELPER FUNCTION ======================
def get_hr_response(user_message: str, employee_id: Optional[str] = None, history: List[Dict] = None) -> str:

    if history is None:
        history = []

    messages = [{"role": "system", "content": SYSTEM_PROMPT}]

    # Context Injection
    if employee_id:

        employee = EMPLOYEES.get(employee_id)

        if employee:
            context = f"""
Employee ID: {employee_id}
Employee Name: {employee['name']}
Department: {employee['department']}
Leave Balance: {employee['leave_balance']} Days
Attendance Status: {employee['attendance']}
Current Date: 25 June 2026
"""
        else:
            context = f"""
Employee ID: {employee_id}
Current Date: 25 June 2026
"""

        messages.append(
            {
                "role": "user",
                "content": f"""
HR Policy Information:
{HR_POLICY}

Employee Information:
{context}
"""
            }
        )

    # Add conversation history
    messages.extend(history)

    # Add current message
    messages.append({"role": "user", "content": user_message})

    # Call OpenAI
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages,
        temperature=0.7,
        max_tokens=600
    )

    return response.choices[0].message.content


# ====================== API ENDPOINT ======================
@app.post("/api/ai/chat")
async def chat(request: ChatRequest):
    reply = get_hr_response(
        user_message=request.user_message,
        employee_id=request.employee_id,
        history=request.history
    )
    return {"response": reply}


# ====================== RUN SERVER ======================
if __name__ == "__main__":
    print("🚀 Starting HR Chatbot API...")
    print("Access docs at: http://127.0.0.1:8000/docs")
    uvicorn.run(app, host="127.0.0.1", port=8000)