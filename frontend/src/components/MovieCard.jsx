import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const MovieCard = ({ movie }) => {
  const imageUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster';

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.2 }}
      className="relative group rounded-xl overflow-hidden bg-surface cursor-pointer"
    >
      <Link to={`/movie/${movie.id}`}>
        <div className="aspect-[2/3] w-full">
          <img 
            src={imageUrl} 
            alt={movie.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-white font-bold text-lg line-clamp-1">{movie.title}</h3>
          {movie.vote_average && (
            <div className="flex items-center gap-1 mt-1 text-secondary text-sm font-semibold">
              <span>★</span> {movie.vote_average.toFixed(1)}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default MovieCard;
