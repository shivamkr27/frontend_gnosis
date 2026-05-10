import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export function ChallengeWaiting() {
  const navigate = useNavigate();
  const { friendId } = useParams();

  return (
    <div className="max-w-container-max mx-auto px-4 md:px-10 py-12 md:py-20 flex flex-col items-center">

      {/* Match Info Header */}
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-sm font-bold text-[#f4a261] tracking-[0.2em] uppercase">Upcoming Encounter</h2>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gnosis-text">1v1 Combat Initiative</h1>
        <p className="text-gnosis-muted max-w-xl mx-auto text-lg">A formal challenge has been issued. Awaiting the opponent's confirmation to begin the assessment.</p>
      </div>

      {/* Battle Canvas */}
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Current User (Left) */}
        <div className="md:col-span-5 flex flex-col items-center md:items-end text-center md:text-right space-y-6">
          <div className="relative">
            <div className="w-40 h-40 rounded-full border border-[#f4a261]/30 p-2">
              <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-4xl font-bold text-slate-400">AC</div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-[#30a193] text-[#003731] px-3 py-1 rounded-sm font-bold text-xs">YOU</div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-serif font-bold text-gnosis-text">Alex Chen</h3>
            <p className="text-gnosis-muted font-bold text-sm">Rank: Senior Scholar</p>
          </div>
        </div>

        {/* VS Indicator (Center) */}
        <div className="md:col-span-2 flex flex-col items-center justify-center space-y-4 py-8">
          <div className="w-px h-24 bg-gradient-to-b from-transparent via-[#2e3543] to-transparent"></div>
          <div className="text-[#f4a261] text-3xl font-serif font-bold italic tracking-widest px-4">VS</div>
          <div className="w-px h-24 bg-gradient-to-b from-[#2e3543] via-[#2e3543] to-transparent"></div>
        </div>

        {/* Opponent (Right) */}
        <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
          <div className="relative">
            <div className="w-40 h-40 rounded-full border border-dashed border-[#2e3543]/50 p-2 animate-[pulse_3s_infinite]">
              <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-4xl font-bold text-slate-400 opacity-60">JV</div>
            </div>
            <div className="absolute -bottom-2 -left-2 bg-[#2e3543] border border-[#2e3543]/30 text-gnosis-muted px-3 py-1 rounded-sm font-bold text-xs">PENDING</div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-serif font-bold text-gnosis-text">Jordan V.</h3>
            <div className="flex items-center gap-2 text-[#f4a261] font-bold text-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f4a261] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f4a261]"></span>
              </span>
              Waiting for response...
            </div>
          </div>
        </div>
      </div>

      {/* Battle Details Bento */}
      <div className="mt-20 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Subject Card */}
        <div className="bg-[#151c29] border border-[#2e3543]/20 p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-[#30a193]">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.83L19.17 19H4.83L12 5.83z"/></svg>
              <span className="font-bold text-sm tracking-widest uppercase">ACADEMIC SUBJECT</span>
            </div>
            <h4 className="text-2xl font-serif font-bold text-gnosis-text">System Design</h4>
            <p className="text-gnosis-muted text-sm">Module 4: Distributed Caching and Databases.</p>
          </div>
        </div>

        {/* Format Card */}
        <div className="bg-[#151c29] border border-[#2e3543]/20 p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-[#f4a261]">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/></svg>
              <span className="font-bold text-sm tracking-widest uppercase">BATTLE FORMAT</span>
            </div>
            <h4 className="text-2xl font-serif font-bold text-gnosis-text">Blitz Assessment</h4>
            <p className="text-gnosis-muted text-sm">10 questions | 45 seconds per response | Precision bonus enabled.</p>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="mt-16 flex flex-col md:flex-row gap-6 w-full max-w-4xl justify-center">
        <button onClick={() => navigate('/battle')} className="px-12 py-4 bg-[#f4a261] text-[#4e2600] font-bold text-sm rounded-sm active:scale-95 transition-all duration-200" style={{ boxShadow: '0 0 15px rgba(244, 162, 97, 0.15)' }}>
          CANCEL CHALLENGE
        </button>
      </div>

    </div>
  );
}