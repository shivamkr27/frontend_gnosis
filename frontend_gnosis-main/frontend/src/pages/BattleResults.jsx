import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export function BattleResults() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-12 pb-32 font-body-md text-on-surface selection:bg-primary-container selection:text-on-primary-container min-h-screen bg-background">
      {/* Victory Section */}
      <section className="flex flex-col items-center mb-16">
        <h1 className="font-headline-xl text-[48px] font-bold text-primary tracking-[0.2em] mb-2" style={{ textShadow: '0 0 20px rgba(255, 196, 153, 0.3)' }}>
          VICTORY
        </h1>
        <p className="font-label-md text-[14px] font-semibold text-on-surface-variant uppercase tracking-widest">
          Gnosis Arena Series • Match #742
        </p>
      </section>

      {/* Battle Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center mb-16">
        {/* User Profile (Winner Side) */}
        <div className="md:col-span-5 flex flex-col items-center md:items-end text-center md:text-right">
          <div className="relative mb-6">
            <div className="w-40 h-40 rounded-full border-2 border-primary p-2">
              <img alt="User Avatar" className="w-full h-full rounded-full object-cover grayscale-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB21Lg_g3-gYlqpQ1bIXOLrQeEJcrI37F7R1-CElCxU_but3YO1G3B2qhdVIEXo5DDT9GF1Pqu7TgRmmCyyEtwBf0p6piqvAS4SR3cm0l3XFjkdXurV2POYmR1feU2OHPds00wACWmYKeWrMEVoWQgsvP7oOQcFofSeYm4NfjH3RWydvR0dDumioq17FPKYLPmGoJhL06adjrqh9Y96v0mFs4UFhSmq9migidf0APm3yIzeoBIuEUTng1iWnEt9cgs5JfiAwIkVDGk"/>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-primary text-on-primary px-3 py-1 font-label-md text-[14px] font-semibold rounded">YOU</div>
          </div>
          <h3 className="font-headline-md text-[24px] font-semibold text-on-surface mb-1">Aaryan Sharma</h3>

          <div className="flex gap-4">
            <div className="text-right">
              <p className="font-label-sm text-[12px] font-medium text-on-surface-variant uppercase">Score</p>
              <p className="font-headline-md text-[24px] font-semibold text-on-surface">1450</p>
            </div>
          </div>
        </div>

        {/* VS Divider */}
        <div className="md:col-span-2 flex flex-col items-center justify-center py-8">
          <div className="w-px h-24 bg-gradient-to-b from-transparent via-outline-variant to-transparent opacity-30"></div>
          <div className="font-headline-lg text-[32px] font-semibold text-on-surface-variant/40 italic py-4">VS</div>
          <div className="w-px h-24 bg-gradient-to-b from-outline-variant via-outline-variant to-transparent opacity-30"></div>
        </div>

        {/* Opponent Profile (Loser Side) */}
        <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="relative mb-6">
            <div className="w-40 h-40 rounded-full border border-outline-variant p-2 opacity-60">
              <img alt="Opponent Avatar" className="w-full h-full rounded-full object-cover grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWWx9C-UigvLlqb4ee0DTVaN3Mezs6WqmzAYT2xk8gUs_dpWHAPqVxYgOaUKMBqeZcWw70neCvoRKg244e3r_8wZ6y49PCxMV05l3m_Bmafk8qmRGz7m1OWaE2edkkJH9_wXXIiWp1lVr2NIBJEn2lpW3Q0JAVnkSyzcqFm3ywidHzjcFT58VSG8TdqGIHyOraviU4P6oUFDJoS7fdPkHA6ccXNkH8Sf6s98MPrl2PjJkeegobkFp_QCb_6vlHx_vv_qeUvWc8Dog"/>
            </div>
          </div>
          <h3 className="font-headline-md text-[24px] font-semibold text-on-surface-variant mb-1">Marcus Thorne</h3>

          <div className="flex gap-4">
            <div className="text-left">
              <p className="font-label-sm text-[12px] font-medium text-on-surface-variant uppercase">Score</p>
              <p className="font-headline-md text-[24px] font-semibold text-on-surface-variant/60">950</p>
            </div>
          </div>
        </div>
      </div>

      {/* Rewards Grid (Only XP Earned kept) */}
      <div className="flex justify-center max-w-xl mx-auto mb-16">
        {/* XP Earned */}
        <div className="bg-surface-container border border-outline-variant/20 p-8 rounded-lg flex flex-col items-center justify-center relative overflow-hidden w-full max-w-sm">
          <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
          <span className="material-symbols-outlined text-primary mb-2 text-[32px]">military_tech</span>
          <p className="font-label-md text-[14px] font-semibold text-on-surface-variant uppercase mb-2">Room XP Earned</p>
          <h4 className="font-headline-xl text-[48px] font-bold text-on-surface">+50</h4>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => navigate('/battle')}
          className="bg-primary text-on-primary px-12 py-4 font-label-md text-[14px] font-semibold tracking-widest uppercase hover:opacity-90 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          Play Again
          <span className="material-symbols-outlined">restart_alt</span>
        </button>
        <button
          onClick={() => navigate('/home')}
          className="border border-primary text-primary px-12 py-4 font-label-md text-[14px] font-semibold tracking-widest uppercase hover:bg-primary/5 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          Return Home
          <span className="material-symbols-outlined">home</span>
        </button>
      </div>
    </div>
  );
}