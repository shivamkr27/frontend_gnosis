import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Swords } from 'lucide-react';

export function ChallengeWaiting() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-gnosis-card border border-gnosis-border rounded-3xl p-8 text-center relative overflow-hidden">

        {/* Pulsing background effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gnosis-purple/20 rounded-full blur-3xl animate-pulse"></div>

        <div className="relative z-10">
          <Swords className="w-16 h-16 text-gnosis-purple-light mx-auto mb-6 animate-bounce" />
          <h2 className="text-2xl font-bold mb-2">Challenge Sent!</h2>
          <p className="text-gnosis-muted mb-8">Waiting for Friend123 to accept...</p>

          <button
            onClick={() => navigate('/battle')}
            className="bg-gnosis-bg hover:bg-gnosis-border border border-gnosis-border text-gnosis-text rounded-xl px-8 py-3 font-bold flex items-center justify-center gap-2 mx-auto transition-colors"
          >
            <X className="w-5 h-5" /> Cancel
          </button>
        </div>

      </div>
    </div>
  );
}
