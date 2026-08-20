import os
import requests

def get_api_key():
    return os.getenv('TMDB_API_KEY')

BASE_URL = 'https://api.themoviedb.org/3'

MOCK_MOVIES = {
    "results": [
        {"id": 155, "title": "The Dark Knight", "poster_path": "/qJ2tW6WMUDux911r6m7haRef0WH.jpg", "overview": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.", "vote_average": 9.0},
        {"id": 27205, "title": "Inception", "poster_path": "/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg", "overview": "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\", the implantation of another person's idea into a target's subconscious.", "vote_average": 8.8},
        {"id": 157336, "title": "Interstellar", "poster_path": "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", "overview": "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.", "vote_average": 8.6}
    ]
}

def fetch_popular_movies(page=1):
    api_key = get_api_key()
    url = f"{BASE_URL}/movie/popular?api_key={api_key}&language=en-US&page={page}"
    try:
        response = requests.get(url, timeout=3.0)
        return response.json() if response.status_code == 200 else MOCK_MOVIES
    except requests.exceptions.RequestException:
        return MOCK_MOVIES

def fetch_movie_details(movie_id):
    api_key = get_api_key()
    url = f"{BASE_URL}/movie/{movie_id}?api_key={api_key}&append_to_response=credits,videos,reviews,similar,recommendations"
    try:
        response = requests.get(url, timeout=3.0)
        return response.json() if response.status_code == 200 else {}
    except requests.exceptions.RequestException:
        return {}

def search_movies(query, page=1):
    api_key = get_api_key()
    url = f"{BASE_URL}/search/movie?api_key={api_key}&query={query}&page={page}"
    try:
        response = requests.get(url, timeout=3.0)
        return response.json() if response.status_code == 200 else MOCK_MOVIES
    except requests.exceptions.RequestException:
        return MOCK_MOVIES

def get_genres():
    api_key = get_api_key()
    url = f"{BASE_URL}/genre/movie/list?api_key={api_key}&language=en-US"
    try:
        response = requests.get(url, timeout=3.0)
        return response.json() if response.status_code == 200 else {"genres": []}
    except requests.exceptions.RequestException:
        return {"genres": []}
