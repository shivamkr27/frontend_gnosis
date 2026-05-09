import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User as UserIcon, ArrowRight, Code } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">

      {/* Cool animated background shape */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-gnosis-purple/10 to-transparent rounded-full blur-[100px] pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md bg-gnosis-card/80 backdrop-blur-xl border border-gnosis-border rounded-3xl p-8 relative z-10 shadow-2xl"
      >
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-black tracking-tighter inline-block mb-6">
            GNOSIS<span className="text-gnosis-purple">.</span>
          </Link>
          <h2 className="text-2xl font-black mb-2">
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h2>
          <p className="text-gnosis-muted font-medium">
            {isLogin ? 'Enter your details to continue your path.' : 'Join the ultimate gamified learning platform.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <AnimatePresence mode="popLayout">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="block text-sm font-bold text-gnosis-muted mb-1.5">Username</label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gnosis-muted" />
                  <input
                    type="text"
                    className="w-full bg-gnosis-bg border border-gnosis-border rounded-xl py-3.5 pl-12 pr-4 text-gnosis-text focus:outline-none focus:border-gnosis-purple focus:ring-1 focus:ring-gnosis-purple transition-all font-medium"
                    placeholder="e.g. MasterDev99"
                    required={!isLogin}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <label className="block text-sm font-bold text-gnosis-muted mb-1.5">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gnosis-muted" />
              <input
                type="email"
                className="w-full bg-gnosis-bg border border-gnosis-border rounded-xl py-3.5 pl-12 pr-4 text-gnosis-text focus:outline-none focus:border-gnosis-purple focus:ring-1 focus:ring-gnosis-purple transition-all font-medium"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gnosis-muted mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gnosis-muted" />
              <input
                type="password"
                className="w-full bg-gnosis-bg border border-gnosis-border rounded-xl py-3.5 pl-12 pr-4 text-gnosis-text focus:outline-none focus:border-gnosis-purple focus:ring-1 focus:ring-gnosis-purple transition-all font-medium"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-gnosis-purple to-gnosis-purple-light hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] text-white rounded-xl py-4 font-black flex items-center justify-center gap-2 mt-6 transition-all hover:scale-[1.02]"
          >
            {isLogin ? 'Log In' : 'Sign Up'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px bg-gnosis-border flex-1"></div>
          <span className="text-xs font-bold text-gnosis-muted uppercase tracking-wider">OR</span>
          <div className="h-px bg-gnosis-border flex-1"></div>
        </div>

        <button className="w-full bg-gnosis-bg border border-gnosis-border hover:bg-gnosis-card text-gnosis-text rounded-xl py-3.5 font-bold flex items-center justify-center gap-3 transition-colors">
          <Code className="w-5 h-5" /> Continue with GitHub
        </button>

        <div className="mt-8 text-center text-sm font-medium">
          <span className="text-gnosis-muted">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
          </span>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-gnosis-purple-light hover:text-white font-bold ml-1 transition-colors"
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
