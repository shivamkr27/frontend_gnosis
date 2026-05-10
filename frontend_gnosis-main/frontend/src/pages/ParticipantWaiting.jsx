import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export function ParticipantWaiting() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="max-w-container-max mx-auto px-margin-desktop py-12 md:py-20 font-body-md text-on-surface selection:bg-primary-container selection:text-on-primary-container min-h-screen bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">

        {/* Left Side: Room Information */}
        <div className="lg:col-span-7 space-y-12">
          <section>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-lg mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-label-md text-[14px] font-semibold text-primary tracking-widest uppercase">Lobby Active</span>
            </div>
            <h1 className="font-headline-xl text-[48px] font-bold text-on-surface mb-4">You've joined Advanced Fluid Dynamics</h1>
            <p className="font-body-lg text-[18px] text-on-surface-variant mb-8">Hosted by <span className="text-secondary font-semibold">Prof. K. Subramanian</span></p>

            <div className="flex flex-wrap gap-4 mb-12">
              <div className="flex items-center gap-2 px-4 py-2 bg-surface-container-high border border-outline-variant/30 rounded-lg">
                <span className="material-symbols-outlined text-primary">menu_book</span>
                <span className="font-label-md text-[14px] font-semibold">Engineering Physics</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-surface-container-high border border-outline-variant/30 rounded-lg">
                <span className="material-symbols-outlined text-primary">timer</span>
                <span className="font-label-md text-[14px] font-semibold">45 Minutes</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-surface-container-high border border-outline-variant/30 rounded-lg">
                <span className="material-symbols-outlined text-primary">military_tech</span>
                <span className="font-label-md text-[14px] font-semibold">250 XP Reward</span>
              </div>
            </div>
          </section>

          {/* Instructions Bento */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 bg-surface-container-low border-l-2 border-primary rounded-lg space-y-4">
              <span className="material-symbols-outlined text-primary">history_edu</span>
              <h3 className="font-headline-md text-[24px] font-semibold text-on-surface">Quiz Protocol</h3>
              <p className="font-body-md text-[16px] text-on-surface-variant">Answer within the time limit. Accuracy provides base score, while speed provides a multiplier. No tab switching allowed.</p>
            </div>
            <div className="p-8 bg-surface-container-low border-l-2 border-secondary rounded-lg space-y-4">
              <span className="material-symbols-outlined text-secondary">psychology</span>
              <h3 className="font-headline-md text-[24px] font-semibold text-on-surface">Focus Areas</h3>
              <p className="font-body-md text-[16px] text-on-surface-variant">Reynold's Number, Bernoulli's Principle, and Navier-Stokes equations will be the primary focus of this session.</p>
            </div>
          </section>

          {/* Status Box */}
          <div className="mt-12 p-10 bg-surface-container-lowest border border-outline-variant/20 flex flex-col items-center justify-center text-center rounded-xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
            </div>
            <div className="relative z-10">
              <div className="mb-6 inline-flex p-4 rounded-full bg-primary/5">
                <span className="material-symbols-outlined text-primary text-4xl animate-pulse">hourglass_empty</span>
              </div>
              <h2 className="font-headline-md text-[24px] font-semibold text-primary mb-2">Waiting for host to start...</h2>
              <p className="font-body-md text-[16px] text-on-surface-variant max-w-md mx-auto">The session will begin automatically as soon as Prof. K. Subramanian initiates the launch sequence.</p>
            </div>
          </div>
        </div>

        {/* Right Side: Players Lobby */}
        <div className="lg:col-span-5">
          <div className="bg-surface-container-low border border-outline-variant/30 rounded-xl overflow-hidden sticky top-28">
            <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary">groups</span>
                <h3 className="font-headline-md text-[24px] font-semibold text-on-surface">Lobby Participants</h3>
              </div>
              <span className="bg-secondary/10 text-secondary font-bold px-3 py-1 rounded-full text-label-md text-[14px]">4 / 24</span>
            </div>

            <div className="p-4 h-[500px] overflow-y-auto space-y-3 custom-scrollbar">
              {/* Current User */}
              <div className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold">JD</div>
                  <div>
                    <p className="font-label-md text-[14px] font-semibold text-on-surface">John Doe (You)</p>
                    <p className="text-[10px] uppercase tracking-tighter text-primary">Ready to battle</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>

              {/* Other Players */}
              <div className="flex items-center justify-between p-4 hover:bg-surface-container-high transition-colors rounded-lg border border-transparent hover:border-outline-variant/20">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-bold">AS</div>
                  <div>
                    <p className="font-label-md text-[14px] font-semibold text-on-surface">Ananya Sharma</p>
                    <p className="text-[10px] uppercase tracking-tighter text-on-surface-variant">Rank 12</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>

              <div className="flex items-center justify-between p-4 hover:bg-surface-container-high transition-colors rounded-lg border border-transparent hover:border-outline-variant/20">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface font-bold">RV</div>
                  <div>
                    <p className="font-label-md text-[14px] font-semibold text-on-surface">Rahul Verma</p>
                    <p className="text-[10px] uppercase tracking-tighter text-on-surface-variant">Rank 45</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>

              <div className="flex items-center justify-between p-4 hover:bg-surface-container-high transition-colors rounded-lg border border-transparent hover:border-outline-variant/20">
                <div className="flex items-center gap-4">
                  <img alt="Student Avatar" className="w-10 h-10 rounded-full object-cover grayscale brightness-75" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoJoZTGquV9XZTVVliIMt_OkFwozqEm6gjPclZrtNI2T8mV0EkvU5JzFsdH4b_uW_cMRWPjoQfVz0Bg7sXbyTucvibDOvxdugL4p0RHjb5k9etfNQxwUJUsrXPHFIDsw8MR5etDoL-e7AYS67N_OClF9T90PbX0JTaoWvoItszID3PTgdJkA8sX_ly4D01dLue2WlMC5mJM1v3Tb_hjS5QStMWkqgxlod713ECdX8D5Merw8K5ssJ3k7s3r4phzui9APa4hIR7EZ0"/>
                  <div>
                    <p className="font-label-md text-[14px] font-semibold text-on-surface">Vikram Singh</p>
                    <p className="text-[10px] uppercase tracking-tighter text-on-surface-variant">Rank 3</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>
            </div>

            <div className="p-6 bg-surface-container-highest/50 border-t border-outline-variant/30">
              <button
                onClick={() => navigate('/battle')}
                className="w-full bg-primary text-on-primary py-4 rounded font-bold hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">logout</span>
                LEAVE LOBBY
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}