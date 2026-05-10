import React from 'react';
import { useNavigate } from 'react-router-dom';

export function BattleResults() {
  const navigate = useNavigate();

  return (
    <div className="max-w-container-max mx-auto px-4 md:px-10 pt-12 pb-32">
      {/* Victory Section */}
      <section className="flex flex-col items-center mb-16">
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#f4a261] tracking-[0.2em] mb-2" style={{ textShadow: '0 0 40px rgba(244, 162, 97, 0.4)' }}>VICTORY</h1>
        <p className="text-sm font-bold text-gnosis-muted uppercase tracking-widest">Gnosis Arena Series • Match #742</p>
      </section>

      {/* Battle Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-16">
        {/* User Profile (Winner Side) */}
        <div className="md:col-span-5 flex flex-col items-center md:items-end text-center md:text-right">
          <div className="relative mb-6">
            <div className="w-40 h-40 rounded-full border-2 border-[#f4a261] p-2">
              <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-5xl font-bold text-slate-400">AS</div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-[#f4a261] text-[#4e2600] px-3 py-1 font-bold text-sm rounded">YOU</div>
          </div>
          <h3 className="text-2xl font-serif font-bold text-gnosis-text mb-1">Aaryan Sharma</h3>
          <p className="text-sm font-bold text-[#f4a261] mb-4">Lvl 42 Quantitative Analyst</p>
          <div className="flex gap-4">
            <div className="text-right">
              <p className="text-xs font-bold text-gnosis-muted uppercase">Accuracy</p>
              <p className="text-2xl font-serif font-bold text-gnosis-text">94%</p>
            </div>
            <div className="text-right border-l border-[#2e3543] pl-4">
              <p className="text-xs font-bold text-gnosis-muted uppercase">Time</p>
              <p className="text-2xl font-serif font-bold text-gnosis-text">12.4s</p>
            </div>
          </div>
        </div>

        {/* VS Divider */}
        <div className="md:col-span-2 flex flex-col items-center justify-center py-8">
          <div className="w-px h-24 bg-gradient-to-b from-transparent via-[#2e3543] to-transparent opacity-30"></div>
          <div className="text-3xl font-serif font-bold text-gnosis-muted/40 italic py-4">VS</div>
          <div className="w-px h-24 bg-gradient-to-b from-[#2e3543] via-[#2e3543] to-transparent opacity-30"></div>
        </div>

        {/* Opponent Profile (Loser Side) */}
        <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="relative mb-6">
            <div className="w-40 h-40 rounded-full border border-[#2e3543] p-2 opacity-60">
              <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-5xl font-bold text-slate-400 grayscale">MT</div>
            </div>
          </div>
          <h3 className="text-2xl font-serif font-bold text-gnosis-muted mb-1">Marcus Thorne</h3>
          <p className="text-sm font-bold text-gnosis-muted/70 mb-4">Lvl 38 Systems Architect</p>
          <div className="flex gap-4">
            <div className="text-left">
              <p className="text-xs font-bold text-gnosis-muted uppercase">Accuracy</p>
              <p className="text-2xl font-serif font-bold text-gnosis-muted/60">82%</p>
            </div>
            <div className="text-left border-l border-[#2e3543] pl-4">
              <p className="text-xs font-bold text-gnosis-muted uppercase">Time</p>
              <p className="text-2xl font-serif font-bold text-gnosis-muted/60">15.1s</p>
            </div>
          </div>
        </div>
      </div>

      {/* Simplified Rewards Box (Removing extra badges/skills per user request) */}
      <div className="max-w-md mx-auto">
        <div className="bg-[#19202d] border border-[#2e3543] p-8 rounded-lg flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#f4a261]"></div>
          <svg className="w-8 h-8 text-[#f4a261] mb-2 fill-current" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.83L19.17 19H4.83L12 5.83z"/></svg>
          <p className="text-sm font-bold text-gnosis-muted uppercase mb-2">Room XP Earned</p>
          <h4 className="text-4xl font-serif font-bold text-gnosis-text">+50</h4>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-16">
        <button onClick={() => navigate('/battle')} className="bg-[#f4a261] text-[#4e2600] px-12 py-4 font-bold text-sm tracking-widest uppercase hover:brightness-110 transition-all active:scale-95 flex items-center justify-center gap-2">
          Play Again
        </button>
        <button onClick={() => navigate('/home')} className="border border-[#f4a261] text-[#f4a261] px-12 py-4 font-bold text-sm tracking-widest uppercase hover:bg-[#f4a261]/5 transition-all active:scale-95 flex items-center justify-center gap-2">
          Return Home
        </button>
      </div>
    </div>
  );
}