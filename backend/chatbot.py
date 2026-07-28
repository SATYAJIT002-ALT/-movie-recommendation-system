import os
from google import genai
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

if GEMINI_API_KEY and GEMINI_API_KEY != 'YOUR_GEMINI_API_KEY_HERE':
    client = genai.Client(api_key=GEMINI_API_KEY)
else:
    client = None

def get_movie_suggestion(user_message):
    if not client:
        return "Gemini API Key is not configured. Please add it to the .env file."
        
    prompt = f"""
    You are an AI Movie Assistant for a premium movie recommendation platform.
    Your goal is to suggest movies, answer questions about movies, and provide recommendations based on the user's mood, preferences, actors, or genres.
    Keep your answers concise, engaging, and format the movie titles in **bold**.
    
    User: {user_message}
    AI: 
    """
    
    try:
        response = client.models.generate_content(
            model='gemini-flash-latest',
            contents=prompt,
        )
        return response.text
    except Exception as e:
        return f"Error communicating with AI: {str(e)}"
