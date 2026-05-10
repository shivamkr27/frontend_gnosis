import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gnosis-bg text-gnosis-text relative">
      {/* Background elements */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none overflow-hidden">
        <svg className="text-[#f4a261] stroke-current fill-none" height="800" viewBox="0 0 100 100" width="800">
          <circle cx="50" cy="50" r="45" strokeWidth="0.1"></circle>
          <circle cx="50" cy="50" r="35" strokeWidth="0.1"></circle>
          <path d="M50 5 L50 95 M5 50 L95 50" strokeWidth="0.1"></path>
          <rect height="50" strokeWidth="0.1" transform="rotate(45 50 50)" width="50" x="25" y="25"></rect>
          <rect height="60" strokeWidth="0.1" transform="rotate(22.5 50 50)" width="60" x="20" y="20"></rect>
          <rect height="60" strokeWidth="0.1" transform="rotate(67.5 50 50)" width="60" x="20" y="20"></rect>
        </svg>
      </div>

      <main className="relative pt-32 pb-20 px-4 md:px-10 max-w-container-max mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Text */}
          <div className="lg:col-span-7 z-10">
            <span className="inline-block px-3 py-1 bg-[#30a193]/10 text-[#30a193] border border-[#30a193]/20 text-xs font-bold uppercase tracking-widest mb-6 rounded-lg">GATEWAY TO TECHNICAL EXCELLENCE</span>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-gnosis-text mb-6 leading-tight">
              Master Tech. <br/>
              <span className="text-[#f4a261]">One Level at a Time.</span>
            </h1>
            <p className="text-lg text-gnosis-muted mb-10 max-w-xl">
              A rigorous, gamified curriculum designed specifically for BTech students. Transcend traditional learning through algorithmic challenges, architecture battles, and real-time skill tracking.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => navigate('/auth')} className="bg-[#f4a261] text-[#4e2600] px-8 py-4 font-bold text-sm rounded shadow-lg active:scale-95 transition-transform hover:brightness-110">
                Start Learning
              </button>
              <button onClick={() => navigate('/auth')} className="border border-[#f4a261] text-[#f4a261] px-8 py-4 font-bold text-sm rounded hover:bg-[#f4a261]/5 active:scale-95 transition-transform">
                Login
              </button>
            </div>
          </div>

          {/* Right Visual */}
          <div className="lg:col-span-5 relative mt-12 lg:mt-0">
            <div className="aspect-square bg-[#232a38] border border-[#2e3543] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1320] via-transparent to-transparent z-10"></div>
              {/* Mock Image Placeholder */}
              <div className="w-full h-full bg-[#151c29] flex items-center justify-center border-4 border-[#2e3543] opacity-60">
                 <svg className="w-32 h-32 text-[#2e3543]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm5 15h-2v-6H9v6H7v-7.81l5-4.5 5 4.5V18z"/></svg>
              </div>

              {/* Floating Badge */}
              <div className="absolute top-4 right-4 p-4 bg-[#2e3543] border border-[#f4a261]/20 z-20">
                <div className="absolute top-0 left-0 w-10 h-[2px] bg-[#f4a261]"></div>
                <div className="text-xs font-bold text-[#f4a261] uppercase mb-1">Live Challenge</div>
                <div className="font-serif text-xl font-bold text-gnosis-text">System Design</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Bento */}
        <div className="mt-32">
          <div className="flex flex-col mb-12">
            <h2 className="text-3xl font-serif font-bold text-gnosis-text mb-4">Core Mechanics</h2>
            <div className="h-1 w-20 bg-[#f4a261]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-[#19202d] border border-[#2e3543] flex flex-col items-start relative hover:border-[#f4a261]/40 transition-colors group">
              <div className="absolute top-0 left-0 w-10 h-[2px] bg-[#f4a261]"></div>
              <div className="p-3 bg-[#f4a261]/10 mb-6">
                <svg className="w-8 h-8 text-[#f4a261] fill-current" viewBox="0 0 24 24"><path d="M16.01 7L16 3h-2v4h-4V3H8v4h-.01C7 6.99 6 7.99 6 8.99v5.49L9.5 18v3h5v-3l3.5-3.51v-5.5c0-1-1-2-1.99-2z"/></svg>
              </div>
              <h3 className="text-2xl font-serif font-bold text-gnosis-text mb-4">Streaks</h3>
              <p className="text-gnosis-muted">Forge discipline through consistency. Our precision-engineered streak system tracks daily technical deep-dives, rewarding your focus with rare academic badges.</p>
            </div>

            <div className="p-8 bg-[#19202d] border border-[#2e3543] flex flex-col items-start relative hover:border-[#f4a261]/40 transition-colors group">
              <div className="absolute top-0 left-0 w-10 h-[2px] bg-[#f4a261]"></div>
              <div className="p-3 bg-[#f4a261]/10 mb-6">
                <svg className="w-8 h-8 text-[#f4a261] fill-current" viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>
              </div>
              <h3 className="text-2xl font-serif font-bold text-gnosis-text mb-4">XP Ledger</h3>
              <p className="text-gnosis-muted">Measure your technical mastery. Earn quantified experience points for accurate problem solving, speed, and architectural correctness.</p>
            </div>

            <div className="p-8 bg-[#19202d] border border-[#2e3543] flex flex-col items-start relative hover:border-[#f4a261]/40 transition-colors group">
              <div className="absolute top-0 left-0 w-10 h-[2px] bg-[#f4a261]"></div>
              <div className="p-3 bg-[#f4a261]/10 mb-6">
                <svg className="w-8 h-8 text-[#f4a261] fill-current" viewBox="0 0 24 24"><path d="M15.54 5.54L13.77 7.3 12 5.54 10.23 7.3 8.46 5.54 12 2l3.54 3.54zM7.3 10.23l1.76 1.77L7.3 13.77 5.54 12l1.76-1.77zm9.4 0l1.76 1.77-1.76 1.77-1.77-1.77 1.77-1.77zM12 22l-3.54-3.54 1.77-1.76 1.77 1.76 1.77-1.76 1.77 1.76L12 22z"/></svg>
              </div>
              <h3 className="text-2xl font-serif font-bold text-gnosis-text mb-4">Live Battles</h3>
              <p className="text-gnosis-muted">Test your knowledge against peers in real-time technical combat. Host secure group quizzes or challenge friends to 1v1 duels.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}