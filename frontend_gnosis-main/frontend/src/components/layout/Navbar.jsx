import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Coins, Settings, Zap } from 'lucide-react';

export function Navbar() {
  const location = useLocation();

  // Hide nav on specific immersive pages if needed
  if (['/'].includes(location.pathname)) {
      return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gnosis-bg/80 backdrop-blur-md border-b border-gnosis-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-gnosis-text tracking-tighter">
              Gnosis<span className="text-gnosis-purple">.</span>
            </Link>
            <div className="flex gap-4">
              <Link to="/auth" className="text-sm font-medium text-gnosis-text hover:text-gnosis-purple-light transition-colors py-2 px-4">Log In</Link>
              <Link to="/auth" className="text-sm font-medium bg-gnosis-purple hover:bg-gnosis-purple/90 text-white py-2 px-4 rounded-full transition-colors">Sign Up</Link>
            </div>
          </div>
        </nav>
      );
  }

  if (['/auth'].includes(location.pathname)) {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gnosis-card border-b border-gnosis-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Left: Logo */}
        <Link to="/home" className="text-xl font-bold text-gnosis-text">
          Gnosis<span className="text-gnosis-purple">.</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <Link to="/home" className="text-sm font-medium text-gnosis-text hover:text-gnosis-purple-light">Path</Link>
          <Link to="/battle" className="text-sm font-medium text-gnosis-text hover:text-gnosis-purple-light">Battle</Link>
          <Link to="/leaderboard" className="text-sm font-medium text-gnosis-text hover:text-gnosis-purple-light">Leaderboard</Link>
        </div>

        {/* Right: User Stats & Profile */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 text-gnosis-gold bg-gnosis-bg px-2 py-1 rounded-full text-sm font-medium border border-gnosis-border">
            <Coins size={16} />
            <span>1,250</span>
          </div>
          <div className="flex items-center space-x-1 text-gnosis-purple-light bg-gnosis-bg px-2 py-1 rounded-full text-sm font-medium border border-gnosis-border">
            <Zap size={16} />
            <span>Lv 5</span>
          </div>

          <Link to="/profile/me" className="w-8 h-8 rounded-full bg-gnosis-purple flex items-center justify-center text-white font-bold hover:ring-2 hover:ring-gnosis-purple-light transition-all">
            U
          </Link>
        </div>

      </div>
    </nav>
  );
}
