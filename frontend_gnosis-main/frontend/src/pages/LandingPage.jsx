import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuthStore } from "../lib/store";
import { motion } from "framer-motion";
import { BookOpen, Trophy, Zap, Users } from "lucide-react";

export default function LandingPage() {
  const { token } = useAuthStore();

  if (token) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-soft">
            G
          </div>
          <span className="text-2xl font-bold text-inverse-surface tracking-tight">
            Gnosis
          </span>
        </div>
        <div className="flex gap-4">
          <Link
            to="/auth"
            className="px-6 py-2.5 rounded-full font-semibold text-inverse-surface hover:bg-surface-variant transition-colors"
          >
            Login
          </Link>
          <Link
            to="/auth"
            className="px-6 py-2.5 rounded-full font-semibold bg-primary text-white hover:bg-primary-container transition-colors shadow-soft hover:shadow-md"
          >
            Start Learning
          </Link>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-12 pb-24 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-4 py-1.5 rounded-full bg-secondary-container/30 text-secondary-container-on font-semibold mb-6 border border-secondary-container/50"
        >
          🎓 New Curriculum Available
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold text-inverse-surface mb-8 leading-tight tracking-tight"
        >
          Master Tech.
          <br />
          <span className="text-primary">One Level at a Time.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-on-surface-variant max-w-2xl mb-12"
        >
          Join the ultimate gamified learning platform for B.Tech students.
          Climb the ranks, challenge friends, and conquer 25 core subjects.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mb-24"
        >
          <Link
            to="/auth"
            className="px-8 py-4 rounded-full font-bold text-lg bg-primary text-white hover:bg-primary-container transition-all hover:-translate-y-1 shadow-soft hover:shadow-lg"
          >
            Start Your Journey
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 w-full">
          {[
            {
              icon: <Trophy className="w-8 h-8 text-secondary" />,
              title: "Earn XP & Rank Up",
              desc: "Gain experience points by completing levels and climb the global leaderboard.",
            },
            {
              icon: <Zap className="w-8 h-8 text-primary" />,
              title: "Maintain Streaks",
              desc: "Build daily learning habits with our streak system and earn bonus rewards.",
            },
            {
              icon: <Users className="w-8 h-8 text-tertiary" />,
              title: "Live Battles",
              desc: "Challenge friends in 1v1 duels or host group quizzes to test your knowledge.",
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-soft border border-surface-variant flex flex-col items-center text-center card-hover"
            >
              <div className="w-16 h-16 rounded-2xl bg-surface flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-inverse-surface mb-3">
                {feature.title}
              </h3>
              <p className="text-on-surface-variant leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
