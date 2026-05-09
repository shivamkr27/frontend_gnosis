import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Zap, Coins, ArrowRight, RotateCcw } from 'lucide-react';

export function LessonComplete() {
  const { levelId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="w-full max-w-md bg-gnosis-card border border-gnosis-border rounded-3xl p-8 text-center"
      >
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gnosis-gold to-gnosis-purple-light mb-2">
          Level Complete!
        </h2>
        <p className="text-gnosis-muted mb-8">You've mastered this concept.</p>

        {/* Stars */}
        <div className="flex justify-center gap-4 mb-8">
          {[1, 2, 3].map((star, idx) => (
            <motion.div
              key={star}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3 + (idx * 0.2), type: "spring" }}
            >
              <Star className="w-16 h-16 text-gnosis-gold fill-gnosis-gold drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gnosis-bg border border-gnosis-border rounded-2xl p-4 flex flex-col items-center">
            <Zap className="w-8 h-8 text-gnosis-purple-light mb-2" />
            <span className="text-2xl font-bold">+50</span>
            <span className="text-xs text-gnosis-muted font-medium uppercase tracking-wider">Total XP</span>
          </div>
          <div className="bg-gnosis-bg border border-gnosis-border rounded-2xl p-4 flex flex-col items-center">
            <Coins className="w-8 h-8 text-gnosis-gold mb-2" />
            <span className="text-2xl font-bold">+15</span>
            <span className="text-xs text-gnosis-muted font-medium uppercase tracking-wider">Coins</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={() => navigate('/subject/1')}
            className="w-full bg-gnosis-purple hover:bg-gnosis-purple/90 text-white rounded-xl py-4 font-bold flex items-center justify-center gap-2 transition-colors"
          >
            Continue Path <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate(`/lesson/${levelId}`)}
            className="w-full bg-gnosis-bg hover:bg-gnosis-border border border-gnosis-border text-gnosis-text rounded-xl py-4 font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <RotateCcw className="w-5 h-5" /> Review Answers
          </button>
        </div>
      </motion.div>
    </div>
  );
}
