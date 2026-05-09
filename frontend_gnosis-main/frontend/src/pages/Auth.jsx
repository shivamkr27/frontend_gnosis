import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login and redirect to home
    navigate('/home');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-gnosis-card border border-gnosis-border rounded-3xl p-8"
      >
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-bold text-gnosis-text tracking-tighter inline-block mb-6">
            Gnosis<span className="text-gnosis-purple">.</span>
          </Link>
          <h2 className="text-2xl font-bold mb-2">
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="text-gnosis-muted">
            {isLogin ? 'Enter your details to access your progress.' : 'Start your gamified learning journey today.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gnosis-muted mb-1">Username</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gnosis-muted" />
                <input
                  type="text"
                  className="w-full bg-gnosis-bg border border-gnosis-border rounded-xl py-3 pl-10 pr-4 text-gnosis-text focus:outline-none focus:border-gnosis-purple focus:ring-1 focus:ring-gnosis-purple transition-all"
                  placeholder="e.g. QuizMaster99"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gnosis-muted mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gnosis-muted" />
              <input
                type="email"
                className="w-full bg-gnosis-bg border border-gnosis-border rounded-xl py-3 pl-10 pr-4 text-gnosis-text focus:outline-none focus:border-gnosis-purple focus:ring-1 focus:ring-gnosis-purple transition-all"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gnosis-muted mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gnosis-muted" />
              <input
                type="password"
                className="w-full bg-gnosis-bg border border-gnosis-border rounded-xl py-3 pl-10 pr-4 text-gnosis-text focus:outline-none focus:border-gnosis-purple focus:ring-1 focus:ring-gnosis-purple transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gnosis-purple hover:bg-gnosis-purple/90 text-white rounded-xl py-3 font-bold flex items-center justify-center gap-2 mt-6 transition-colors"
          >
            {isLogin ? 'Log In' : 'Sign Up'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-8 text-center text-sm">
          <span className="text-gnosis-muted">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
          </span>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-gnosis-purple-light hover:text-gnosis-purple font-medium"
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
