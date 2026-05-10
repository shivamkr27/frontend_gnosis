import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Auth() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative p-4">
      {/* Background elements */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none overflow-hidden">
        <svg className="text-[#f4a261] stroke-current fill-none" height="800" viewBox="0 0 100 100" width="800">
          <circle cx="50" cy="50" r="45" strokeWidth="0.1"></circle>
          <circle cx="50" cy="50" r="35" strokeWidth="0.1"></circle>
          <path d="M50 5 L50 95 M5 50 L95 50" strokeWidth="0.1"></path>
          <rect height="50" strokeWidth="0.1" transform="rotate(45 50 50)" width="50" x="25" y="25"></rect>
          <rect height="60" strokeWidth="0.1" transform="rotate(22.5 50 50)" width="60" x="20" y="20"></rect>
          <rect height="60" strokeWidth="0.1" transform="rotate(67.5 50 50)" width="60" x="20" y="20"></rect>
        </svg>
      </div>

      <section className="w-full max-w-[440px] z-10">
        <div className="bg-[#151c29] border border-[#2e3543] rounded-lg p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-16 h-[2px] bg-[#f4a261]"></div>

          <div className="mb-10 text-center">
            <h1 className="text-2xl font-serif font-bold text-gnosis-text mb-2">Academic Portal</h1>
            <p className="text-gnosis-muted">Enter your credentials to continue research.</p>
          </div>

          <div className="flex border-b border-[#2e3543] mb-8">
            <button className="flex-1 pb-4 font-bold text-sm text-[#f4a261] border-b-2 border-[#f4a261] transition-all">Log In</button>
            <button className="flex-1 pb-4 font-bold text-sm text-gnosis-muted hover:text-gnosis-text transition-all">Sign Up</button>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gnosis-muted uppercase tracking-wider block">Email Address</label>
              <input
                className="w-full bg-transparent border-b border-[#2e3543] focus:border-[#f4a261] px-0 py-3 text-gnosis-text placeholder-[#2e3543] transition-all outline-none"
                placeholder="student.id@gnosis.edu"
                type="email"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gnosis-muted uppercase tracking-wider block">Password</label>
                <a className="text-xs font-bold text-[#f4a261] hover:underline" href="#">Forgot?</a>
              </div>
              <input
                className="w-full bg-transparent border-b border-[#2e3543] focus:border-[#f4a261] px-0 py-3 text-gnosis-text placeholder-[#2e3543] transition-all outline-none"
                placeholder="••••••••"
                type="password"
              />
            </div>

            <div className="flex items-center gap-3 py-2">
              <input className="w-4 h-4 rounded-none border-[#2e3543] text-[#f4a261] focus:ring-[#f4a261] bg-transparent" id="remember" type="checkbox"/>
              <label className="text-sm text-gnosis-muted font-bold" htmlFor="remember">Stay authenticated for 30 days</label>
            </div>

            <button className="w-full bg-[#f4a261] hover:brightness-110 text-[#4e2600] font-bold py-4 rounded-lg transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-2" type="submit">
              Initiate Session
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M5 13h11.17l-4.88 4.88c-.39.39-.39 1.03 0 1.42.39.39 1.02.39 1.41 0l6.59-6.59c.39-.39.39-1.02 0-1.41l-6.58-6.6a.996.996 0 10-1.41 1.41L16.17 11H5c-.55 0-1 .45-1 1s.45 1 1 1z"/></svg>
            </button>
          </form>

          <div className="mt-10">
            <div className="relative flex items-center mb-8">
              <div className="flex-grow border-t border-[#2e3543]"></div>
              <span className="flex-shrink mx-4 text-xs font-bold text-gnosis-muted uppercase">External Protocols</span>
              <div className="flex-grow border-t border-[#2e3543]"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 border border-[#2e3543] bg-[#232a38]/50 hover:bg-[#232a38] py-3 rounded-lg transition-all font-bold text-sm text-gnosis-text">
                Google
              </button>
              <button className="flex items-center justify-center gap-3 border border-[#2e3543] bg-[#232a38]/50 hover:bg-[#232a38] py-3 rounded-lg transition-all font-bold text-sm text-gnosis-text">
                GitHub
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}