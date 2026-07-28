import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import MovieCard from '../components/MovieCard';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      setLoading(true);
      axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/movies/search?query=${encodeURIComponent(query)}`)
        .then(res => {
          setResults(res.data.results || []);
        })
        .catch(err => console.error("Search error", err))
        .finally(() => setLoading(false));
    }
  }, [query]);

  return (
    <div className="min-h-screen pt-10 px-4 md:px-10">
      <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-primary pl-4">
        Search Results for "{query}"
      </h2>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {results.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-lg">No movies found matching your query.</p>
      )}
    </div>
  );
};

export default SearchPage;
