import React from 'react';
import { useNavigate } from 'react-router-dom';

export function HostConfig() {
  const navigate = useNavigate();

  return (
    <div className="max-w-container-max mx-auto px-4 md:px-10 py-12">
      <div className="grid grid-cols-12 gap-8">

        {/* Left Column: Settings Sidebar */}
        <aside className="col-span-12 lg:col-span-4 space-y-8">
          <div className="bg-[#151c29] p-8 border border-[#2e3543]/20">
            <h2 className="text-2xl font-serif font-bold text-[#f4a261] mb-6">Quiz Configuration</h2>
            <form className="space-y-6">
              <div className="group">
                <label className="block text-sm font-bold text-gnosis-muted mb-2 group-focus-within:text-[#f4a261] transition-colors">Subject Name</label>
                <input className="w-full bg-transparent border-b border-[#2e3543] focus:border-[#f4a261] text-gnosis-text py-2 px-0 transition-all outline-none" placeholder="e.g. Advanced Fluid Dynamics" type="text"/>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="group">
                  <label className="block text-sm font-bold text-gnosis-muted mb-2 group-focus-within:text-[#f4a261] transition-colors">Question Count</label>
                  <input className="w-full bg-transparent border-b border-[#2e3543] focus:border-[#f4a261] text-gnosis-text py-2 px-0 transition-all outline-none" min="1" type="number" defaultValue="10"/>
                </div>
                <div className="group">
                  <label className="block text-sm font-bold text-gnosis-muted mb-2 group-focus-within:text-[#f4a261] transition-colors">Timer (Sec)</label>
                  <input className="w-full bg-transparent border-b border-[#2e3543] focus:border-[#f4a261] text-gnosis-text py-2 px-0 transition-all outline-none" min="5" step="5" type="number" defaultValue="45"/>
                </div>
              </div>

              <div className="pt-8">
                <button onClick={() => navigate('/battle/host/room-123')} className="w-full bg-[#f4a261] text-[#4e2600] font-bold text-sm py-4 px-6 hover:brightness-110 transition-all flex justify-center items-center gap-2 active:scale-[0.98]" type="button">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M3 3h8v8H3zm2 2v4h4V5zm8-2h8v8h-8zm2 2v4h4V5zM3 13h8v8H3zm2 2v4h4v-4zm13.5-.5c.28 0 .5.22.5.5s-.22.5-.5.5-.5-.22-.5-.5.22-.5.5-.5zm-3.5 3c.28 0 .5.22.5.5s-.22.5-.5.5-.5-.22-.5-.5.22-.5.5-.5zm3.5 3c.28 0 .5.22.5.5s-.22.5-.5.5-.5-.22-.5-.5.22-.5.5-.5zm-6-6c.28 0 .5.22.5.5s-.22.5-.5.5-.5-.22-.5-.5.22-.5.5-.5zm3.5 0c.28 0 .5.22.5.5s-.22.5-.5.5-.5-.22-.5-.5.22-.5.5-.5zm0 3c.28 0 .5.22.5.5s-.22.5-.5.5-.5-.22-.5-.5.22-.5.5-.5zm3.5-3c.28 0 .5.22.5.5s-.22.5-.5.5-.5-.22-.5-.5.22-.5.5-.5z"/></svg>
                  Generate Sync Code
                </button>
                <p className="mt-4 text-gnosis-muted text-xs text-center italic">Creates a unique room for real-time multiplayer engagement.</p>
              </div>
            </form>
          </div>

          <div className="hidden lg:block">
            <div className="p-6 border border-[#2e3543]/10 bg-[#151c29]">
              <h4 className="text-sm font-bold text-[#30a193] mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 11.88 7 10.52 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.52-.8 2.88-2.15 4.1z"/></svg>
                HOST TIP
              </h4>
              <p className="text-gnosis-muted text-sm leading-relaxed">
                A 45-second timer is optimal for calculation-based questions. For theoretical concepts, consider lowering it to 20 seconds to maintain high-intensity engagement.
              </p>
            </div>
          </div>
        </aside>

        {/* Right Column: Question Editor */}
        <section className="col-span-12 lg:col-span-8 space-y-8">
          <div className="bg-[#151c29] border-t-2 border-[#f4a261]">
            <div className="p-8">
              <div className="flex justify-between items-end mb-8">
                <h3 className="text-2xl font-serif font-bold text-gnosis-text">Question <span className="text-[#f4a261]">01</span></h3>
                <div className="flex gap-2">
                  <span className="px-3 py-1 border border-[#30a193] text-[#30a193] font-bold text-xs uppercase tracking-wider">Physics</span>
                  <span className="px-3 py-1 border border-[#2e3543] text-gnosis-muted font-bold text-xs uppercase tracking-wider">Multiple Choice</span>
                </div>
              </div>

              <div className="mb-10 group">
                <label className="block text-sm font-bold text-gnosis-muted mb-4 group-focus-within:text-[#f4a261] transition-colors uppercase tracking-widest">Question Statement</label>
                <textarea className="w-full bg-[#2e3543]/20 border border-[#2e3543] focus:border-[#f4a261] focus:ring-1 focus:ring-[#f4a261] text-gnosis-text p-4 text-lg resize-none transition-all outline-none" placeholder="Enter your academic challenge here..." rows="4"></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Option A */}
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <input defaultChecked className="w-4 h-4 bg-transparent border-[#f4a261] text-[#f4a261] focus:ring-0 rounded-sm" type="checkbox"/>
                    <span className="font-bold text-sm text-[#f4a261]">A</span>
                  </div>
                  <input className="w-full bg-transparent border border-[#f4a261]/40 focus:border-[#f4a261] pl-16 pr-4 py-4 text-gnosis-text text-sm outline-none transition-all" type="text" defaultValue="Bernoulli's Principle"/>
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#f4a261] fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                </div>
                {/* Option B */}
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <input className="w-4 h-4 bg-transparent border-[#2e3543] text-[#2e3543] focus:ring-0 rounded-sm" type="checkbox"/>
                    <span className="font-bold text-sm text-gnosis-muted">B</span>
                  </div>
                  <input className="w-full bg-transparent border border-[#2e3543] focus:border-[#f4a261] pl-16 pr-4 py-4 text-gnosis-text text-sm outline-none transition-all" placeholder="Option B" type="text"/>
                </div>
                {/* Option C */}
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <input className="w-4 h-4 bg-transparent border-[#2e3543] text-[#2e3543] focus:ring-0 rounded-sm" type="checkbox"/>
                    <span className="font-bold text-sm text-gnosis-muted">C</span>
                  </div>
                  <input className="w-full bg-transparent border border-[#2e3543] focus:border-[#f4a261] pl-16 pr-4 py-4 text-gnosis-text text-sm outline-none transition-all" placeholder="Option C" type="text"/>
                </div>
                {/* Option D */}
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <input className="w-4 h-4 bg-transparent border-[#2e3543] text-[#2e3543] focus:ring-0 rounded-sm" type="checkbox"/>
                    <span className="font-bold text-sm text-gnosis-muted">D</span>
                  </div>
                  <input className="w-full bg-transparent border border-[#2e3543] focus:border-[#f4a261] pl-16 pr-4 py-4 text-gnosis-text text-sm outline-none transition-all" placeholder="Option D" type="text"/>
                </div>
              </div>

              <div className="mt-12 flex justify-between items-center">
                <button className="flex items-center gap-2 text-gnosis-muted hover:text-[#ffb4ab] transition-colors font-bold text-sm">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                  Clear Question
                </button>
                <button className="border border-[#30a193] text-[#30a193] hover:bg-[#30a193]/5 px-8 py-3 font-bold text-sm flex items-center gap-2 active:scale-95 transition-all">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                  Add Question
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4">
            <div className="flex-none w-12 h-12 bg-[#f4a261] flex items-center justify-center text-[#4e2600] font-bold">1</div>
            <div className="flex-none w-12 h-12 border border-[#2e3543] flex items-center justify-center text-gnosis-muted font-bold cursor-pointer hover:border-[#30a193] transition-colors">2</div>
            <div className="flex-none w-12 h-12 border border-[#2e3543] flex items-center justify-center text-gnosis-muted font-bold cursor-pointer hover:border-[#30a193] transition-colors">3</div>
            <div className="flex-none w-12 h-12 border border-[#2e3543] flex items-center justify-center text-gnosis-muted font-bold cursor-pointer hover:border-[#30a193] transition-colors">4</div>
            <div className="flex-none w-12 h-12 border border-[#2e3543] border-dashed flex items-center justify-center text-gnosis-muted cursor-pointer hover:text-[#f4a261] transition-colors">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}