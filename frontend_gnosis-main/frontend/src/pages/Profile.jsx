import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../lib/api";
import { useAuthStore } from "../lib/store";
import { Trophy, Flame, BookOpen, Star, LogOut } from "lucide-react";
import { motion } from "framer-motion";

export default function Profile() {
  const { id } = useParams();
  const { user, logout } = useAuthStore();
  const [profile, setProfile] = useState(null);
  const [progress, setProgress] = useState([]);
  const [globalRank, setGlobalRank] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // If viewing own profile, user data is from store, else fetch
        let profData = user;
        if (id && id !== user?.id) {
          // Future: fetch other user's profile
          // const res = await api.get(`/users/${id}`);
          // profData = res.data;
        }

        const [progRes, contentRes, rankRes] = await Promise.all([
          api.get(`/progress/${profData.id}`),
          api.get("/content/subjects"),
          api.get(`/xp/leaderboard/global?currentUserId=${profData.id}`),
        ]);

        const merged = contentRes.data
          .map((cs) => {
            const userProg = progRes.data.subjects.find(
              (s) => s.subject_id === cs.id,
            );
            const completedCount = userProg
              ? userProg.levels.filter((l) => l.status === "complete").length
              : 0;
            return {
              ...cs,
              completedCount,
              totalLevels: 4,
            };
          })
          .filter((s) => s.completedCount > 0);

        setProfile(profData);
        setProgress(merged);
        setGlobalRank(rankRes.data.currentUserRank || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id, user]);

  if (loading || !profile)
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className="p-4 md:p-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl p-8 shadow-soft border border-surface-variant mb-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 pointer-events-none jaali-bg mix-blend-multiply" />

          <div className="w-24 h-24 bg-primary text-white rounded-full mx-auto flex items-center justify-center text-4xl font-bold mb-4 shadow-lg relative z-10">
            {profile.username.substring(0, 2).toUpperCase()}
          </div>
          <h1 className="text-3xl font-bold text-inverse-surface mb-2 relative z-10">
            {profile.username}
          </h1>
          <p className="text-on-surface-variant font-medium relative z-10">
            {profile.email}
          </p>

          {user?.id === profile.id && (
            <button
              onClick={logout}
              className="absolute top-6 right-6 text-on-surface-variant hover:text-error transition-colors flex items-center gap-2 font-bold z-10 bg-surface px-4 py-2 rounded-xl"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={<Trophy className="text-secondary" />}
            title="Total XP"
            value={profile.total_xp || 0}
          />
          <StatCard
            icon={<Flame className="text-primary" />}
            title="Day Streak"
            value={profile.streak_count || 0}
          />
          <StatCard
            icon={<BookOpen className="text-tertiary" />}
            title="Subjects"
            value={progress.length}
          />
          <StatCard
            icon={<Star className="text-secondary-container-on" />}
            title="Global Rank"
            value={globalRank ? `#${globalRank}` : "-"}
          />
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-soft border border-surface-variant">
          <h2 className="text-2xl font-bold text-inverse-surface mb-6">
            Learning Progress
          </h2>
          <div className="space-y-6">
            {progress.length === 0 ? (
              <p className="text-on-surface-variant">
                No subjects started yet. Go to the Home path to begin!
              </p>
            ) : (
              progress.map((sub, idx) => (
                <motion.div
                  key={sub.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="flex justify-between font-bold mb-2">
                    <span className="text-inverse-surface">{sub.name}</span>
                    <span className="text-primary">
                      {sub.completedCount}/{sub.totalLevels}
                    </span>
                  </div>
                  <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-secondary-container to-primary transition-all duration-1000"
                      style={{
                        width: `${(sub.completedCount / sub.totalLevels) * 100}%`,
                      }}
                    />
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-surface-variant flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center mb-3">
        {icon}
      </div>
      <div className="text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-1">
        {title}
      </div>
      <div className="text-2xl font-bold text-inverse-surface">{value}</div>
    </div>
  );
}
