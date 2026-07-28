import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from models import db, User, Favorite, WatchLater, SearchHistory
from recommendation import recommend_movies
from chatbot import get_movie_suggestion
import tmdb_client
import jwt
import datetime
from werkzeug.security import check_password_hash

load_dotenv()

app = Flask(__name__)
CORS(app)

# Configure Database
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'movies.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'default-secret')

db.init_app(app)

# Initialize DB
with app.app_context():
    db.create_all()

# --- Auth Middleware ---
def token_required(f):
    def decorator(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing'}), 401
        try:
            token = token.split(" ")[1] # Bearer token
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = User.query.get(data['user_id'])
        except:
            return jsonify({'message': 'Token is invalid'}), 401
        return f(current_user, *args, **kwargs)
    decorator.__name__ = f.__name__
    return decorator

# --- API Routes ---
@app.route('/api/status', methods=['GET'])
def status():
    return jsonify({"status": "Backend is running!"})

@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if User.query.filter_by(username=username).first():
        return jsonify({"message": "User already exists"}), 400

    new_user = User(username=username)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 201

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    if not user or not user.check_password(password):
        return jsonify({"message": "Invalid credentials"}), 401

    token = jwt.encode({
        'user_id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)
    }, app.config['SECRET_KEY'], algorithm="HS256")

    return jsonify({"token": token, "username": user.username, "is_admin": user.is_admin})

@app.route('/api/movies/recommend', methods=['GET'])
def recommend():
    title = request.args.get('title')
    limit = int(request.args.get('limit', 5))
    if not title:
        return jsonify({"message": "Title is required"}), 400
    
    recommendations = recommend_movies(title, limit)
    return jsonify(recommendations)

@app.route('/api/chatbot', methods=['POST'])
def chatbot():
    data = request.get_json()
    message = data.get('message', '')
    if not message:
        return jsonify({"response": "Please say something."}), 400
        
    reply = get_movie_suggestion(message)
    return jsonify({"response": reply})

@app.route('/api/movies/popular', methods=['GET'])
def get_popular_movies():
    page = request.args.get('page', 1)
    data = tmdb_client.fetch_popular_movies(page)
    return jsonify(data)

@app.route('/api/movies/<int:movie_id>', methods=['GET'])
def get_movie_details(movie_id):
    data = tmdb_client.fetch_movie_details(movie_id)
    return jsonify(data)

@app.route('/api/movies/search', methods=['GET'])
def search_movies():
    query = request.args.get('query', '')
    page = request.args.get('page', 1)
    if not query:
        return jsonify({"message": "Query parameter is required"}), 400
    data = tmdb_client.search_movies(query, page)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
