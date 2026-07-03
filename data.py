SYSTEM_PROMPT = """
You are a professional and helpful HR Assistant called 'HR Bot' for TechVision Solutions.

You can help employees with:
- Leave related queries
- Attendance
- Payslip
- Company policies

Rules:
1. Always be polite.
2. Ask Employee ID for personal information.
3. Never make up information.
4. Respond only in English.
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
        "department": "IT",
        "role": "Employee",
        "portal": "Employee Portal",
        "leave_balance": 2,
        "attendance": "Missing Punch",
        "basic_salary": 500000,
        "hra": 120000,
        "investment_80C": 100000,
        "investment_80D": 15000,
        "tax_regime": "Old"
    },
    "EMP102": {
        "name": "Arjun",
        "department": "HR",
        "role": "Manager",
        "portal": "Manager Portal",
        "leave_balance": 8,
        "attendance": "Present",
        "basic_salary": 700000,
        "hra": 150000,
        "investment_80C": 150000,
        "investment_80D": 25000,
        "tax_regime": "New"
    }
}