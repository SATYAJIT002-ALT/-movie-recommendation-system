import React from 'react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const username = localStorage.getItem('username');

  return (
    <div className="min-h-screen pt-10 px-4 md:px-10 pb-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface/80 border border-white/10 rounded-2xl p-8 max-w-4xl mx-auto shadow-2xl backdrop-blur-md"
      >
        <div className="flex items-center gap-6 mb-8 border-b border-white/10 pb-8">
          <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-4xl font-bold text-white shadow-[0_0_20px_rgba(229,9,20,0.4)]">
            {username ? username.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">{username || 'User Dashboard'}</h1>
            <p className="text-muted mt-1">Cinephile Extraordinaire</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-black/50 p-6 rounded-xl border border-white/5 hover:border-primary/50 transition-colors">
            <h3 className="text-primary text-sm font-bold uppercase tracking-wider mb-2">Favorites</h3>
            <p className="text-4xl font-black text-white">0</p>
          </div>
          <div className="bg-black/50 p-6 rounded-xl border border-white/5 hover:border-primary/50 transition-colors">
            <h3 className="text-primary text-sm font-bold uppercase tracking-wider mb-2">Watch Later</h3>
            <p className="text-4xl font-black text-white">0</p>
          </div>
          <div className="bg-black/50 p-6 rounded-xl border border-white/5 hover:border-primary/50 transition-colors">
            <h3 className="text-primary text-sm font-bold uppercase tracking-wider mb-2">Reviews</h3>
            <p className="text-4xl font-black text-white">0</p>
          </div>
        </div>
        
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-primary pl-4">Recent Activity</h2>
          <div className="bg-black/30 rounded-xl p-6 text-center text-muted border border-white/5">
            You haven't interacted with any movies yet. Start exploring!
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
