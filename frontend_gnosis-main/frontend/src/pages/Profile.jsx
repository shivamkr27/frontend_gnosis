import React from 'react';
import { Settings, Zap, Coins, Medal, BookOpen, Swords } from 'lucide-react';

export function Profile() {
  const stats = [
    { label: "Total XP", value: "12,450", icon: <Zap className="text-gnosis-purple-light" /> },
    { label: "Coins", value: "1,250", icon: <Coins className="text-gnosis-gold" /> },
    { label: "Subjects Completed", value: "3", icon: <BookOpen className="text-gnosis-green" /> },
    { label: "Battles Won", value: "42", icon: <Swords className="text-gnosis-red" /> },
  ];

  const achievements = [
    { name: "First Blood", desc: "Win your first battle", unlocked: true },
    { name: "Scholar", desc: "Complete 10 lessons", unlocked: true },
    { name: "Unstoppable", desc: "Win 5 battles in a row", unlocked: false },
  ];

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto pb-24 md:pb-8">

      {/* Header Profile Card */}
      <div className="bg-gnosis-card border border-gnosis-border rounded-3xl p-8 mb-8 relative">
        <button className="absolute top-6 right-6 text-gnosis-muted hover:text-gnosis-text">
          <Settings className="w-6 h-6" />
        </button>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-32 h-32 rounded-full bg-gnosis-purple flex items-center justify-center text-5xl font-bold text-white border-4 border-gnosis-bg shadow-xl">
            U
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold mb-1">Player One</h1>
            <p className="text-gnosis-purple-light font-medium mb-4">Level 15 Master</p>
            <div className="w-full sm:w-64 bg-gnosis-bg rounded-full h-2 mb-2">
              <div className="bg-gnosis-purple h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <p className="text-xs text-gnosis-muted">250 XP to Level 16</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <h2 className="text-xl font-bold mb-4">Statistics</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-gnosis-card border border-gnosis-border rounded-2xl p-6 flex flex-col items-center text-center">
            <div className="mb-3 p-3 bg-gnosis-bg rounded-full">
              {stat.icon}
            </div>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-xs text-gnosis-muted uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <h2 className="text-xl font-bold mb-4">Achievements</h2>
      <div className="space-y-4">
        {achievements.map((ach, idx) => (
          <div key={idx} className={`flex items-center p-5 rounded-2xl border ${ach.unlocked ? 'bg-gnosis-card border-gnosis-border' : 'bg-gnosis-bg border-gnosis-border/50 opacity-50'}`}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${ach.unlocked ? 'bg-gnosis-gold/20 text-gnosis-gold' : 'bg-gnosis-card text-gnosis-muted'}`}>
              <Medal className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">{ach.name}</h3>
              <p className="text-sm text-gnosis-muted">{ach.desc}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
