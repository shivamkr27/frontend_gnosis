import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Home, RotateCw, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export function BattleResults() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-2xl bg-gnosis-card border border-gnosis-border rounded-3xl p-8 text-center"
      >
        <div className="mb-8">
          <motion.div
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            className="inline-block bg-gnosis-green/20 text-gnosis-green border border-gnosis-green px-8 py-3 rounded-full font-black text-3xl tracking-widest uppercase mb-6 shadow-[0_0_30px_rgba(16,185,129,0.3)]"
          >
            Victory!
          </motion.div>

          <div className="flex items-center justify-center gap-2 text-gnosis-purple-light font-bold text-xl">
            <Zap className="fill-gnosis-purple-light" />
            <span>+50 Room XP Earned</span>
          </div>
        </div>

        {/* Score Comparison */}
        <div className="flex items-center justify-center gap-8 mb-12 bg-gnosis-bg p-6 rounded-2xl border border-gnosis-border">
          {/* You */}
          <div className="flex flex-col items-center flex-1">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gnosis-purple to-gnosis-purple-light flex items-center justify-center text-white text-2xl font-black mb-3 ring-4 ring-gnosis-purple/30 shadow-lg">
              U
            </div>
            <div className="font-bold text-lg mb-1 text-gnosis-text">You</div>
            <div className="text-4xl font-black text-gnosis-purple-light">1450</div>
            <div className="text-xs font-bold text-gnosis-muted uppercase tracking-wider mt-1">Score</div>
          </div>

          <div className="text-2xl font-black text-gnosis-border px-4">VS</div>

          {/* Opponent */}
          <div className="flex flex-col items-center flex-1 opacity-75">
            <div className="w-20 h-20 rounded-full bg-gnosis-card border-2 border-gnosis-border flex items-center justify-center text-gnosis-muted text-2xl font-bold mb-3">
              O
            </div>
            <div className="font-bold text-lg mb-1 text-gnosis-muted">Opponent</div>
            <div className="text-4xl font-black text-gnosis-red">950</div>
            <div className="text-xs font-bold text-gnosis-muted uppercase tracking-wider mt-1">Score</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/battle')}
            className="bg-gnosis-purple hover:bg-gnosis-purple/90 text-white rounded-xl px-8 py-4 font-bold flex items-center justify-center gap-2 transition-all hover:scale-105"
          >
            <RotateCw className="w-5 h-5" /> Play Again
          </button>
          <button
            onClick={() => navigate('/home')}
            className="bg-gnosis-card hover:bg-gnosis-border border border-gnosis-border text-gnosis-text rounded-xl px-8 py-4 font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <Home className="w-5 h-5" /> Return Home
          </button>
        </div>
      </motion.div>
    </div>
  );
}
