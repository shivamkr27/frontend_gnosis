import React, { useState } from 'react';
import { Trophy, Medal, Search } from 'lucide-react';

export function Leaderboard() {
  const [activeTab, setActiveTab] = useState('global');

  const mockData = [
    { rank: 1, name: "AlgoMaster", points: 15420, isCurrentUser: false },
    { rank: 2, name: "CodeNinja", points: 14200, isCurrentUser: false },
    { rank: 3, name: "BugSquasher", points: 13950, isCurrentUser: false },
    { rank: 4, name: "ReactGod", points: 12100, isCurrentUser: false },
    { rank: 5, name: "You (Player One)", points: 11800, isCurrentUser: true },
    { rank: 6, name: "DevDude", points: 11200, isCurrentUser: false },
  ];

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto pb-24 md:pb-8">

      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold mb-4 flex items-center justify-center gap-3">
          <Trophy className="text-gnosis-gold w-10 h-10" /> Hall of Fame
        </h1>
        <p className="text-gnosis-muted">See how you stack up against the Gnosis community.</p>
      </div>

      {/* Tabs */}
      <div className="flex bg-gnosis-card p-1 rounded-xl mb-8">
        <button
          onClick={() => setActiveTab('global')}
          className={`flex-1 py-3 text-sm font-bold rounded-lg transition-colors ${activeTab === 'global' ? 'bg-gnosis-purple text-white' : 'text-gnosis-muted hover:text-gnosis-text'}`}
        >
          Global
        </button>
        <button
          onClick={() => setActiveTab('friends')}
          className={`flex-1 py-3 text-sm font-bold rounded-lg transition-colors ${activeTab === 'friends' ? 'bg-gnosis-purple text-white' : 'text-gnosis-muted hover:text-gnosis-text'}`}
        >
          Friends
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gnosis-muted" />
        <input
          type="text"
          placeholder="Search players..."
          className="w-full bg-gnosis-card border border-gnosis-border rounded-xl py-4 pl-12 pr-4 text-gnosis-text focus:outline-none focus:border-gnosis-purple transition-colors"
        />
      </div>

      {/* List */}
      <div className="space-y-3">
        {mockData.map((user) => (
          <div
            key={user.rank}
            className={`flex items-center p-4 rounded-xl border transition-colors
              ${user.isCurrentUser ? 'bg-gnosis-purple/10 border-gnosis-purple' : 'bg-gnosis-card border-gnosis-border'}
            `}
          >
            {/* Rank */}
            <div className="w-12 flex justify-center">
              {user.rank === 1 ? <Medal className="w-8 h-8 text-gnosis-gold" /> :
               user.rank === 2 ? <Medal className="w-8 h-8 text-slate-300" /> :
               user.rank === 3 ? <Medal className="w-8 h-8 text-amber-600" /> :
               <span className="text-xl font-bold text-gnosis-muted">#{user.rank}</span>}
            </div>

            {/* Avatar & Name */}
            <div className="flex items-center gap-4 flex-1 ml-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
                ${user.isCurrentUser ? 'bg-gnosis-purple text-white' : 'bg-gnosis-bg text-gnosis-muted'}
              `}>
                {user.name.charAt(0)}
              </div>
              <span className={`font-bold ${user.isCurrentUser ? 'text-gnosis-purple-light' : 'text-gnosis-text'}`}>
                {user.name}
              </span>
            </div>

            {/* Points */}
            <div className="text-right">
              <div className="font-bold">{user.points.toLocaleString()}</div>
              <div className="text-xs text-gnosis-muted uppercase tracking-wider">PTS</div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
