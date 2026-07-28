import os
import sys
import pandas as pd
import requests
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), '..', 'backend', '.env'))

# Add backend to path to import tmdb_client
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'backend'))
import tmdb_client

def fetch_and_save_movies():
    print("Fetching popular movies from TMDB to build dataset...")
    movies = []
    # Fetch top 50 pages (1000 movies) to keep it manageable but effective
    for page in range(1, 51):
        data = tmdb_client.fetch_popular_movies(page)
        if 'results' in data:
            movies.extend(data['results'])
            print(f"Fetched page {page}/50")
        else:
            print(f"Error fetching page {page}: {data}")
            break
            
    if not movies:
        print("No movies fetched. Check API Key.")
        return

    df = pd.DataFrame(movies)
    
    # Ensure all expected columns are present
    expected_cols = ['id', 'title', 'overview', 'genre_ids', 'poster_path', 'vote_average', 'release_date']
    for col in expected_cols:
        if col not in df.columns:
            df[col] = ''
            
    df = df[expected_cols]
    
    genres_data = tmdb_client.get_genres()
    genre_map = {g['id']: g['name'] for g in genres_data.get('genres', [])}
    
    def map_genres(genre_ids):
        if not isinstance(genre_ids, list):
            return ""
        return " ".join([genre_map.get(gid, "") for gid in genre_ids])
        
    df['genres'] = df['genre_ids'].apply(map_genres)
    df['tags'] = df['overview'].fillna('') + ' ' + df['genres']
    
    os.makedirs(os.path.dirname(__file__), exist_ok=True)
    df.to_csv(os.path.join(os.path.dirname(__file__), 'movies.csv'), index=False)
    print("Saved dataset/movies.csv")

if __name__ == '__main__':
    fetch_and_save_movies()
