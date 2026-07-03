import re


def parse_resume(resume_text: str):

    data = {}

    # Name
    lines = resume_text.split("\n")
    data["candidate_name"] = lines[0].strip()

    # Email
    email = re.search(
        r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
        resume_text
    )

    data["email"] = email.group() if email else "Not Found"

    # Phone
    phone = re.search(
        r"\+?\d[\d\s-]{8,}\d",
        resume_text
    )

    data["phone"] = phone.group() if phone else "Not Found"

    # Skills
    skills = []

    skill_list = [
        "Python",
        "Java",
        "FastAPI",
        "SQL",
        "Machine Learning",
        "HTML",
        "CSS",
        "JavaScript",
        "React"
    ]

    for skill in skill_list:
        if skill.lower() in resume_text.lower():
            skills.append(skill)

    data["skills"] = skills

    # Experience
    experience = re.search(
        r"(\d+)\s+Years?",
        resume_text,
        re.IGNORECASE
    )

    data["experience"] = (
        experience.group()
        if experience
        else "Not Found"
    )

    return data