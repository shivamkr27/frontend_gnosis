import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Trophy, Home, RotateCw } from 'lucide-react';
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
            className="inline-block bg-gnosis-green/20 text-gnosis-green border border-gnosis-green px-6 py-2 rounded-full font-black text-2xl tracking-widest uppercase mb-6"
          >
            Victory!
          </motion.div>
          <p className="text-gnosis-muted">You gained +25 Matchmaking Rating (MMR)</p>
        </div>

        {/* Score Comparison */}
        <div className="flex items-center justify-center gap-8 mb-12">
          {/* You */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-gnosis-purple flex items-center justify-center text-white text-2xl font-bold mb-3 ring-4 ring-gnosis-purple/30">
              U
            </div>
            <div className="font-bold text-lg mb-1">You</div>
            <div className="text-3xl font-black text-gnosis-purple-light">1450</div>
            <div className="text-sm text-gnosis-muted">Score</div>
          </div>

          <div className="text-3xl font-black text-gnosis-muted">VS</div>

          {/* Opponent */}
          <div className="flex flex-col items-center opacity-75">
            <div className="w-20 h-20 rounded-full bg-gnosis-bg border-2 border-gnosis-border flex items-center justify-center text-gnosis-muted text-2xl font-bold mb-3">
              O
            </div>
            <div className="font-bold text-lg mb-1">Opponent</div>
            <div className="text-3xl font-black text-gnosis-red">950</div>
            <div className="text-sm text-gnosis-muted">Score</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/battle')}
            className="bg-gnosis-purple hover:bg-gnosis-purple/90 text-white rounded-xl px-8 py-4 font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <RotateCw className="w-5 h-5" /> Play Again
          </button>
          <button
            onClick={() => navigate('/home')}
            className="bg-gnosis-bg hover:bg-gnosis-border border border-gnosis-border text-gnosis-text rounded-xl px-8 py-4 font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <Home className="w-5 h-5" /> Return Home
          </button>
        </div>
      </motion.div>
    </div>
  );
}
