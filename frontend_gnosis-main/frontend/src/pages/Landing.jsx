import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Swords, Trophy, Brain, Flame, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export function Landing() {
  const features = [
    {
      title: "Gamified Learning Path",
      description: "Progress through subjects like a game map. Earn XP, maintain your streak, and unlock new worlds.",
      icon: <Brain className="w-8 h-8 text-gnosis-purple-light" />,
      color: "hover:border-gnosis-purple-light"
    },
    {
      title: "Real-time Multiplayer",
      description: "Challenge your friends to a 1v1 duel or host a group quiz to see who is the ultimate master.",
      icon: <Swords className="w-8 h-8 text-gnosis-red" />,
      color: "hover:border-gnosis-red"
    },
    {
      title: "Global Leaderboard",
      description: "Climb the ranks and show off your knowledge to the Gnosis community.",
      icon: <Trophy className="w-8 h-8 text-gnosis-gold" />,
      color: "hover:border-gnosis-gold"
    }
  ];

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center overflow-hidden relative">

      {/* Background glowing effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-96 bg-gnosis-purple/20 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="text-center py-20 relative z-10 w-full"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center space-x-2 bg-gnosis-card border border-gnosis-border px-4 py-2 rounded-full mb-8 shadow-lg"
        >
          <Sparkles className="w-4 h-4 text-gnosis-gold" />
          <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-gnosis-gold to-orange-400">Education meets Gaming</span>
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-tight">
          Master Subjects.<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gnosis-purple-light via-gnosis-purple to-gnosis-red">
            Defeat Friends.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gnosis-muted font-medium max-w-2xl mx-auto mb-10">
          Gnosis is a gamified learning platform where you conquer topics at your own pace and battle others in real-time.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/auth" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-gnosis-purple to-gnosis-purple-light hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] text-white rounded-2xl font-bold text-lg transition-all hover:-translate-y-1">
            Start Learning Free
          </Link>
          <Link to="/auth" className="w-full sm:w-auto px-8 py-4 bg-gnosis-card hover:bg-gnosis-bg border border-gnosis-border text-gnosis-text rounded-2xl font-bold text-lg transition-all hover:-translate-y-1">
            Log In
          </Link>
        </div>

        {/* Floating animated stats */}
        <div className="flex justify-center gap-8 mt-16 opacity-70">
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="flex items-center gap-2 font-black text-xl">
            <Flame className="text-orange-500 fill-orange-500/20 w-8 h-8"/> 15 Day Streak
          </motion.div>
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4, delay: 1 }} className="flex items-center gap-2 font-black text-xl">
            <Zap className="text-gnosis-purple-light fill-gnosis-purple-light/20 w-8 h-8"/> 5,000 XP
          </motion.div>
        </div>

      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full py-16 relative z-10">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            className={`bg-gnosis-card/80 backdrop-blur-sm border border-gnosis-border p-8 rounded-3xl flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${feature.color}`}
          >
            <div className="mb-6 p-4 bg-gnosis-bg rounded-2xl shadow-inner">
              {feature.icon}
            </div>
            <h3 className="text-2xl font-black mb-3">{feature.title}</h3>
            <p className="text-gnosis-muted font-medium leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
