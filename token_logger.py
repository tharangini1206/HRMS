from datetime import datetime


def log_token_usage(
    employee_id: str,
    role: str,
    feature: str,
    prompt_tokens: int,
    completion_tokens: int,
    response_time: float
):

    total_tokens = prompt_tokens + completion_tokens

    log = {
        "employee_id": employee_id,
        "role": role,
        "feature": feature,
        "prompt_tokens": prompt_tokens,
        "completion_tokens": completion_tokens,
        "total_tokens": total_tokens,
        "response_time_seconds": response_time,
        "timestamp": str(datetime.now())
    }

    return log