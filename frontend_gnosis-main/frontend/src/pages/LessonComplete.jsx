import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export function LessonComplete() {
  const { levelId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="max-w-container-max mx-auto px-4 md:px-10 pt-24 pb-32">
      <div className="flex flex-col items-center text-center space-y-12">

        {/* Hero Trophy Section */}
        <section className="space-y-4">
          <div className="relative inline-block">
            <div className="absolute inset-0 blur-3xl bg-[#f4a261]/20 rounded-full"></div>
            <svg className="w-24 h-24 text-[#f4a261] relative z-10 fill-current" viewBox="0 0 24 24"><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0011 15.9V19H7v2h10v-2h-4v-3.1a5.01 5.01 0 003.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/></svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#f4a261] tracking-tight">Lesson Complete!</h1>
          <p className="text-lg text-gnosis-muted max-w-md mx-auto">You've mastered the fundamentals of Control Systems Logic. Your engineering prowess is growing.</p>
        </section>

        {/* Bento Performance Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {/* XP Metrics */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 bg-[#19202d] border border-[#2e3543]/20 rounded-lg flex flex-col items-center justify-center space-y-2">
              <span className="text-xs font-bold text-gnosis-muted uppercase tracking-widest">Base XP</span>
              <span className="text-2xl font-serif font-bold text-gnosis-text">400</span>
            </div>
            {/* Note: User requested removal of combo streaks. Replaced with Accuracy bonus */}
            <div className="p-6 bg-[#19202d] border border-[#2e3543]/20 rounded-lg flex flex-col items-center justify-center space-y-2">
              <span className="text-xs font-bold text-[#f1cc71] uppercase tracking-widest">Accuracy Bonus</span>
              <div className="flex items-center gap-1">
                <svg className="w-5 h-5 text-[#f1cc71] fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                <span className="text-2xl font-serif font-bold text-gnosis-text">+120</span>
              </div>
            </div>
            <div className="p-6 bg-[#19202d] border border-[#2e3543]/20 rounded-lg flex flex-col items-center justify-center space-y-2">
              <span className="text-xs font-bold text-[#30a193] uppercase tracking-widest">Speed Bonus</span>
              <div className="flex items-center gap-1">
                <svg className="w-5 h-5 text-[#30a193] fill-current" viewBox="0 0 24 24"><path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/></svg>
                <span className="text-2xl font-serif font-bold text-gnosis-text">+80</span>
              </div>
            </div>
          </div>

          {/* Total XP Progress Card */}
          <div className="p-8 bg-[#232a38] border border-[#f4a261]/20 rounded-lg flex flex-col justify-between">
            <div>
              <span className="text-sm font-bold text-gnosis-muted">Total XP Earned</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#f4a261] mt-2">600</h2>
            </div>
            <div className="mt-6 space-y-3">
              <div className="flex justify-between text-xs font-bold text-gnosis-muted">
                <span>Level 14</span>
                <span>Next: 2,000 XP</span>
              </div>
              <div className="h-1.5 w-full bg-[#19202d] rounded-full overflow-hidden">
                <div className="h-full bg-[#f4a261] rounded-full" style={{width: '65%'}}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Unlocked Section */}
        <div className="w-full max-w-4xl pt-8">
          <div className="relative group cursor-pointer bg-[#19202d] border border-[#2e3543]/10 rounded-xl overflow-hidden flex flex-col md:flex-row items-stretch">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#30a193]"></div>
            <div className="w-full md:w-64 h-48 md:h-auto overflow-hidden bg-slate-800 flex items-center justify-center">
               <svg className="w-16 h-16 text-slate-600 fill-current" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
            </div>
            <div className="p-8 flex-1 flex flex-col justify-center text-left space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 bg-[#30a193]/10 text-[#30a193] border border-[#30a193]/20 text-xs font-bold rounded uppercase">Next Unlocked</span>
                <span className="text-gnosis-muted text-xs font-bold tracking-widest uppercase">• 15 MIN ESTIMATE</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-gnosis-text">Advanced PID Controller Logic</h3>
              <p className="text-sm text-gnosis-muted">Move beyond basic on-off cycles and dive into proportional-integral-derivative feedback loops used in aerospace systems.</p>
              <div className="flex items-center text-[#30a193] font-bold text-sm gap-2 group-hover:gap-4 transition-all">
                <span>Continue to Next Module</span>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Action Cluster */}
        <div className="flex flex-col sm:flex-row gap-6 pt-8">
          <button onClick={() => navigate('/home')} className="px-10 py-4 bg-[#f4a261] text-[#4e2600] font-bold text-sm rounded-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-3">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/></svg>
            BACK TO MAP
          </button>
        </div>

      </div>
    </div>
  );
}