import pickle
import pandas as pd
import os

model_dir = os.path.join(os.path.dirname(__file__), '..', 'model')
movies_dict_path = os.path.join(model_dir, 'movies_dict.pkl')
similarity_path = os.path.join(model_dir, 'similarity.pkl')

movies = None
similarity = None

def load_model():
    global movies, similarity
    if os.path.exists(movies_dict_path) and os.path.exists(similarity_path):
        movies_dict = pickle.load(open(movies_dict_path, 'rb'))
        movies = pd.DataFrame(movies_dict)
        similarity = pickle.load(open(similarity_path, 'rb'))
        return True
    return False

def recommend_movies(movie_title, limit=5):
    if movies is None or similarity is None:
        if not load_model():
            return []
            
    # Case insensitive search
    movie_index_list = movies[movies['title'].str.lower() == movie_title.lower()].index
    if len(movie_index_list) == 0:
        return []
        
    movie_index = movie_index_list[0]
    distances = similarity[movie_index]
    
    # Get top recommended movies (excluding the movie itself)
    movies_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:limit+1]
    
    recommended = []
    for i in movies_list:
        movie_data = movies.iloc[i[0]]
        recommended.append({
            'id': int(movie_data.get('id', 0)),
            'title': movie_data.get('title', ''),
            'poster_path': movie_data.get('poster_path', ''),
            'vote_average': float(movie_data.get('vote_average', 0.0)),
            'similarity_score': float(i[1])
        })
        
    return recommended
