import React, { useState } from 'react';

export function Leaderboard() {
  const [activeTab, setActiveTab] = useState('global');

  const mockData = [
    { rank: 4, name: "David Chen", points: 4100, isCurrentUser: false },
    { rank: 5, name: "Aisha Patel", points: 3950, isCurrentUser: false },
    { rank: 6, name: "Marcus Johnson", points: 3820, isCurrentUser: false },
    { rank: 7, name: "Sarah Williams", points: 3710, isCurrentUser: false },
    { rank: 8, name: "You", points: 3600, isCurrentUser: true },
    { rank: 9, name: "James Lee", points: 3450, isCurrentUser: false },
    { rank: 10, name: "Elena Rodriguez", points: 3200, isCurrentUser: false },
  ];

  return (
    <div className="max-w-container-max mx-auto px-4 md:px-10 py-12">

      {/* Header Section */}
      <div className="mb-12">
        <h1 className="text-4xl font-serif font-bold text-gnosis-text mb-4">Academic Vanguard</h1>
        <p className="text-gnosis-muted text-lg max-w-2xl">
          The hall of fame for the university's most consistent scholars. Precision, persistence, and pursuit of Gnosis.
        </p>
        <p className="text-gnosis-secondary text-sm font-bold tracking-widest uppercase mt-4">Weekly reset in 4 days 12 hours.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Left Podium Section */}
        <div className="lg:col-span-5 flex flex-col space-y-8 order-2 lg:order-1">
          {/* Tabs */}
          <div className="flex p-1 bg-[#232a38] rounded-lg w-fit">
            <button
              onClick={() => setActiveTab('global')}
              className={`px-8 py-2 font-bold text-sm rounded transition-colors ${activeTab === 'global' ? 'bg-[#f4a261] text-[#4e2600]' : 'text-gnosis-muted hover:text-gnosis-text'}`}
            >
              Global
            </button>
            <button
              onClick={() => setActiveTab('friends')}
              className={`px-8 py-2 font-bold text-sm rounded transition-colors ${activeTab === 'friends' ? 'bg-[#f4a261] text-[#4e2600]' : 'text-gnosis-muted hover:text-gnosis-text'}`}
            >
              Friends
            </button>
          </div>

          {/* Podium */}
          <div className="relative flex items-end justify-center gap-4 pt-20 h-80">
            {/* Rank 2 */}
            <div className="flex flex-col items-center flex-1">
              <div className="relative mb-4">
                <div className="w-20 h-20 rounded-full border-4 border-slate-400 bg-slate-800 flex items-center justify-center text-xl font-bold">A</div>
                <div className="absolute -top-3 -right-3 bg-slate-400 text-slate-900 px-2 py-1 rounded text-[10px] font-bold">#2</div>
              </div>
              <div className="bg-[#232a38] border-t border-slate-400/50 w-full pt-4 pb-8 flex flex-col items-center rounded-t-lg">
                <span className="font-bold text-gnosis-text text-sm">Arjun K.</span>
                <span className="text-gnosis-secondary text-xs font-bold mt-1">4,820 XP</span>
              </div>
            </div>

            {/* Rank 1 */}
            <div className="flex flex-col items-center flex-1 z-10 -translate-y-8">
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full border-4 border-[#d4b058] bg-slate-800 flex items-center justify-center text-2xl font-bold">P</div>
                <div className="absolute -top-3 -right-3 bg-[#d4b058] text-[#3e2e00] px-2 py-1 rounded text-[10px] font-bold">#1</div>
              </div>
              <div className="bg-[#232a38] border-t-2 border-[#d4b058] w-full pt-4 pb-12 flex flex-col items-center rounded-t-lg shadow-[0_0_20px_rgba(212,176,88,0.2)]">
                <span className="font-bold text-[#d4b058] text-sm">Priya M.</span>
                <span className="text-gnosis-secondary text-xs font-bold mt-1">5,100 XP</span>
              </div>
            </div>

            {/* Rank 3 */}
            <div className="flex flex-col items-center flex-1">
              <div className="relative mb-4">
                <div className="w-20 h-20 rounded-full border-4 border-amber-700 bg-slate-800 flex items-center justify-center text-xl font-bold">R</div>
                <div className="absolute -top-3 -right-3 bg-amber-700 text-amber-100 px-2 py-1 rounded text-[10px] font-bold">#3</div>
              </div>
              <div className="bg-[#232a38] border-t border-amber-700/50 w-full pt-4 pb-8 flex flex-col items-center rounded-t-lg">
                <span className="font-bold text-gnosis-text text-sm">Rahul T.</span>
                <span className="text-gnosis-secondary text-xs font-bold mt-1">4,250 XP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right List Section */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <div className="bg-[#19202d] border border-[#2e3543] rounded-lg p-6">
            <h2 className="text-xl font-serif font-bold mb-6 text-[#f4a261]">Rankings</h2>

            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {mockData.map((user) => (
                <div key={user.rank} className={`flex items-center justify-between p-4 rounded border transition-colors ${user.isCurrentUser ? 'bg-[#f4a261]/10 border-[#f4a261]' : 'bg-[#0c1320] border-[#2e3543] hover:border-gnosis-secondary/50'}`}>
                  <div className="flex items-center gap-4">
                    <span className={`w-8 text-center font-bold text-sm ${user.isCurrentUser ? 'text-[#f4a261]' : 'text-gnosis-muted'}`}>#{user.rank}</span>
                    <div className="w-10 h-10 rounded-full bg-[#232a38] border border-[#2e3543] flex items-center justify-center font-bold text-sm">
                      {user.name.charAt(0)}
                    </div>
                    <span className={`font-bold text-sm ${user.isCurrentUser ? 'text-[#f4a261]' : 'text-gnosis-text'}`}>{user.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-gnosis-text font-bold text-sm block">{user.points.toLocaleString()}</span>
                    <span className="text-[10px] text-gnosis-muted uppercase tracking-widest font-bold">XP</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}