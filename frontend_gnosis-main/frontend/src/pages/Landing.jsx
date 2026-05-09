import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Swords, Trophy, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

export function Landing() {
  const features = [
    {
      title: "Gamified Learning",
      description: "Progress through levels, earn XP, and unlock new subjects like a game map.",
      icon: <Brain className="w-8 h-8 text-gnosis-green" />
    },
    {
      title: "Multiplayer Battles",
      description: "Challenge friends 1v1 or join group quizzes to test your knowledge in real-time.",
      icon: <Swords className="w-8 h-8 text-gnosis-red" />
    },
    {
      title: "Climb the Leaderboard",
      description: "Earn ranks and show off your achievements to the global Gnosis community.",
      icon: <Trophy className="w-8 h-8 text-gnosis-gold" />
    }
  ];

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center">

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-20"
      >
        <div className="inline-flex items-center space-x-2 bg-gnosis-card border border-gnosis-border px-4 py-2 rounded-full mb-8">
          <Sparkles className="w-4 h-4 text-gnosis-gold" />
          <span className="text-sm font-medium text-gnosis-muted">Learning meets Gaming</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          Master Subjects.<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gnosis-purple-light to-gnosis-purple">
            Defeat Friends.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gnosis-muted max-w-2xl mx-auto mb-10">
          Gnosis is a gamified learning platform where education becomes an adventure. Learn at your own pace, or battle others in real-time quizzes.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/auth" className="w-full sm:w-auto px-8 py-4 bg-gnosis-purple hover:bg-gnosis-purple/90 text-white rounded-full font-bold text-lg transition-colors">
            Start Learning Free
          </Link>
          <Link to="/auth" className="w-full sm:w-auto px-8 py-4 bg-gnosis-card hover:bg-gnosis-border border border-gnosis-border text-gnosis-text rounded-full font-bold text-lg transition-colors">
            Log In
          </Link>
        </div>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full py-16">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gnosis-card border border-gnosis-border p-8 rounded-2xl flex flex-col items-center text-center hover:border-gnosis-purple transition-colors"
          >
            <div className="mb-6 p-4 bg-gnosis-bg rounded-full">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-gnosis-muted leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
