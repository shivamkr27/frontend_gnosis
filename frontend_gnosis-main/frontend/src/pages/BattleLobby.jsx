import React from 'react';
import { useNavigate } from 'react-router-dom';

export function BattleLobby() {
  const navigate = useNavigate();

  return (
    <div className="max-w-container-max mx-auto px-4 md:px-10 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 flex flex-col gap-10">
          <section>
            <h1 className="text-4xl font-serif font-bold text-gnosis-text mb-2">Arena</h1>
            <p className="text-gnosis-muted text-lg mb-8">Test your engineering prowess in real-time mental combat.</p>

            <div className="flex border-b border-[#2e3543] mb-8">
              <button className="px-8 py-4 font-bold text-sm text-[#f4a261] border-b-2 border-[#f4a261] tracking-wider transition-all">1V1 CHALLENGE</button>
              <button className="px-8 py-4 font-bold text-sm text-gnosis-muted hover:text-[#f4a261] tracking-wider transition-all">GROUP QUIZ</button>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between p-6 bg-[#19202d] border-l-4 border-[#f4a261] hover:bg-[#232a38] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-[#2e3543] flex items-center justify-center font-bold text-gnosis-muted border border-[#2e3543]">
                      AS
                    </div>
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#30a193] border-2 border-[#19202d] rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gnosis-text text-sm">Arya Sharma</h3>
                    <span className="text-xs text-[#30a193] uppercase font-bold tracking-widest mt-1 inline-block">Online</span>
                  </div>
                </div>
                <button onClick={() => navigate('/battle/waiting/1')} className="px-6 py-2 border border-[#f4a261] text-[#f4a261] hover:bg-[#f4a261] hover:text-[#4e2600] font-bold text-sm transition-all active:scale-95">CHALLENGE</button>
              </div>

              <div className="flex items-center justify-between p-6 bg-[#19202d] border-l-4 border-[#2e3543] hover:bg-[#232a38] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-[#2e3543] flex items-center justify-center font-bold text-gnosis-muted border border-[#2e3543]">
                      KV
                    </div>
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#30a193] border-2 border-[#19202d] rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gnosis-text text-sm">Kartik Varma</h3>
                    <span className="text-xs text-[#30a193] uppercase font-bold tracking-widest mt-1 inline-block">Online</span>
                  </div>
                </div>
                <button onClick={() => navigate('/battle/waiting/2')} className="px-6 py-2 border border-[#f4a261] text-[#f4a261] hover:bg-[#f4a261] hover:text-[#4e2600] font-bold text-sm transition-all active:scale-95">CHALLENGE</button>
              </div>

              <div className="flex items-center justify-between p-6 bg-[#19202d]/50 border-l-4 border-transparent opacity-60">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-[#2e3543] flex items-center justify-center font-bold text-gnosis-muted border border-[#2e3543]">
                      ML
                    </div>
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#534439] border-2 border-[#19202d] rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gnosis-text text-sm">Meera Lal</h3>
                    <span className="text-xs text-gnosis-muted uppercase font-bold tracking-widest mt-1 inline-block">Offline</span>
                  </div>
                </div>
                <button className="px-6 py-2 border border-[#534439] text-gnosis-muted cursor-not-allowed font-bold text-sm">CHALLENGE</button>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 bg-[#232a38] border border-[#2e3543]/30 flex flex-col items-center text-center gap-6">
              <div className="w-16 h-16 flex items-center justify-center bg-[#f4a261]/10 rounded-full">
                <svg className="w-8 h-8 text-[#f4a261] fill-current" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-gnosis-text mb-2">Create Room</h3>
                <p className="text-sm text-gnosis-muted">Host a custom quiz for your study group.</p>
              </div>
              <button onClick={() => navigate('/battle/host')} className="w-full py-4 bg-[#f4a261] text-[#4e2600] font-bold text-sm active:scale-95 transition-all">START HOSTING</button>
            </div>

            <div className="p-8 bg-[#232a38] border border-[#2e3543]/30 flex flex-col items-center text-center gap-6">
              <div className="w-16 h-16 flex items-center justify-center bg-[#30a193]/10 rounded-full">
                <svg className="w-8 h-8 text-[#30a193] fill-current" viewBox="0 0 24 24"><path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-gnosis-text mb-2">Join with Code</h3>
                <p className="text-sm text-gnosis-muted">Enter a private lobby code to join a session.</p>
              </div>
              <button className="w-full py-4 border border-[#30a193] text-[#30a193] hover:bg-[#30a193]/10 font-bold text-sm active:scale-95 transition-all">ENTER CODE</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}