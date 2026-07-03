from data import EMPLOYEES


def get_tax_suggestions(employee_id: str):
    employee = EMPLOYEES.get(employee_id)

    if not employee:
        return ["Employee not found."]

    suggestions = []

    if employee["tax_regime"] == "Old":

        if employee["investment_80C"] < 150000:
            suggestions.append(
                "Increase your Section 80C investments up to ₹1,50,000 to maximize tax savings."
            )

        if employee["investment_80D"] < 25000:
            suggestions.append(
                "Consider increasing your Section 80D health insurance investment."
            )

        suggestions.append(
            "Submit valid HRA documents to claim House Rent Allowance benefits."
        )

    else:

        suggestions.append(
            "You are using the New Tax Regime. Review whether the Old Tax Regime provides better tax savings."
        )

    if not suggestions:
        suggestions.append("No tax optimization suggestions at the moment.")

    return suggestions