import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

export function SubjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="bg-surface text-on-surface font-body-md selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      <main className="max-w-4xl mx-auto px-margin-mobile md:px-0 py-12 md:py-20">

        {/* Header Section */}
        <header className="mb-16 border-l-4 border-primary pl-6">
          <nav className="flex items-center gap-2 mb-4 text-on-surface-variant font-label-sm text-[12px] font-medium">
            <span className="cursor-pointer hover:text-on-surface" onClick={() => navigate('/home')}>Courses</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary">Data Structures</span>
          </nav>
          <h1 className="font-headline-xl text-[48px] font-bold mb-4">Data Structures</h1>
          <p className="text-on-surface-variant max-w-2xl font-body-lg text-[18px]">
            Master the fundamental principles of procedural programming. From pointer arithmetic to memory management, build a foundation for high-performance engineering.
          </p>
        </header>

        {/* Progress Display */}
        <div className="flex items-center gap-8 mb-12 bg-surface-container-low border border-outline-variant/30 p-6 rounded-lg">
          <div className="flex-1">
             <div className="flex justify-between items-end mb-2">
                <span className="font-label-md text-[14px] font-semibold text-primary">Progress</span>
                <span className="font-label-md text-[14px] font-semibold text-primary">25% (1/4)</span>
             </div>
             <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: '25%' }}></div>
             </div>
          </div>
          <div className="flex items-center gap-2 border-l border-outline-variant/30 pl-8">
             <span className="material-symbols-outlined text-tertiary text-3xl">local_fire_department</span>
             <div>
                <div className="font-headline-md text-[24px] font-semibold text-on-surface leading-none">42</div>
                <div className="font-label-sm text-[12px] font-medium text-tertiary uppercase tracking-widest mt-1">Day Streak</div>
             </div>
          </div>
        </div>

        {/* Vertical Stacked Cards */}
        <div className="space-y-6">

          {/* Level 1: Unlocked */}
          <div className="relative group bg-surface-container-low border border-outline-variant/30 hover:border-primary/40 transition-all duration-300 p-8 rounded-lg shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-primary/10 border border-primary/20 text-primary rounded-full">
                  <span className="font-headline-md text-[24px] font-semibold">1</span>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-headline-md text-[24px] font-semibold text-on-surface">Arrays & Strings</h3>
                    <span className="bg-secondary-container/20 text-secondary px-2 py-1 rounded font-label-sm text-[12px] font-medium">CURRENT</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-on-surface-variant font-label-md text-[14px] font-semibold">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px]">schedule</span> 15 min
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px] text-tertiary">stars</span> 250 XP
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate('/lesson/1')}
                className="bg-primary text-on-primary px-8 py-3 font-label-md text-[14px] font-semibold uppercase tracking-wider hover:bg-primary-container transition-colors active:scale-95 rounded"
              >
                Start Session
              </button>
            </div>
          </div>

          {/* Level 2: Locked */}
          <div className="relative bg-surface-container-low/40 border border-outline-variant/10 p-8 rounded-lg opacity-60 grayscale-[0.5]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-outline-variant/30 text-on-surface-variant rounded-full">
                  <span className="font-headline-md text-[24px] font-semibold">2</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-[24px] font-semibold text-on-surface mb-1">Hash Maps</h3>
                  <div className="flex flex-wrap items-center gap-4 text-on-surface-variant font-label-md text-[14px] font-semibold">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px]">schedule</span> 25 min
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px]">stars</span> 400 XP
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant font-label-md text-[14px] font-semibold">
                <span className="material-symbols-outlined">lock</span> Locked
              </div>
            </div>
          </div>

          {/* Level 3: Locked */}
          <div className="relative bg-surface-container-low/40 border border-outline-variant/10 p-8 rounded-lg opacity-60 grayscale-[0.5]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-outline-variant/30 text-on-surface-variant rounded-full">
                  <span className="font-headline-md text-[24px] font-semibold">3</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-[24px] font-semibold text-on-surface mb-1">Linked Lists</h3>
                  <div className="flex flex-wrap items-center gap-4 text-on-surface-variant font-label-md text-[14px] font-semibold">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px]">schedule</span> 30 min
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px]">stars</span> 500 XP
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant font-label-md text-[14px] font-semibold">
                <span className="material-symbols-outlined">lock</span> Locked
              </div>
            </div>
          </div>

          {/* Level 4: Locked */}
          <div className="relative bg-surface-container-low/40 border border-outline-variant/10 p-8 rounded-lg opacity-60 grayscale-[0.5]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-outline-variant/30 text-on-surface-variant rounded-full">
                  <span className="font-headline-md text-[24px] font-semibold">4</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-[24px] font-semibold text-on-surface mb-1">Trees & Graphs</h3>
                  <div className="flex flex-wrap items-center gap-4 text-on-surface-variant font-label-md text-[14px] font-semibold">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px]">schedule</span> 45 min
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px]">stars</span> 750 XP
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant font-label-md text-[14px] font-semibold">
                <span className="material-symbols-outlined">lock</span> Locked
              </div>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}