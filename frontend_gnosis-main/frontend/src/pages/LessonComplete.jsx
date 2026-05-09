import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Flame, ArrowRight, RotateCcw, CheckCircle } from 'lucide-react';

export function LessonComplete() {
  const { levelId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="w-full max-w-md bg-gnosis-card border border-gnosis-border rounded-3xl p-8 text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gnosis-purple to-gnosis-purple-light"></div>

        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="mx-auto w-20 h-20 bg-gnosis-green/20 rounded-full flex items-center justify-center mb-4"
        >
          <CheckCircle className="w-10 h-10 text-gnosis-green" />
        </motion.div>

        <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gnosis-text to-gnosis-muted mb-2">
          Level Complete!
        </h2>
        <p className="text-gnosis-purple-light font-bold mb-8">+50 Total XP Earned</p>

        {/* XP Breakdown */}
        <div className="bg-gnosis-bg border border-gnosis-border rounded-2xl p-6 mb-8 text-left space-y-4">
          <div className="flex justify-between items-center font-medium">
            <span className="text-gnosis-muted">Base XP</span>
            <span className="text-gnosis-text font-bold">+30</span>
          </div>
          <div className="flex justify-between items-center font-medium">
            <span className="text-gnosis-muted flex items-center gap-2"><Zap className="w-4 h-4 text-gnosis-gold"/> Speed Bonus</span>
            <span className="text-gnosis-gold font-bold">+10</span>
          </div>
          <div className="flex justify-between items-center font-medium">
            <span className="text-gnosis-muted flex items-center gap-2"><Flame className="w-4 h-4 text-orange-500"/> Streak Bonus</span>
            <span className="text-orange-500 font-bold">+10</span>
          </div>
          <div className="pt-4 border-t border-gnosis-border flex justify-between items-center font-black text-lg">
            <span>Total</span>
            <span className="text-gnosis-purple-light">50 XP</span>
          </div>
        </div>

        {/* Streak Update */}
        <div className="flex items-center justify-center gap-3 bg-orange-500/10 border border-orange-500/20 text-orange-500 p-4 rounded-2xl mb-8">
          <Flame className="w-6 h-6 fill-current animate-pulse" />
          <div className="text-left">
            <div className="font-black text-lg">15 Day Streak!</div>
            <div className="text-xs font-medium opacity-80">You practiced today. Keep it up!</div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={() => navigate('/subject/1')}
            className="w-full bg-gnosis-purple hover:bg-gnosis-purple/90 text-white rounded-xl py-4 font-bold flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
          >
            Continue Path <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate(`/lesson/${levelId}/review`)}
            className="w-full bg-gnosis-card hover:bg-gnosis-border border border-gnosis-border text-gnosis-text rounded-xl py-4 font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <RotateCcw className="w-5 h-5" /> Review Answers
          </button>
        </div>
      </motion.div>
    </div>
  );
}
