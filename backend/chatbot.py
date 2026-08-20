import os
from google import genai
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

if GEMINI_API_KEY and GEMINI_API_KEY != 'YOUR_GEMINI_API_KEY_HERE':
    client = genai.Client(api_key=GEMINI_API_KEY)
else:
    client = None

def _fallback_response(user_message):
    msg = user_message.lower()
    if 'action' in msg:
        return "Since I'm in offline mode (API key invalid), I recommend checking out **The Dark Knight** or **Die Hard**!"
    elif 'comedy' in msg:
        return "I'm offline right now, but for comedy I'd suggest **Superbad** or **Dumb and Dumber**!"
    elif 'sci-fi' in msg or 'space' in msg:
        return "Offline mode! But **Interstellar** and **The Matrix** are always great sci-fi choices."
    elif 'horror' in msg or 'scary' in msg:
        return "I'm currently offline, but **The Conjuring** is a solid scary movie!"
    else:
        return "Hello! I am currently in **Offline Mode** because the Gemini API key is invalid or missing. Please add a valid key in the `backend/.env` file. In the meantime, try asking me for a genre like 'action' or 'comedy'!"

def get_movie_suggestion(user_message):
    if not client:
        return _fallback_response(user_message)
        
    prompt = f"""
    You are an AI Movie Assistant for a premium movie recommendation platform.
    Your goal is to suggest movies, answer questions about movies, and provide recommendations based on the user's mood, preferences, actors, or genres.
    Keep your answers concise, engaging, and format the movie titles in **bold**.
    
    User: {user_message}
    AI: 
    """
    
    try:
        response = client.models.generate_content(
            model='gemini-3.6-flash',
            contents=prompt,
        )
        return response.text
    except Exception as e:
        error_msg = str(e)
        if '401' in error_msg or 'UNAUTHENTICATED' in error_msg or '404' in error_msg or 'NOT_FOUND' in error_msg:
            return _fallback_response(user_message)
        elif '503' in error_msg or 'UNAVAILABLE' in error_msg or '429' in error_msg or 'high demand' in error_msg:
            return "Whoops! The AI servers are currently experiencing high demand and need a quick breather. Please try your request again in a few moments!"
        return f"Error communicating with AI: {error_msg}"
