# Cinemax - Premium Movie Recommendation System

A full-stack, production-grade movie recommendation platform featuring a 3D animated UI, AI Chatbot, and a custom Machine Learning recommendation engine.

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, React Three Fiber, GSAP
- **Backend**: Python Flask, SQLite, JWT Authentication
- **Machine Learning**: Scikit-Learn (TF-IDF, Cosine Similarity)
- **APIs**: TMDB API, Google Gemini API

## Setup Instructions

### 1. Backend Setup
```bash
cd backend
python -m venv venv
# Windows: venv\Scripts\activate
# Mac/Linux: source venv/bin/activate
pip install Flask pandas numpy scikit-learn nltk requests beautifulsoup4 Flask-CORS PyJWT python-dotenv Flask-SQLAlchemy google-generativeai
```

Add your API keys to `backend/.env`:
```
TMDB_API_KEY=your_tmdb_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
```

Run the server:
```bash
python app.py
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 3. ML Dataset Generation
Before requesting recommendations for the first time, generate the dataset and train the ML model:
```bash
python dataset/fetch_dataset.py
python model/train.py
```
