from pydantic import BaseModel
from typing import Optional


class ChatRequest(BaseModel):
    user_message: str
    employee_id: Optional[str] = None
    role: str
    portal: str
    
class MeetingRequest(BaseModel):
    meeting_notes: str

class ResumeRequest(BaseModel):
    resume_text: str