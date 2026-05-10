import React from 'react';
import { useNavigate } from 'react-router-dom';

export function HostLobby() {
  const navigate = useNavigate();

  return (
    <div className="max-w-container-max mx-auto px-4 md:px-10 py-12 md:py-20 mb-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

        {/* Room Identity Section */}
        <section className="md:col-span-12 lg:col-span-5 flex flex-col justify-center">
          <div className="mb-8">
            <span className="text-xs font-bold text-[#f1cc71] uppercase tracking-widest mb-4 block">Session Active</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gnosis-text mb-4">Engineering Ethics & Fluid Dynamics</h2>
            <p className="text-lg text-gnosis-muted max-w-md">
              A collaborative environment designed for rigorous academic inquiry. Ensure all participants have entered the room code to proceed.
            </p>
          </div>

          <div className="bg-[#19202d] border border-[#2e3543] p-8 rounded-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10">
               <svg className="w-24 h-24 text-gnosis-text fill-current" viewBox="0 0 24 24"><path d="M3 3h8v8H3zm2 2v4h4V5zm8-2h8v8h-8zm2 2v4h4V5zM3 13h8v8H3zm2 2v4h4v-4zm13.5-.5c.28 0 .5.22.5.5s-.22.5-.5.5-.5-.22-.5-.5.22-.5.5-.5zm-3.5 3c.28 0 .5.22.5.5s-.22.5-.5.5-.5-.22-.5-.5.22-.5.5-.5zm3.5 3c.28 0 .5.22.5.5s-.22.5-.5.5-.5-.22-.5-.5.22-.5.5-.5zm-6-6c.28 0 .5.22.5.5s-.22.5-.5.5-.5-.22-.5-.5.22-.5.5-.5zm3.5 0c.28 0 .5.22.5.5s-.22.5-.5.5-.5-.22-.5-.5.22-.5.5-.5zm0 3c.28 0 .5.22.5.5s-.22.5-.5.5-.5-.22-.5-.5.22-.5.5-.5zm3.5-3c.28 0 .5.22.5.5s-.22.5-.5.5-.5-.22-.5-.5.22-.5.5-.5z"/></svg>
            </div>
            <p className="text-sm font-bold text-gnosis-muted mb-2 tracking-widest uppercase">ACCESS CODE</p>
            <div className="flex items-center gap-4">
              <span className="text-4xl md:text-5xl font-serif text-[#f4a261] tracking-[0.2em] font-bold">GX-8802</span>
              <button className="text-gnosis-muted hover:text-[#f4a261] transition-colors active:scale-90">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
              </button>
            </div>
            <div className="mt-6 flex items-center gap-2 text-[#30a193]">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
              <span className="text-xs font-bold uppercase tracking-widest">Encrypted Session Host</span>
            </div>
          </div>

          <div className="mt-12">
            <p className="text-2xl font-serif text-gnosis-text italic mb-8 opacity-80">"Ready to Engage."</p>
            <button onClick={() => navigate('/battle/room/1')} className="bg-[#f4a261] text-[#4e2600] px-12 py-4 font-bold text-sm tracking-widest uppercase rounded-lg hover:brightness-110 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-3">
              START EVALUATION
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </div>
        </section>

        {/* Players Grid Section */}
        <section className="md:col-span-12 lg:col-span-7">
          <div className="flex justify-between items-end mb-6 border-b border-[#2e3543] pb-4">
            <div>
              <h3 className="text-2xl font-serif font-bold text-gnosis-text">Joined Participants</h3>
              <p className="text-xs font-bold text-gnosis-muted tracking-widest uppercase mt-1">LIVE SYNC ENABLED</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-serif font-bold text-[#30a193]">3</span>
              <span className="text-sm font-bold text-gnosis-muted">/ 40</span>
            </div>
          </div>

          {/* Bento Style Grid for Players */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {/* Player Card 1 */}
            <div className="bg-[#151c29] border border-[#2e3543] p-4 relative group hover:bg-[#232a38] transition-colors">
              <div className="absolute top-0 left-0 w-8 h-[2px] bg-[#f4a261]"></div>
              <div className="w-12 h-12 rounded mb-4 bg-slate-800 flex items-center justify-center font-bold text-slate-400">AS</div>
              <p className="font-bold text-sm text-gnosis-text truncate">Aryan Sharma</p>
              <p className="text-xs font-bold text-gnosis-muted tracking-widest uppercase mt-1">LVL 42</p>
              <div className="absolute top-2 right-2 w-2 h-2 bg-[#30a193] rounded-full animate-pulse"></div>
            </div>
            {/* Player Card 2 */}
            <div className="bg-[#151c29] border border-[#2e3543] p-4 relative group hover:bg-[#232a38] transition-colors">
              <div className="absolute top-0 left-0 w-8 h-[2px] bg-[#f4a261]"></div>
              <div className="w-12 h-12 rounded mb-4 bg-slate-800 flex items-center justify-center font-bold text-slate-400">PV</div>
              <p className="font-bold text-sm text-gnosis-text truncate">Priya Verma</p>
              <p className="text-xs font-bold text-gnosis-muted tracking-widest uppercase mt-1">LVL 38</p>
            </div>
            {/* Player Card 3 */}
            <div className="bg-[#151c29] border border-[#2e3543] p-4 relative group hover:bg-[#232a38] transition-colors">
              <div className="absolute top-0 left-0 w-8 h-[2px] bg-[#f4a261]"></div>
              <div className="w-12 h-12 rounded mb-4 bg-slate-800 flex items-center justify-center font-bold text-slate-400">IK</div>
              <p className="font-bold text-sm text-gnosis-text truncate">Ishan Kapur</p>
              <p className="text-xs font-bold text-gnosis-muted tracking-widest uppercase mt-1">LVL 12</p>
            </div>

            {/* Empty Slots */}
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="bg-[#151c29]/50 border border-dashed border-[#2e3543] p-4 flex items-center justify-center min-h-[120px] opacity-50">
                <span className="text-gnosis-muted text-xs font-bold tracking-widest uppercase">Waiting...</span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}