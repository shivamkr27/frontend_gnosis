import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../lib/api";
import { useAuthStore } from "../lib/store";
import { motion } from "framer-motion";
import { ArrowLeft, Play, Lock, CheckCircle2, Flame } from "lucide-react";

export default function SubjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const [contentRes, progRes] = await Promise.all([
          api.get(`/content/subjects/${id}`),
          api.get(`/progress/${user.id}/subject/${id}`),
        ]);

        // Merge content levels with progress status
        const mergedLevels = contentRes.data.levels.map((l) => {
          const p = progRes.data.levels.find((pl) => pl.level_id === l.id);
          return {
            ...l,
            status: p ? p.status : "locked",
            xp_earned: p ? p.xp_earned : 0,
          };
        });

        setSubject({
          ...contentRes.data,
          levels: mergedLevels,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id, user.id]);

  if (loading || !subject)
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </Layout>
    );

  const completedCount = subject.levels.filter(
    (l) => l.status === "complete",
  ).length;
  const progressPercent = (completedCount / subject.levels.length) * 100;

  return (
    <Layout>
      <div className="p-4 md:p-8 max-w-4xl mx-auto">
        {/* Header */}
        <button
          onClick={() => navigate("/home")}
          className="flex items-center gap-2 text-on-surface-variant hover:text-inverse-surface transition-colors font-bold mb-8"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Journey
        </button>

        <div className="bg-white rounded-3xl p-8 shadow-soft border border-surface-variant relative overflow-hidden mb-8">
          {/* Decorative Jaali Background for header card */}
          <div className="absolute inset-0 opacity-5 pointer-events-none jaali-bg mix-blend-multiply" />

          <div className="relative z-10 flex flex-col md:flex-row gap-8 justify-between">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-inverse-surface mb-4">
                {subject.name}
              </h1>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-6">
                {subject.description}
              </p>

              <div className="flex items-center gap-4">
                <div className="flex-1 max-w-xs h-3 bg-surface-container rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    className="h-full bg-gradient-to-r from-secondary-container to-primary"
                  />
                </div>
                <span className="font-bold text-inverse-surface">
                  {completedCount}/{subject.levels.length} Complete
                </span>
              </div>
            </div>

            <div className="hidden md:flex flex-col items-center justify-center p-6 bg-surface rounded-2xl border border-surface-variant w-48">
              <Flame className="w-10 h-10 text-primary mb-2" />
              <span className="text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                Subject Streak
              </span>
              <span className="text-2xl font-bold text-inverse-surface">
                Active
              </span>
            </div>
          </div>
        </div>

        {/* Levels Grid */}
        <div className="grid gap-4">
          {subject.levels.map((level, idx) => {
            const isLocked = level.status === "locked";
            const isComplete = level.status === "complete";

            return (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => !isLocked && navigate(`/lesson/${level.id}`)}
                className={`bg-white rounded-2xl p-6 border ${isLocked ? "border-surface-variant opacity-75" : "border-surface-variant hover:border-primary cursor-pointer card-hover"} flex items-center justify-between gap-4`}
              >
                <div className="flex items-center gap-6 flex-1">
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isComplete
                        ? "bg-secondary text-white"
                        : isLocked
                          ? "bg-surface-variant text-on-surface-variant"
                          : "bg-primary-fixed text-primary border-2 border-primary"
                    }`}
                  >
                    {isComplete ? (
                      <CheckCircle2 className="w-7 h-7" />
                    ) : isLocked ? (
                      <Lock className="w-6 h-6 opacity-50" />
                    ) : (
                      <span className="font-bold text-xl">
                        {level.level_number}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3
                      className={`text-xl font-bold mb-1 ${isLocked ? "text-on-surface-variant" : "text-inverse-surface"}`}
                    >
                      {level.topic}
                    </h3>
                    <div className="flex gap-4 text-sm font-bold text-on-surface-variant">
                      <span className="text-primary">
                        {level.xp_reward} XP Reward
                      </span>
                      <span>•</span>
                      <span>Level {level.level_number}</span>
                    </div>
                  </div>
                </div>

                {!isLocked && !isComplete && (
                  <button className="hidden md:flex bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-container transition-colors items-center gap-2">
                    <Play className="w-5 h-5 fill-current" /> Start Mission
                  </button>
                )}
                {!isLocked && !isComplete && (
                  <button className="md:hidden w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center">
                    <Play className="w-5 h-5 fill-current" />
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
