import pandas as pd
import pickle
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def train_model():
    print("Training Recommendation Model...")
    dataset_path = os.path.join(os.path.dirname(__file__), '..', 'dataset', 'movies.csv')
    
    if not os.path.exists(dataset_path):
        print("Dataset not found! Please run fetch_dataset.py first.")
        return
        
    movies = pd.read_csv(dataset_path)
    
    # Text Processing
    movies['tags'] = movies['tags'].fillna('')
    movies['tags'] = movies['tags'].apply(lambda x: str(x).lower())
    
    # TF-IDF Vectorization
    tfidf = TfidfVectorizer(max_features=5000, stop_words='english')
    vectorized_data = tfidf.fit_transform(movies['tags'])
    
    # Cosine Similarity
    similarity = cosine_similarity(vectorized_data)
    
    # Save the model
    os.makedirs(os.path.dirname(__file__), exist_ok=True)
    pickle.dump(movies.to_dict(), open(os.path.join(os.path.dirname(__file__), 'movies_dict.pkl'), 'wb'))
    pickle.dump(similarity, open(os.path.join(os.path.dirname(__file__), 'similarity.pkl'), 'wb'))
    
    print("Model training complete. Files saved: movies_dict.pkl, similarity.pkl")

if __name__ == "__main__":
    train_model()
