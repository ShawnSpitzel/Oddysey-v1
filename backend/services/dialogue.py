import openai  # type: ignore
from openai import OpenAI # type: ignore
from dotenv import load_dotenv # type: ignore
import json

# backup_prompt = f"You are a personal {language} tutor for the user. Generate a simple English conversation starter to prompt user response,
# and set the {language} lesson."
import os
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI()
conversation_history = []
def update_prompt(language, level, communication):
    with open("/Users/shawnspitzel/Odyssey/backend/services/prompt.json", "r") as file:
        data = json.load(file)

    # Update relevant sections
    data["ai_tutor"]["student preferences"]["language"] = language
    data["ai_tutor"]["student preferences"]["difficulty"] = level
    data["ai_tutor"]["student preferences"]["communication_styles"] = communication
    return data

def difficulty_to_number(level):
    if level == "Beginner":
        level_number = "1/5"
    if level == "Intermediate":
        level_number = "2/5"
    if level == "Advanced":
        level_number = "3/5"
    if level == "Expert":
        level_number = "4/5"
    if level == "Native":
        level_number = "5/5"
    return level_number

def name_generator(language):
    # TODO: Generate a name for the AI
    if language == "Spanish":
        return "Jorge"
    if language == "Japanese":
        return "Yuki"
    if language == "Korean":
        return "Seung-Bin"
    if language == "German":
        return "Mat"


def generate_prompt(language, level, communication):
    

    name = name_generator(language)
    # Create a structured prompt based on the extracted data
    prompt = f"""
    You are an AI language tutor named {name} teaching {level} {language}. The student's preferences are as follows:
    - Difficulty: {level}
    - Communication Style: {communication}
    Plan out a structured lesson plan for the student to follow based on their preferred difficulty level, communication style, learning style, and tone style.
    Then, introduce yourself and give a brief, 1-2 sentence outline for this plan, before finally asking the user if they're ready to continue.
    For this prompt, do not exceed 350 characters.
    """

    conversation_history.clear()
   
    response = client.chat.completions.create(
        model = "gpt-3.5-turbo",
        messages = [
            { "role": "system", "name": name_generator(language), "content": prompt}
        ]
        )
    ai_response = response.choices[0].message.content
    conversation_history.append({"role": "assistant", "content": ai_response})
    return ai_response

def generate_response(user_input, language, level, communication):
    conversation_history.append({"role": "user", "content": user_input})
    # prompt = f"You are teaching {level} {language} to the user. Respond to the user’s message: '{user_input}' in an educational manner. Follow a structured, linear progression format when teaching {language}, at the appropriate {level} level. Criticism, feedback, and conversation should be given in English, while questions and prompts should be given in {language}"
    prompt = f"""
    You are an AI language tutor teaching {language}. The student's preferences are as follows:
    - Difficulty: {level}
    - Communication Style: {communication}
    
   Take a clear initiative and create a structured, linear lesson plan for the student to follow and progress through, with exercises focusing on conversational skills, vocabulary, translation, and pronunciation. Each response should be brief and concise, with no more than 3 sentences. End each exercise by prompting the user to speak, in order to allow the user to practice what you have taught them.
    """
    response = client.chat.completions.create(
        model = "gpt-3.5-turbo",
        messages = conversation_history + [
            { "role": "system",  "name": name_generator(language),  "content": prompt},
            {
                "role": "user",
                "content": user_input,
            }
        ]
        )
    ai_response = response.choices[0].message.content
    conversation_history.append({"role": "assistant", "content": ai_response})
    return ai_response