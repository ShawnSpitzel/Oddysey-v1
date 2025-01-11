from pathlib import Path
from openai import OpenAI # type: ignore
from dotenv import load_dotenv # type: ignore
import os
import time
from playsound import playsound # type: ignore
load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
audio_dir = Path('/Users/shawnspitzel/Odyssey/frontend/src/assets/audio')
audio_file_path = audio_dir / "sound.mp3"
def text_to_speech(input):
    try:
        # Make the API call to generate speech
        response = client.audio.speech.create(
            model="tts-1",
            voice="alloy",
            input=input
        )
        
        # Stream the response to the file
        response.stream_to_file(audio_file_path)

        # Wait until the file is fully written
        while not audio_file_path.exists():
            print("Waiting for the audio file to be generated...")
            time.sleep(1)  # Wait a bit before checking again

        print(f"Audio file saved at: {audio_file_path}")
        return audio_file_path
    except Exception as e:
        print(f"Error generating speech: {e}")
        return None

def play_delete_audio(audio_path):
    if audio_path.exists():
        # Remove the audio file after playing
        os.remove(audio_path)
        print("Audio successfully deleted.")
    else:
        print("Audio file does not exist.")