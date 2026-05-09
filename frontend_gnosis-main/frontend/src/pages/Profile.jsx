import React from 'react';
import { Settings, Zap, Flame, Trophy, BookOpen, Medal } from 'lucide-react';
import { motion } from 'framer-motion';

export function Profile() {
  const stats = [
    { label: "Total XP", value: "12,450", icon: <Zap className="text-gnosis-purple-light" /> },
    { label: "Current Streak", value: "15", icon: <Flame className="text-orange-500 fill-orange-500/20" /> },
    { label: "Subjects Complete", value: "3", icon: <BookOpen className="text-gnosis-green" /> },
    { label: "Global Rank", value: "#142", icon: <Trophy className="text-gnosis-gold" /> },
  ];

  const achievements = [
    { name: "First Blood", desc: "Win your first battle", unlocked: true },
    { name: "Scholar", desc: "Complete 10 lessons", unlocked: true },
    { name: "Unstoppable", desc: "Win 5 battles in a row", unlocked: false },
  ];

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto pb-24 md:pb-8">

      {/* Header Profile Card */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gnosis-card border border-gnosis-border rounded-3xl p-8 mb-8 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-gnosis-purple via-gnosis-purple-light to-gnosis-gold"></div>

        <button className="absolute top-8 right-8 text-gnosis-muted hover:text-gnosis-text transition-transform hover:rotate-90">
          <Settings className="w-6 h-6" />
        </button>

        <div className="flex flex-col sm:flex-row items-center gap-8 mt-4">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gnosis-purple to-gnosis-purple-light flex items-center justify-center text-5xl font-black text-white border-4 border-gnosis-bg shadow-xl">
              U
            </div>
            <div className="absolute -bottom-2 -right-2 bg-gnosis-bg border-2 border-gnosis-border rounded-full p-2">
              <Trophy className="w-6 h-6 text-gnosis-gold" />
            </div>
          </div>

          <div className="text-center sm:text-left flex-1">
            <h1 className="text-4xl font-black mb-2 tracking-tight">Player One</h1>
            <p className="text-gnosis-muted font-medium mb-4 flex items-center justify-center sm:justify-start gap-2">
               Gnosis Member
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="mb-10">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          Your Stats
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-gnosis-card border border-gnosis-border rounded-2xl p-6 flex flex-col items-center text-center hover:border-gnosis-purple transition-colors"
            >
              <div className="mb-3 p-3 bg-gnosis-bg rounded-2xl shadow-inner">
                {stat.icon}
              </div>
              <div className="text-2xl font-black mb-1">{stat.value}</div>
              <div className="text-xs font-bold text-gnosis-muted uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h2 className="text-xl font-bold mb-4">Achievements</h2>
        <div className="space-y-4">
          {achievements.map((ach, idx) => (
            <motion.div
              key={idx}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 + (idx * 0.1) }}
              className={`flex items-center p-5 rounded-2xl border transition-all ${ach.unlocked ? 'bg-gnosis-card border-gnosis-border hover:shadow-lg' : 'bg-gnosis-bg border-gnosis-border/50 opacity-60'}`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mr-5 ${ach.unlocked ? 'bg-gnosis-gold/20 text-gnosis-gold' : 'bg-gnosis-card text-gnosis-muted'}`}>
                <Medal className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{ach.name}</h3>
                <p className="text-sm font-medium text-gnosis-muted">{ach.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}
