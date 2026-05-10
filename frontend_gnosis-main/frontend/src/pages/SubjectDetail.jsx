import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

export function SubjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data for levels
  const levels = [
    { id: 1, name: "Variables", status: "completed", time: "15 min", xp: "250 XP" },
    { id: 2, name: "Control Structures", status: "locked", time: "25 min", xp: "400 XP" },
    { id: 3, name: "Functions & Scope", status: "locked", time: "30 min", xp: "450 XP" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-0 py-12 md:py-20 min-h-screen relative">

      {/* Background Mandala */}
      <div className="fixed bottom-0 right-0 -z-10 opacity-[0.03] pointer-events-none">
        <svg height="600" viewBox="0 0 100 100" width="600">
          <circle cx="50" cy="50" fill="none" r="45" stroke="#f4a261" strokeWidth="0.1"></circle>
          <rect fill="none" height="60" stroke="#f4a261" strokeWidth="0.1" transform="rotate(45 50 50)" width="60" x="20" y="20"></rect>
          <rect fill="none" height="50" stroke="#f4a261" strokeWidth="0.1" transform="rotate(22.5 50 50)" width="50" x="25" y="25"></rect>
          <circle cx="50" cy="50" fill="none" r="35" stroke="#f4a261" strokeWidth="0.1"></circle>
        </svg>
      </div>

      {/* Header Section */}
      <header className="mb-16 border-l-4 border-[#f4a261] pl-6">
        <nav className="flex items-center gap-2 mb-4 text-gnosis-muted text-xs font-bold uppercase tracking-widest">
          <button onClick={() => navigate('/home')} className="hover:text-gnosis-text transition-colors">Courses</button>
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
          <span className="text-[#f4a261]">C Programming</span>
        </nav>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gnosis-text mb-4">C Programming</h1>
        <p className="text-lg text-gnosis-muted max-w-2xl">
          Master the fundamental principles of procedural programming. From pointer arithmetic to memory management, build a foundation for high-performance engineering.
        </p>
      </header>

      {/* Vertical Stacked Cards */}
      <div className="space-y-6">
        {levels.map((level, idx) => {
          const isCompleted = level.status === 'completed';
          const isLocked = level.status === 'locked';

          return (
            <div key={level.id} className={`relative group p-8 rounded-lg transition-all duration-300
              ${isLocked ? 'bg-[#151c29]/40 border border-[#2e3543]/50 opacity-60 grayscale-[0.5]' : 'bg-[#151c29] border border-[#2e3543] hover:border-[#f4a261]/40 shadow-sm'}
            `}>
              {!isLocked && <div className="absolute top-0 left-0 w-1 h-6 bg-[#f4a261]"></div>}

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-6">
                  {/* Circle number */}
                  <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full text-2xl font-serif font-bold
                    ${isLocked ? 'border border-[#2e3543] text-gnosis-muted' : 'bg-[#f4a261]/10 border border-[#f4a261]/20 text-[#f4a261]'}
                  `}>
                    {level.id}
                  </div>

                  {/* Content */}
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-2xl font-serif font-bold text-gnosis-text">{level.name}</h3>
                      {!isLocked && <span className="bg-[#30a193]/20 text-[#30a193] px-2 py-1 rounded text-xs font-bold">CURRENT</span>}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-gnosis-muted text-sm font-bold mt-2">
                      <span className="flex items-center gap-1.5">
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                        {level.time}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <svg className="w-5 h-5 text-[#f1cc71] fill-current" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                        {level.xp}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right side status / action */}
                {!isLocked ? (
                  <button onClick={() => navigate(`/lesson/${level.id}`)} className="bg-[#f4a261] text-[#4e2600] px-8 py-3 font-bold text-sm uppercase tracking-wider hover:brightness-110 transition-colors active:scale-95">
                    Start Session
                  </button>
                ) : (
                  <div className="flex items-center gap-2 text-gnosis-muted font-bold text-sm">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
                    Locked
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}