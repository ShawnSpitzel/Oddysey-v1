from flask import Flask, request, jsonify # type: ignore
from services.dialogue import generate_prompt, generate_response, difficulty_to_number
from services.translate_text import translate_text, convert_full_to_short, detect_language
from services.error_detection import detect_error, apply_corrections
from services.audio import text_to_speech
from flask_cors import CORS # type: ignore
from playsound import playsound # type: ignore

app = Flask(__name__)
CORS(app, origins="http://localhost:5173", methods=["POST", "GET"], supports_credentials=True)
# @app.route('/', methods=['POST'])
# def start_conversation():
#     data = request.json
#     print(data)
#     user_language = data['language']
    
#     # Step 1: AI generates a conversation starter in English
#     prompt = generate_prompt(user_language)

#     # Step 2: Translate AI prompt to user’s chosen language
#     shortened_user_language = convert_full_to_short(user_language)
#     translated_prompt = translate_text(prompt, 'en', shortened_user_language)

#     return {"prompt": translated_prompt}

@app.route('/start_conversation', methods=['POST'])
def start_conversation():
    data = request.json
    user_language = data.get('language')
    user_difficulty = data.get('difficulty')
    toneStyle = data.get('toneStyle')
    learningStyle = data.get('learningStyle')
    communicationStyle = data.get('communicationStyle')
    user_difficulty_number = difficulty_to_number(user_difficulty)

    prompt = generate_prompt(user_language, user_difficulty_number, communicationStyle)
    print(user_difficulty)


    # shortened_user_language = convert_full_to_short(user_language)
    # translated_prompt = translate_text(prompt, 'en', shortened_user_language)
    
    audio_file_path = text_to_speech(prompt.encode('utf-8').decode('utf-8'))
    if audio_file_path:
        audio_url = f"{audio_file_path.name}"
    return jsonify(
        {
        "prompt": prompt.encode('utf-8').decode('utf-8'),
        "audio_url": audio_url
        }
    )

@app.route('/receive_response', methods=['POST'])
def receive_response():
    data = request.json
    user_input = data.get('user_input')
    user_language = data.get('language')
    user_difficulty = data.get('difficulty')
    communicationStyle = data.get('communicationStyle')
    user_difficulty_number = difficulty_to_number(user_difficulty)
    
    # detected_language = detect_language(user_input)
    # englishFlag = False
    # if detected_language == "EN":
    #    englishFlag = True
    # shortened_user_language = convert_full_to_short(user_language)
    # edits = detect_error(user_input, shortened_user_language.lower())
    # if edits:
    #     is_error = False if "edits" in edits and not edits["edits"] else True
  
    # if is_error:
    #     correct_answer = apply_corrections(edits)
    #     translated_correct_answer = translate_text(correct_answer, shortened_user_language,'EN-US')
    #     return jsonify({
    #         "ai_response": f"Did you mean to say '{translated_correct_answer}' ({correct_answer})? Try again.",
    #         "flagged": True
    #     })
    
    ai_response = generate_response(user_input, user_language, user_difficulty_number, communicationStyle)
    
    # translated_ai_response = translate_text(ai_response, 'EN', shortened_user_language)
    
    final_response = ai_response
    audio_file_path = text_to_speech(final_response.encode('utf-8').decode('utf-8'))
    if audio_file_path:
        audio_url = f"/audio/{audio_file_path.name}"    
    return jsonify({
        "ai_response": final_response.encode('utf-8').decode('utf-8'),
        "audio_url": audio_url,
        "flagged": False
    })

if __name__ == '__main__':
    app.run(debug=True)
