import os
import requests

def get_api_key():
    return os.getenv('TMDB_API_KEY')

BASE_URL = 'https://api.themoviedb.org/3'

def fetch_popular_movies(page=1):
    api_key = get_api_key()
    url = f"{BASE_URL}/movie/popular?api_key={api_key}&language=en-US&page={page}"
    response = requests.get(url)
    return response.json() if response.status_code == 200 else {}

def fetch_movie_details(movie_id):
    api_key = get_api_key()
    url = f"{BASE_URL}/movie/{movie_id}?api_key={api_key}&append_to_response=credits,videos,reviews,similar,recommendations"
    response = requests.get(url)
    return response.json() if response.status_code == 200 else {}

def search_movies(query, page=1):
    api_key = get_api_key()
    url = f"{BASE_URL}/search/movie?api_key={api_key}&query={query}&page={page}"
    response = requests.get(url)
    return response.json() if response.status_code == 200 else {}

def get_genres():
    api_key = get_api_key()
    url = f"{BASE_URL}/genre/movie/list?api_key={api_key}&language=en-US"
    response = requests.get(url)
    return response.json() if response.status_code == 200 else {}
