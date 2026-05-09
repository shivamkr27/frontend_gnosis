import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { X, User } from 'lucide-react';
import { motion } from 'framer-motion';

export function ActiveBattle() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(15);

  // Mock timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      navigate(`/battle/results/${roomId}`);
    }
  }, [timeLeft, navigate, roomId]);

  return (
    <div className="min-h-screen bg-gnosis-bg flex flex-col absolute top-0 left-0 w-full z-50">

      {/* Battle Header */}
      <div className="bg-gnosis-card border-b border-gnosis-border p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">

          {/* Player 1 (You) */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gnosis-purple flex items-center justify-center text-white font-bold">You</div>
            <div className="hidden sm:block">
              <div className="font-bold">Player One</div>
              <div className="text-xl text-gnosis-purple-light font-extrabold">1200</div>
            </div>
          </div>

          {/* VS & Timer */}
          <div className="flex flex-col items-center">
            <div className="text-sm font-bold text-gnosis-red mb-1">VS</div>
            <div className={`text-2xl font-black ${timeLeft <= 5 ? 'text-gnosis-red animate-pulse' : 'text-gnosis-text'}`}>
              00:{timeLeft.toString().padStart(2, '0')}
            </div>
          </div>

          {/* Player 2 (Opponent) */}
          <div className="flex items-center gap-3 text-right">
            <div className="hidden sm:block">
              <div className="font-bold">Opponent</div>
              <div className="text-xl text-gnosis-red font-extrabold">950</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-gnosis-red flex items-center justify-center text-white font-bold">
              <User className="w-5 h-5" />
            </div>
          </div>

        </div>

        {/* Real-time Progress bars */}
        <div className="max-w-4xl mx-auto mt-4 flex gap-2">
           <div className="flex-1 bg-gnosis-bg h-2 rounded-l-full overflow-hidden flex justify-end">
             <div className="bg-gnosis-purple h-full" style={{ width: '60%' }}></div>
           </div>
           <div className="flex-1 bg-gnosis-bg h-2 rounded-r-full overflow-hidden">
             <div className="bg-gnosis-red h-full" style={{ width: '45%' }}></div>
           </div>
        </div>
      </div>

      {/* Question Area (Similar to ActiveQuiz but faster paced) */}
      <div className="flex-1 flex flex-col items-center px-4 pt-12 max-w-2xl mx-auto w-full">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 leading-tight">
          What is the time complexity of a Binary Search tree in the worst case?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {["O(1)", "O(log n)", "O(n)", "O(n^2)"].map((option, idx) => (
            <button
              key={idx}
              className="p-6 rounded-2xl border-2 border-gnosis-border bg-gnosis-card hover:border-gnosis-purple-light text-lg font-medium transition-all"
            >
              {option}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
