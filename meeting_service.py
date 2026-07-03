def extract_action_items(meeting_notes: str):

    action_items = []

    sentences = meeting_notes.split(".")

    keywords = [
        "assign",
        "complete",
        "submit",
        "review",
        "update",
        "prepare",
        "schedule",
        "send",
        "finish",
        "follow up"
    ]

    for sentence in sentences:
        sentence = sentence.strip()

        for keyword in keywords:
            if keyword.lower() in sentence.lower():
                action_items.append(sentence)
                break

    if not action_items:
        action_items.append("No action items found.")

    return action_items