# HRMS AI Chatbot

## Overview

HRMS AI Chatbot is a FastAPI-based chatbot that uses OpenAI to answer HR-related employee queries.

The chatbot supports:
- Leave Management Queries
- Attendance Queries
- Payslip Queries
- Company Policy Queries
- General HR Support

---

## Technologies Used

- Python
- FastAPI
- OpenAI API
- Uvicorn

---

## Project Structure

HRMS-AI-Chatbot/

├── hr_chatbot.py

├── intent_list.md

├── README.md

└── venv/

---

## Installation

### Create Virtual Environment

```bash
python -m venv venv
```

### Activate Virtual Environment

```bash
venv\Scripts\activate
```

### Install Required Packages

```bash
pip install fastapi uvicorn openai python-dotenv
```

---

## Run Application

```bash
uvicorn hr_chatbot:app --reload
```

Server URL:

```text
http://127.0.0.1:8000
```

Swagger Documentation:

```text
http://127.0.0.1:8000/docs
```

---

## API Endpoint

### POST /chat

Request:

```json
{
  "message": "How many leave days do I have?",
  "employee_id": "EMP101"
}
```

Response:

```json
{
  "response": "AI generated response"
}
```

---

## Features Implemented

- OpenAI Integration
- FastAPI Backend
- HR System Prompt
- Employee Context Injection
- Conversation History Support
- Intent Definition Documentation

---

## Future Enhancements

- Leave Balance Integration
- Attendance Integration
- Payslip Integration
- Role-Based Access Control
- Notification System
- HR Escalation Support

---
