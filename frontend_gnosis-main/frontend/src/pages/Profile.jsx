import React from 'react';

export function Profile() {
  return (
    <div className="max-w-container-max mx-auto px-4 md:px-10 py-12">

      {/* Profile Header Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-10 mb-20">
        <div className="relative">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-[#f4a261]/30 p-1">
            <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-4xl font-bold text-slate-400">AM</div>
          </div>
          <div className="absolute bottom-2 right-2 bg-[#f4a261] text-[#4e2600] w-8 h-8 rounded-full flex items-center justify-center border-4 border-[#0c1320]">
             <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
          </div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-serif font-bold text-gnosis-text mb-2">Arjun Mehta</h1>
          <p className="text-gnosis-muted mb-4">M.Tech Computer Science • Final Year</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            <span className="bg-[#232a38] text-gnosis-muted px-3 py-1 rounded text-xs border border-[#2e3543]">Joined Jan 2023</span>
            <span className="bg-[#30a193]/20 text-[#30a193] px-3 py-1 rounded text-xs border border-[#30a193]/20">Active Researcher</span>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-[#f4a261] text-[#4e2600] font-bold text-sm rounded-lg hover:brightness-110 transition-all">Edit Profile</button>
          <button className="px-6 py-3 border border-[#534439] text-gnosis-text font-bold text-sm rounded-lg hover:bg-slate-800 transition-all">Share Profile</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
        <div className="bg-[#151c29] border border-[#2e3543] p-6 rounded-xl flex flex-col justify-between hover:border-[#f4a261]/50 transition-all">
          <div className="flex justify-between items-start mb-4">
            <svg className="w-6 h-6 text-[#f4a261] fill-current" viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>
            <span className="text-xs font-bold text-gnosis-muted uppercase tracking-wider">Total XP</span>
          </div>
          <div className="text-2xl font-serif font-bold text-[#f4a261]">12,450</div>
        </div>
        <div className="bg-[#151c29] border border-[#2e3543] p-6 rounded-xl flex flex-col justify-between hover:border-[#f4a261]/50 transition-all">
          <div className="flex justify-between items-start mb-4">
            <svg className="w-6 h-6 text-[#f4a261] fill-current" viewBox="0 0 24 24"><path d="M16.01 7L16 3h-2v4h-4V3H8v4h-.01C7 6.99 6 7.99 6 8.99v5.49L9.5 18v3h5v-3l3.5-3.51v-5.5c0-1-1-2-1.99-2z"/></svg>
            <span className="text-xs font-bold text-gnosis-muted uppercase tracking-wider">Daily Streak</span>
          </div>
          <div className="text-2xl font-serif font-bold text-[#f4a261]">42 Days</div>
        </div>
        <div className="bg-[#151c29] border border-[#2e3543] p-6 rounded-xl flex flex-col justify-between hover:border-[#f4a261]/50 transition-all">
          <div className="flex justify-between items-start mb-4">
            <svg className="w-6 h-6 text-[#f4a261] fill-current" viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/></svg>
            <span className="text-xs font-bold text-gnosis-muted uppercase tracking-wider">Subjects</span>
          </div>
          <div className="text-2xl font-serif font-bold text-[#f4a261]">18 / 24</div>
        </div>
        <div className="bg-[#151c29] border border-[#2e3543] p-6 rounded-xl flex flex-col justify-between hover:border-[#f4a261]/50 transition-all">
          <div className="flex justify-between items-start mb-4">
            <svg className="w-6 h-6 text-[#f4a261] fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
            <span className="text-xs font-bold text-gnosis-muted uppercase tracking-wider">Global Rank</span>
          </div>
          <div className="text-2xl font-serif font-bold text-[#f4a261]">#142</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Progress Section */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-serif font-bold text-gnosis-text">Academic Progress</h2>
          </div>
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="font-bold text-gnosis-text">System Design</h3>
                  <p className="text-xs text-gnosis-muted uppercase tracking-widest mt-1">Final Module: Distributed Caching</p>
                </div>
                <span className="font-bold text-[#f4a261]">85%</span>
              </div>
              <div className="h-1 w-full bg-[#2e3543] rounded-full overflow-hidden">
                <div className="h-full bg-[#f4a261]" style={{width: '85%'}}></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="font-bold text-gnosis-text">Advanced Data Structures</h3>
                  <p className="text-xs text-gnosis-muted uppercase tracking-widest mt-1">Review Phase: B-Trees</p>
                </div>
                <span className="font-bold text-[#f4a261]">62%</span>
              </div>
              <div className="h-1 w-full bg-[#2e3543] rounded-full overflow-hidden">
                <div className="h-full bg-[#f4a261]" style={{width: '62%'}}></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="font-bold text-gnosis-text">Operating Systems</h3>
                  <p className="text-xs text-gnosis-muted uppercase tracking-widest mt-1">In Progress: Concurrency</p>
                </div>
                <span className="font-bold text-[#f4a261]">40%</span>
              </div>
              <div className="h-1 w-full bg-[#2e3543] rounded-full overflow-hidden">
                <div className="h-full bg-[#f4a261]" style={{width: '40%'}}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Friends & Social Section */}
        <div className="lg:col-span-1">
          <div className="bg-[#19202d] border border-[#2e3543] p-8 rounded-2xl relative overflow-hidden">
            <h2 className="text-2xl font-serif font-bold text-gnosis-text mb-6">Peers</h2>
            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded bg-[#2e3543] flex items-center justify-center font-bold text-gnosis-muted">RV</div>
                <div className="flex-1">
                  <h4 className="font-bold text-gnosis-text text-sm">Rahul Varma</h4>
                  <p className="text-xs text-[#30a193] uppercase tracking-widest mt-1">In Battle Now</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded bg-[#2e3543] flex items-center justify-center font-bold text-gnosis-muted">SN</div>
                <div className="flex-1">
                  <h4 className="font-bold text-gnosis-text text-sm">Sana Nair</h4>
                  <p className="text-xs text-gnosis-muted uppercase tracking-widest mt-1">Away for 2h</p>
                </div>
              </div>
            </div>
            <div className="pt-6 border-t border-[#2e3543]">
              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-sm text-gnosis-muted">142 Friends</span>
                <button className="text-sm font-bold text-[#f4a261] hover:underline">View All</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}