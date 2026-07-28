import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import { Play } from 'lucide-react';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/api/movies/${id}`);
        setMovie(res.data);
        
        // Fetch recommendations from our ML model based on title
        if (res.data.title) {
          const recRes = await axios.get(`http://localhost:5000/api/movies/recommend?title=${encodeURIComponent(res.data.title)}`);
          setRecommendations(recRes.data);
        }
      } catch (err) {
        console.error("Error fetching movie details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!movie) return <div className="text-center text-white mt-20">Movie not found</div>;

  const backdropUrl = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` 
    : '';

  const trailer = movie.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube');

  return (
    <div className="pb-20">
      {/* Hero Backdrop */}
      <div className="relative h-[60vh] md:h-[80vh] w-full">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10"></div>
        {backdropUrl && (
          <img src={backdropUrl} alt={movie.title} className="absolute inset-0 w-full h-full object-cover" />
        )}
        
        <div className="absolute bottom-0 left-0 w-full z-20 px-4 md:px-10 pb-10 flex flex-col md:flex-row gap-8 items-end">
          <img 
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            alt={movie.title} 
            className="w-48 md:w-64 rounded-xl shadow-2xl hidden md:block border border-white/10"
          />
          <div className="flex-1">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-2">{movie.title}</h1>
            <p className="text-muted text-lg mb-4">
              {movie.release_date?.split('-')[0]} • {movie.runtime} min • {movie.genres?.map(g => g.name).join(', ')}
            </p>
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-primary/20 text-primary font-bold px-4 py-2 rounded-full border border-primary/50">
                ★ {movie.vote_average?.toFixed(1)} / 10
              </div>
              {trailer && (
                <a 
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-gray-200 transition-colors"
                >
                  <Play className="w-5 h-5" fill="currentColor" /> Watch Trailer
                </a>
              )}
            </div>
            <p className="text-gray-300 text-lg max-w-3xl leading-relaxed">{movie.overview}</p>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-10 mt-10">
        <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-primary pl-4">Cast</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
          {movie.credits?.cast?.slice(0, 10).map(actor => (
            <div key={actor.id} className="min-w-[120px] text-center">
              <img 
                src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : 'https://via.placeholder.com/200x300?text=No+Image'} 
                alt={actor.name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover mx-auto mb-2 border border-white/10"
              />
              <p className="text-white font-medium text-sm line-clamp-1">{actor.name}</p>
              <p className="text-muted text-xs line-clamp-1">{actor.character}</p>
            </div>
          ))}
        </div>
      </div>

      {recommendations.length > 0 && (
        <div className="px-4 md:px-10 mt-16">
          <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-primary pl-4">Because you watched {movie.title}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {recommendations.map(rec => (
              <MovieCard key={rec.id} movie={rec} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
