import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../lib/api";
import { useAuthStore } from "../lib/store";
import { ArrowRight, Award, Flame, ListChecks, Trophy, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function LessonComplete() {
  const { levelId } = useParams();
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();
  const [streak, setStreak] = useState(null);
  const [status, setStatus] = useState("Saving progress...");
  const savedRef = useRef(false);

  const totalXp = Number(state?.totalXp || 0);
  const correctCount = Number(state?.correctCount || 0);
  const totalQuestions = Number(state?.totalQuestions || 10);
  const hasAnswers = Array.isArray(state?.answers) && state.answers.length > 0;

  useEffect(() => {
    if (state?.saved) {
      setStatus("Progress saved");
      return;
    }

    if (!user || !levelId || savedRef.current) return;
    savedRef.current = true;

    const saveCompletion = async () => {
      try {
        const levelRes = await api.get(`/content/levels/${levelId}`);
        const subjectId = levelRes.data.subject_id;

        await api.post("/xp/award", {
          userId: user.id,
          username: user.username,
          amount: totalXp,
          source: "lesson",
          scope: "global",
        });

        await api.post("/progress/complete-level", {
          userId: user.id,
          levelId,
          subjectId,
          xpEarned: totalXp,
        });

        const [streakRes, meRes] = await Promise.all([
          api.get(`/progress/${user.id}/streak`),
          api.get("/auth/me"),
        ]);
        setStreak(streakRes.data);
        setUser(meRes.data);
        setStatus("Progress saved");
        navigate(`/lesson/${levelId}/complete`, {
          replace: true,
          state: { ...state, saved: true },
        });
      } catch (err) {
        setStatus(err.response?.data?.error || "Could not save progress");
      }
    };

    saveCompletion();
  }, [levelId, navigate, setUser, state, totalXp, user]);

  return (
    <Layout>
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl"
        >
          {/* Victory Section */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-8"
            >
              <div className="inline-block relative mb-8">
                <img
                  src="https://api.dicebear.com/7.x/bottts/svg?seed=victory"
                  alt="Victory"
                  className="w-48 h-48 rounded-2xl shadow-lg border-4 border-[#FFF4E5]"
                />
                <div className="absolute -top-4 -right-4 bg-[#D4641A] text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg rotate-12">
                  EXCELLENT!
                </div>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-6xl font-extrabold text-[#8B2500] mb-4"
            >
              Victory!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-[#6b6b6b] mb-12"
            >
              You've unlocked the mysteries of the {user?.username || "Ancient"} module.
            </motion.p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Left Column: XP Breakdown */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="lg:col-span-1 bg-white rounded-3xl p-8 shadow-sm border border-[#E8DFD1]"
            >
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6 flex items-center gap-2">
                <Zap className="w-6 h-6 text-[#D4641A]" />
                XP Breakdown
              </h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center pb-4 border-b border-[#E8DFD1]">
                  <span className="text-[#6b6b6b] font-medium">Base Experience</span>
                  <span className="text-2xl font-bold text-[#8B2500]">+30 XP</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-[#E8DFD1]">
                  <span className="text-[#6b6b6b] font-medium">Speed Bonus</span>
                  <span className="text-2xl font-bold text-[#D4641A]">+10 XP</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-[#E8DFD1]">
                  <span className="text-[#6b6b6b] font-medium">Streak Bonus</span>
                  <span className="text-2xl font-bold text-[#D4641A]">+10 XP</span>
                </div>
              </div>
              <div className="bg-[#FAF7F2] rounded-xl p-4 text-center">
                <p className="text-[#6b6b6b] text-sm font-medium mb-2">Total Earned</p>
                <p className="text-4xl font-extrabold text-[#8B2500]">{totalXp} XP</p>
              </div>
            </motion.div>

            {/* Right Column: Streak & Level Info */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Streak Card */}
              <div className="bg-[#FFF4E5] rounded-3xl p-8 border-2 border-[#D4641A] shadow-sm">
                <h3 className="text-2xl font-bold text-[#8B2500] mb-4 flex items-center gap-2">
                  <Flame className="w-7 h-7" />
                  {streak?.streakCount ?? user?.streak_count ?? 0} Day Streak!
                </h3>
                <p className="text-[#6b6b6b] font-medium mb-6">
                  You're on fire! Keep the flame alive tomorrow.
                </p>
                <div className="flex justify-between items-center gap-3">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                    <div
                      key={i}
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                        i < Math.min(streak?.streakCount ?? user?.streak_count ?? 0, 7)
                          ? "bg-[#8B2500] text-white"
                          : i === (streak?.streakCount ?? user?.streak_count ?? 0)
                            ? "bg-white text-[#8B2500] border-2 border-[#8B2500]"
                            : "bg-white text-[#8a8a8a] border border-[#E8DFD1]"
                      }`}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>

              {/* Level Progress Card */}
              <div className="bg-white rounded-3xl p-8 border border-[#E8DFD1] shadow-sm">
                <h3 className="text-lg font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-[#D4641A]" />
                  Current Level
                </h3>
                <div className="text-center">
                  <p className="text-[#D4641A] font-bold text-sm mb-2">Level 12 Sage</p>
                  <div className="w-full bg-[#FAF7F2] rounded-full h-3 mb-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#D4641A] to-[#8B2500]"
                      style={{ width: '80%' }}
                    />
                  </div>
                  <p className="text-[#6b6b6b] text-sm">450 XP to Level 13</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <button
              onClick={() => navigate("/home")}
              className="bg-[#8B2500] text-white font-bold py-4 px-8 rounded-2xl hover:bg-[#6B1F00] transition-all hover:shadow-lg flex items-center justify-center gap-2"
            >
              Continue Path
              <ArrowRight className="w-5 h-5" />
            </button>

            {hasAnswers && (
              <button
                onClick={() => navigate(`/lesson/${levelId}/review`, { state })}
                className="bg-white text-[#8B2500] font-bold py-4 px-8 rounded-2xl border-2 border-[#8B2500] hover:bg-[#FAF7F2] transition-all flex items-center justify-center gap-2"
              >
                <ListChecks className="w-5 h-5" />
                Review Answers
              </button>
            )}
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
}
