import deepl # type: ignore
from dotenv import load_dotenv # type: ignore
import os
import requests
load_dotenv()
DEEPL_API_URL = "https://api-free.deepl.com/v2/translate"
auth_key = os.getenv("DEEPL_API_KEY")
def convert_full_to_short(full):
    if full == "English":
        short = "EN-US"
    elif full == "Chinese":
        short = "ZH"
    elif full == "Spanish":
        short = "ES"
    elif full == "German":
        short = "DE"
    elif full == "Japanese":
        short = "JA"
    elif full == "Korean":
        short = "KO"
    elif full == "French":
        short = "FR"
    return short

def translate_text(text, src_language, target_language):
    translator = deepl.Translator(auth_key)
    translated = translator.translate_text(text, source_lang=src_language, target_lang=target_language, context="This text is apart of the dialogue between a language learning student and a language learning tutor.")
    return translated.text

def detect_language(text):
    response = requests.post(DEEPL_API_URL, data={
        "auth_key": auth_key,
        "text": text,
        "target_lang": "EN-US",  # Target language for translation (required)  # Enable auto-detection of source language
    })
    if response.status_code == 200:
        result = response.json()
        detected_language = result.get("translations", [{}])[0].get("detected_source_language")
        return detected_language
    else:
        raise Exception(f"Error {response.status_code}: {response.text}")