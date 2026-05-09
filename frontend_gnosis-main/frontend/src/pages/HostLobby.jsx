import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Users, Copy } from 'lucide-react';

export function HostLobby() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto flex flex-col items-center">
      <div className="text-center mb-12">
        <h2 className="text-xl text-gnosis-muted mb-2">Room Code</h2>
        <div className="flex items-center justify-center gap-4 bg-gnosis-card border border-gnosis-border px-8 py-4 rounded-2xl">
          <span className="text-5xl font-black tracking-widest text-gnosis-purple-light">XY8-92B</span>
          <button className="p-2 hover:bg-gnosis-bg rounded-lg transition-colors text-gnosis-muted hover:text-gnosis-text">
            <Copy className="w-6 h-6" />
          </button>
        </div>
        <p className="text-sm text-gnosis-muted mt-4">Share this code with your friends to let them join.</p>
      </div>

      <div className="w-full bg-gnosis-card border border-gnosis-border rounded-3xl p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold flex items-center gap-2"><Users className="w-6 h-6"/> Players Joined</h3>
          <span className="bg-gnosis-bg px-3 py-1 rounded-full text-sm font-bold">3/10</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* Mock Players */}
          {['You (Host)', 'Alex', 'Sam'].map((player, idx) => (
            <div key={idx} className="bg-gnosis-bg rounded-xl p-4 flex flex-col items-center text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mb-3 ${idx === 0 ? 'bg-gnosis-purple text-white' : 'bg-gnosis-card text-gnosis-text border border-gnosis-border'}`}>
                {player.charAt(0)}
              </div>
              <span className="font-bold text-sm truncate w-full">{player}</span>
            </div>
          ))}
          {/* Empty slot */}
          <div className="bg-gnosis-bg/50 border border-dashed border-gnosis-border rounded-xl p-4 flex items-center justify-center min-h-[120px]">
            <span className="text-gnosis-muted text-sm">Waiting...</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate(`/battle/room/${roomId}`)}
        className="w-full max-w-md bg-gnosis-green hover:bg-gnosis-green/90 text-white rounded-xl py-4 font-bold flex items-center justify-center gap-2 text-lg"
      >
        Start Game <Play className="w-6 h-6" />
      </button>
    </div>
  );
}
