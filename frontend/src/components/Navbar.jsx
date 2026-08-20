import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, LogOut, Clapperboard } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2 text-primary font-bold text-2xl tracking-tighter">
              <Clapperboard className="w-8 h-8" />
              <span>Cinemax</span>
            </Link>
          </div>
          
          {token && (
            <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
              <div className="max-w-lg w-full lg:max-w-xs">
                <form onSubmit={handleSearch} className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-muted" />
                  </div>
                  <input
                    className="block w-full pl-10 pr-3 py-2 border border-white/20 rounded-full leading-5 bg-surface/50 text-text placeholder-muted focus:outline-none focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm transition-all duration-300"
                    placeholder="Search movies..."
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
              </div>
            </div>
          )}

          <div className="ml-4 flex items-center md:ml-6 gap-4">
            {token ? (
              <>
                <Link to="/dashboard" className="p-2 rounded-full hover:bg-white/10 transition-colors">
                  <User className="h-5 w-5 text-text" />
                </Link>
                <button onClick={handleLogout} className="p-2 rounded-full hover:bg-white/10 transition-colors text-primary">
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            ) : (
              <Link to="/auth" className="bg-primary text-white px-6 py-2 rounded-full font-medium hover:bg-primary/80 transition-colors shadow-[0_0_15px_rgba(229,9,20,0.5)]">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
