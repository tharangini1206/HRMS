from data import EMPLOYEES


def get_employee_reminders(employee_id: str):
    reminders = []

    employee = EMPLOYEES.get(employee_id)

    if not employee:
        return ["Employee not found."]

    # Missing Punch Check
    if employee.get("attendance") == "Missing Punch":
        reminders.append(
            "You missed your check-in/check-out punch. Please contact HR."
        )

    # Low Leave Balance Check
    if employee.get("leave_balance", 0) <= 2:
        reminders.append(
            f"Your leave balance is low ({employee['leave_balance']} days remaining)."
        )

    # If no reminders
    if not reminders:
        reminders.append("No reminders at the moment.")

    return reminders