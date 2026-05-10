import React from 'react';
import { useParams } from 'react-router-dom';

export function ParticipantWaiting() {
  const { roomId } = useParams();

  return (
    <div className="max-w-container-max mx-auto px-4 md:px-10 py-12 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Room Information */}
        <div className="lg:col-span-7 space-y-12">
          <section>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f4a261]/10 border border-[#f4a261]/20 rounded-lg mb-6">
              <span className="w-2 h-2 rounded-full bg-[#f4a261] animate-pulse"></span>
              <span className="text-xs font-bold text-[#f4a261] tracking-widest uppercase">Lobby Active</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gnosis-text mb-4">You've joined Advanced Fluid Dynamics</h1>
            <p className="text-lg text-gnosis-muted mb-8">Hosted by <span className="text-[#30a193] font-semibold">Prof. K. Subramanian</span></p>
            <div className="flex flex-wrap gap-4 mb-12">
              <div className="flex items-center gap-2 px-4 py-2 bg-[#232a38] border border-[#2e3543] rounded-lg">
                <svg className="w-5 h-5 text-[#f4a261] fill-current" viewBox="0 0 24 24"><path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zM21 18.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/></svg>
                <span className="font-bold text-sm text-gnosis-text">Engineering Physics</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-[#232a38] border border-[#2e3543] rounded-lg">
                <svg className="w-5 h-5 text-[#f4a261] fill-current" viewBox="0 0 24 24"><path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/></svg>
                <span className="font-bold text-sm text-gnosis-text">45 Minutes</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-[#232a38] border border-[#2e3543] rounded-lg">
                <svg className="w-5 h-5 text-[#f4a261] fill-current" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.83L19.17 19H4.83L12 5.83z"/></svg>
                <span className="font-bold text-sm text-gnosis-text">250 XP Reward</span>
              </div>
            </div>
          </section>

          {/* Instructions Bento */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 bg-[#151c29] border-l-2 border-[#f4a261] rounded-lg space-y-4">
              <h3 className="text-2xl font-serif font-bold text-gnosis-text">Quiz Protocol</h3>
              <p className="text-sm text-gnosis-muted">Answer within the time limit. Accuracy provides base score, while speed provides a multiplier. No tab switching allowed.</p>
            </div>
            <div className="p-8 bg-[#151c29] border-l-2 border-[#30a193] rounded-lg space-y-4">
              <h3 className="text-2xl font-serif font-bold text-gnosis-text">Focus Areas</h3>
              <p className="text-sm text-gnosis-muted">Reynold's Number, Bernoulli's Principle, and Navier-Stokes equations will be the primary focus of this session.</p>
            </div>
          </section>

          {/* Status Bar */}
          <div className="mt-12 p-10 bg-[#070e1b] border border-[#2e3543] flex flex-col items-center justify-center text-center rounded-xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="mb-6 inline-flex p-4 rounded-full bg-[#f4a261]/5">
                <svg className="w-10 h-10 text-[#f4a261] fill-current animate-pulse" viewBox="0 0 24 24"><path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6zm10 14.5V20H8v-3.5l4-4 4 4zm-4-5l-4-4V4h8v3.5l-4 4z"/></svg>
              </div>
              <h2 className="text-2xl font-serif font-bold text-[#f4a261] mb-2">Waiting for host to start...</h2>
              <p className="text-gnosis-muted max-w-md mx-auto text-sm">The session will begin automatically as soon as Prof. K. Subramanian initiates the launch sequence.</p>
            </div>
          </div>
        </div>

        {/* Right Side: Players Lobby */}
        <div className="lg:col-span-5">
          <div className="bg-[#151c29] border border-[#2e3543] rounded-xl overflow-hidden sticky top-28">
            <div className="p-6 border-b border-[#2e3543] flex justify-between items-center bg-[#19202d]">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-[#30a193] fill-current" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
                <h3 className="text-2xl font-serif font-bold text-gnosis-text">Lobby Participants</h3>
              </div>
              <span className="bg-[#30a193]/10 text-[#30a193] font-bold px-3 py-1 rounded-full text-sm">12 / 24</span>
            </div>
            <div className="p-4 h-[500px] overflow-y-auto space-y-3 custom-scrollbar">
              {/* Current User */}
              <div className="flex items-center justify-between p-4 bg-[#f4a261]/5 border border-[#f4a261]/20 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#f4a261] flex items-center justify-center text-[#4e2600] font-bold">JD</div>
                  <div>
                    <p className="font-bold text-sm text-gnosis-text">John Doe (You)</p>
                    <p className="text-[10px] uppercase tracking-widest text-[#f4a261]">Ready to battle</p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-[#f4a261] fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              </div>

              {/* Other Players */}
              <div className="flex items-center justify-between p-4 hover:bg-[#232a38] transition-colors rounded-lg border border-transparent hover:border-[#2e3543]">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#30a193] flex items-center justify-center text-[#003731] font-bold">AS</div>
                  <div>
                    <p className="font-bold text-sm text-gnosis-text">Ananya Sharma</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}