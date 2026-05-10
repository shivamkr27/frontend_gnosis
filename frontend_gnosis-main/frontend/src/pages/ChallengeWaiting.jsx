import React from 'react';
import { useNavigate } from 'react-router-dom';

export function ChallengeWaiting() {
  const navigate = useNavigate();

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-20 flex flex-col items-center font-body-md text-on-surface selection:bg-primary-container selection:text-on-primary-container min-h-screen bg-background">

      {/* Match Info Header */}
      <div className="text-center mb-16 space-y-4">
        <h2 className="font-label-md text-[14px] font-semibold text-primary tracking-[0.2em] uppercase">Upcoming Encounter</h2>
        <h1 className="font-headline-xl text-[48px] font-bold">1v1 Combat Initiative</h1>
        <p className="text-on-surface-variant max-w-xl mx-auto text-[18px]">A formal challenge has been issued. Awaiting the opponent's confirmation to begin the assessment.</p>
      </div>

      {/* Battle Canvas */}
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
        {/* Current User (Left) */}
        <div className="md:col-span-5 flex flex-col items-center md:items-end text-center md:text-right space-y-6">
          <div className="relative">
            <div className="w-40 h-40 rounded-full border border-primary/30 p-2">
              <img alt="Your Avatar" className="w-full h-full rounded-full grayscale hover:grayscale-0 transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6xTRh_CfMfOudbWdDKRNduBcuWwYErv-US9bfj3NnWwUEbw3CwrLgMGua8Lmvkte3nM15eZXOQlyW9UasPK8WBxC_bP9cGsGb961hT0l6eInPlGj4kUHYo38rct2d6p3DVUzTI_V83M7ez2i8b2JLzWjQaMgdozgn39uiAWP2kI6_XncxOV7YK-vqKkAO0QY1HKZt4vm2ngTR_8DC8OSXU8WZa_gOzaCBQFnQGp5y5jX5jW9nPcptnkNLHr9DHt87SbCYQuFKLKk"/>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-secondary text-on-secondary px-3 py-1 rounded-sm font-label-sm text-[12px] font-medium">YOU</div>
          </div>
          <div className="space-y-1">
            <h3 className="font-headline-md text-[24px] font-semibold">Alex Chen</h3>
            <p className="text-on-surface-variant font-label-md text-[14px] font-semibold">Rank: Senior Scholar</p>
          </div>
        </div>

        {/* VS Indicator (Center) */}
        <div className="md:col-span-2 flex flex-col items-center justify-center space-y-4 py-8">
          <div className="w-px h-24 bg-gradient-to-b from-transparent via-outline-variant to-transparent"></div>
          <div className="text-primary font-headline-md text-[24px] font-semibold italic tracking-widest px-4">VS</div>
          <div className="w-px h-24 bg-gradient-to-b from-outline-variant via-outline-variant to-transparent"></div>
        </div>

        {/* Opponent (Right) */}
        <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
          <div className="relative">
            <div className="w-40 h-40 rounded-full border border-dashed border-outline-variant/50 p-2 animate-[pulse_3s_infinite]">
              <img alt="Opponent Avatar" className="w-full h-full rounded-full opacity-60 grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWbf96v7gcDN7mogV3I-8XBowBbH7kNv5MRazF7LLrtqrKXnWRs8DwBxFtOeQX92ENHmPwRXhDLcf01CbXT1wfkNuGaVbl2KXchCgqu18hMAWZc_Jo2bWPI3zOOJJlw3JB23hWA1OssXrk421nLVqK5Gf6d4xJeM9fIoeHluWujcSIDKK6trkXSdXk8c08WEezJ1wjgdSVtkyYHzqvxyMwO9eDYy9D16pKL5nfKR4YGrUoywkxi0I2c7S29i32x_yMr9bUs-qTdEs"/>
            </div>
            <div className="absolute -bottom-2 -left-2 bg-surface-container-highest border border-outline-variant/30 text-on-surface-variant px-3 py-1 rounded-sm font-label-sm text-[12px] font-medium">PENDING</div>
          </div>
          <div className="space-y-1">
            <h3 className="font-headline-md text-[24px] font-semibold">Jordan V.</h3>
            <div className="flex items-center gap-2 text-primary font-label-md text-[14px] font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Waiting for response...
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="mt-16 flex flex-col md:flex-row gap-6 w-full max-w-4xl justify-center">
        <button onClick={() => navigate('/battle')} className="px-12 py-4 bg-primary text-on-primary font-label-md text-[14px] font-semibold rounded-sm active:scale-95 transition-all duration-200">
          CANCEL CHALLENGE
        </button>
      </div>

    </div>
  );
}