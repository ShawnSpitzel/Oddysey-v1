import requests # type: ignore
import os
from dotenv import load_dotenv # type: ignore
load_dotenv()
API_KEY = os.getenv("SAPLING_API_KEY")
SAPLING_URL = "https://api.sapling.ai/api/v1/edits"
def detect_error(user_input, language):
    try:
        response = requests.post(
            SAPLING_URL,
            json={
                "key": API_KEY,
                "text": user_input,
                "lang": language,
                "session_id": "test session",
                "ignore_edit_types": ["capitalization", "hyphens"],
                "auto_apply": True
            }
        )
        edits = response.json()
        return edits
    except requests.exceptions.RequestException as e:
        print(f"Error contacting Sapling API: {e}")
        return None
def apply_corrections(corrections):
    corrected_text = corrections.get("applied_text")
    return corrected_text
