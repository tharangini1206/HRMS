from data import EMPLOYEES, HR_POLICY


def get_hr_response(
    user_message: str,
    employee_id: str = None,
    role: str = None,
    portal: str = None
):

    if not employee_id or employee_id not in EMPLOYEES:
        return "Employee not found."

    employee = EMPLOYEES[employee_id]
    query = user_message.lower().strip()

    response = (
        f"Hello {employee['name']}!\n"
        f"Welcome to {portal}.\n"
        f"Role: {role}\n\n"
    )

    # =====================================================
    # EMPLOYEE
    # =====================================================

    if role == "Employee":

        if "leave policy" in query:
            response += (
                "Leave Policy:\n"
                "- Annual Leave: 12 Days\n"
                "- Sick Leave: 6 Days"
            )

        elif "attendance policy" in query:
            response += (
                "Attendance Policy:\n"
                "- Working Hours: 9:30 AM to 5:00 PM"
            )

        elif "payroll policy" in query:
            response += (
                "Payroll Policy:\n"
                "- Payslips are generated monthly."
            )

        elif "company policy" in query or "company policies" in query:
            response += HR_POLICY

        elif (
            "leave balance" in query
            or "how many leave" in query
            or "leave days" in query
            or "remaining leave" in query
        ):
            response += (
                f"You currently have {employee['leave_balance']} leave days available."
            )

        elif "attendance" in query:
            response += (
                f"Your attendance status is {employee['attendance']}."
            )

        elif "working hours" in query or "office timing" in query:
            response += (
                "Office working hours are 9:30 AM to 5:00 PM, Monday to Friday."
            )

        elif "payslip" in query:
            response += (
                "Your payslip can be downloaded from the Employee Portal."
            )

        elif "salary" in query:
            response += (
                "Salary details are available in the Payslip section."
            )

        elif query in ["hi", "hello", "hey"]:
            response += (
                "Hello! How can I assist you with HR-related queries today?"
            )

        elif "help" in query:
            response += (
                "I can help you with Leave, Attendance, Payslips, Salary and Company Policies."
            )

        else:
            response += (
                "I can help you with Leave, Attendance, Payslips, Salary and Company Policies."
            )

    # =====================================================
    # MANAGER
    # =====================================================

    elif role == "Manager":

        if "attendance report" in query:
            response += (
                "Attendance reports are available in the Manager Dashboard."
            )

        elif "attendance" in query:
            response += (
                "You can monitor your team's attendance from the Manager Dashboard."
            )

        elif "leave report" in query:
            response += (
                "Leave reports are available in the Manager Dashboard."
            )

        elif "leave" in query:
            response += (
                "You can approve or reject employee leave requests."
            )

        elif "performance report" in query:
            response += (
                "Performance reports are available in the Manager Dashboard."
            )

        elif "performance" in query:
            response += (
                "You can review employee performance reports."
            )

        elif "team" in query:
            response += (
                "You can manage your team's activities from the Manager Dashboard."
            )

        elif "help" in query:
            response += (
                "I can assist you with Team Attendance, Leave Approval, Team Management and Performance Reports."
            )

        else:
            response += (
                "I can assist you with Team Attendance, Leave Approval and Performance Management."
            )

    # =====================================================
    # HR ADMIN
    # =====================================================

    elif role == "HR Admin":

        if "manage employee records" in query or "employee record" in query:
            response += (
                "You can manage employee records from the HR Admin Dashboard."
            )

        elif "employee reports" in query or "employee report" in query:
            response += (
                "Employee reports are available in the HR Admin Dashboard."
            )

        elif "attendance report" in query:
            response += (
                "Attendance reports for all employees are available in the HR Admin Dashboard."
            )

        elif "attendance" in query:
            response += (
                "You can monitor attendance for all employees."
            )

        elif "manage leave" in query or "leave request" in query:
            response += (
                "You can manage employee leave requests."
            )

        elif "add employee" in query:
            response += (
                "You can add new employees from the Employee Management module."
            )

        elif "remove employee" in query:
            response += (
                "You can remove employees after completing approval procedures."
            )

        elif "search employee" in query:
            response += (
                "You can search employees using Employee ID or Name."
            )

        elif "policy" in query:
            response += (
                "You can create, update and publish HR policies."
            )

        elif "help" in query:
            response += (
                "I can assist you with Employee Management, Attendance, Leave Management and HR Policies."
            )

        else:
            response += (
                "I can assist with HR operations and employee management."
            )

    # =====================================================
    # FINANCE
    # =====================================================

    elif role == "Finance":

        if "payroll report" in query or "payroll details" in query or "payroll" in query:
            response += (
                "Payroll reports are available in the Finance Dashboard."
            )

        elif "tax report" in query or "tax" in query:
            response += (
                "You can access employee tax optimization reports."
            )

        elif "salary report" in query or "salary" in query:
            response += (
                "Salary reports are available in the Finance Dashboard."
            )

        elif "help" in query:
            response += (
                "I can assist you with Payroll, Salary Reports and Tax Management."
            )

        else:
            response += (
                "I can assist you with Payroll and Tax Management."
            )

    # =====================================================
    # CLIENT
    # =====================================================

    elif role == "Client":

        if "project status" in query:
            response += (
                "Current project status is available in the Client Dashboard."
            )

        elif "project progress" in query:
            response += (
                "You can monitor overall project progress."
            )

        elif "resource allocation" in query:
            response += (
                "You can view allocated project resources."
            )

        elif "project resources" in query or "project resource" in query or "resource" in query:
            response += (
                "Project resource details are available in the Client Dashboard."
            )

        elif "help" in query:
            response += (
                "I can assist you with Project Status, Progress and Resource Allocation."
            )

        else:
            response += (
                "I can assist you with project-related information."
            )

    # =====================================================
    # SUPER ADMIN
    # =====================================================

    elif role == "Super Admin":

        if "dashboard" in query or "view dashboard" in query:
            response += (
                "You can access the complete HRMS Dashboard."
            )

        elif "user management" in query or "manage users" in query:
            response += (
                "You can manage all users, roles and permissions."
            )

        elif "security" in query:
            response += (
                "You can configure HRMS security settings."
            )

        elif "system configuration" in query or "configuration" in query:
            response += (
                "You can manage global system configuration."
            )

        elif "system settings" in query:
            response += (
                "You can modify system-wide settings."
            )

        elif "hrms modules" in query:
            response += (
                "You have access to every HRMS module in the organization."
            )

        elif "generate reports" in query or "report" in query:
            response += (
                "You can generate organization-wide reports."
            )

        elif "help" in query:
            response += (
                "I can assist you with User Management, Security, Reports and System Configuration."
            )

        else:
            response += (
                "You have complete access to all HRMS modules, dashboards and system settings."
            )

    else:
        response += "Invalid role."

    return response