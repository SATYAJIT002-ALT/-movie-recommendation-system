import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';

const HomePage = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Pick a random page between 1 and 20 to ensure fresh movies
        const randomPage = Math.floor(Math.random() * 20) + 1;
        const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/movies/popular?page=${randomPage}`);
        
        if (res.data && res.data.results) {
          // Shuffle the movies for an even more randomized feel
          const shuffledMovies = res.data.results.sort(() => 0.5 - Math.random());
          setPopularMovies(shuffledMovies);
        }
      } catch (err) {
        console.error("Error fetching movies", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="min-h-screen pt-10 px-4 md:px-10">
      <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-primary pl-4">Trending Now</h2>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {popularMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
