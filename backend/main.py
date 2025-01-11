from flask import Flask, request, jsonify # type: ignore
from services.dialogue import generate_prompt, generate_response, difficulty_to_number
from services.audio import text_to_speech
from flask_cors import CORS # type: ignore
from playsound import playsound # type: ignore

app = Flask(__name__)
CORS(app, origins="http://localhost:5173", methods=["POST", "GET"], supports_credentials=True)
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
    ai_response = generate_response(user_input, user_language, user_difficulty_number, communicationStyle)
    
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
