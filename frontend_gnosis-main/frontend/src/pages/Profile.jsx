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
      if (!user) return; // Wait for user to be available
      
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
            const userProg = progRes.data.subjects?.find(
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
        <div className="flex justify-center items-center h-[80vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-[#8B2500] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[#8B2500] font-black animate-pulse uppercase tracking-widest">Gearing Up...</p>
          </div>
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className="p-4 md:p-8 max-w-5xl mx-auto pb-20">
        {/* Profile Header */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-[2.5rem] p-10 shadow-xl border-2 border-[#E8DFD1] mb-8 text-center relative overflow-hidden"
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFF4E5] rounded-full -mr-32 -mt-32 blur-3xl opacity-50" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F5EFE8] rounded-full -ml-32 -mb-32 blur-3xl opacity-50" />
          
          <div className="relative z-10">
            <div className="relative inline-block mb-6 group">
               <div className="w-32 h-32 bg-gradient-to-br from-[#D4641A] to-[#8B2500] text-white rounded-[2.5rem] mx-auto flex items-center justify-center text-5xl font-black shadow-2xl rotate-3 transform transition-transform group-hover:rotate-0">
                {profile.username?.substring(0, 2).toUpperCase()}
               </div>
               <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-2xl shadow-lg border border-[#E8DFD1]">
                  <Star className="w-6 h-6 text-[#D4641A] fill-[#D4641A]" />
               </div>
            </div>
            
            <h1 className="text-4xl font-black text-[#1a1a1a] mb-2 tracking-tight">
              {profile.username}
            </h1>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FAF7F2] rounded-full border border-[#E8DFD1]">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[#6b6b6b] text-sm font-bold uppercase tracking-wider">
                  {profile.email}
                </span>
            </div>

            {user?.id === profile.id && (
              <button
                onClick={logout}
                className="absolute top-0 right-0 p-3 text-[#8a8a8a] hover:text-[#FF5252] transition-colors"
                title="Logout"
              >
                <LogOut className="w-6 h-6" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={<Trophy className="w-6 h-6 text-[#D4641A]" />}
            title="Total XP"
            value={profile.total_xp || 0}
            color="bg-[#FFF4E5] border-[#F0C090]"
            delay={0.1}
          />
          <StatCard
            icon={<Flame className="w-6 h-6 text-[#FF5252]" />}
            title="Day Streak"
            value={profile.streak_count || 0}
            color="bg-[#FFF0F0] border-[#FFDADA]"
            delay={0.2}
          />
          <StatCard
            icon={<BookOpen className="w-6 h-6 text-[#2196F3]" />}
            title="Subjects"
            value={progress.length}
            color="bg-[#E3F2FD] border-[#BBDEFB]"
            delay={0.3}
          />
          <StatCard
            icon={<Star className="w-6 h-6 text-[#4CAF50]" />}
            title="Global Rank"
            value={globalRank ? `#${globalRank}` : "-"}
            color="bg-[#EAF6EA] border-[#D0E8D0]"
            delay={0.4}
          />
        </div>

        {/* Learning Progress Section */}
        <div className="bg-white rounded-[2.5rem] p-8 border-2 border-[#E8DFD1] shadow-lg">
          <h2 className="text-2xl font-black text-[#1a1a1a] mb-8 flex items-center gap-3">
             <BookOpen className="w-6 h-6 text-[#D4641A]" />
             Learning Progress
          </h2>
          <div className="grid gap-6">
            {progress.length === 0 ? (
              <div className="text-center py-12 bg-[#FAF7F2] rounded-3xl border-2 border-dashed border-[#E8DFD1]">
                <p className="text-[#8a8a8a] font-bold">No subjects started yet. Go to Home to begin!</p>
              </div>
            ) : (
              progress.map((sub, idx) => (
                <motion.div
                  key={sub.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="p-6 rounded-3xl border-2 border-[#F0EDE8] bg-[#FAF7F2] relative overflow-hidden group hover:border-[#F0C090] transition-all"
                >
                  <div className="flex justify-between items-center mb-4 relative z-10">
                    <span className="text-lg font-black text-[#1a1a1a]">{sub.name}</span>
                    <span className="bg-white px-3 py-1 rounded-full text-xs font-black text-[#D4641A] border border-[#E8DFD1]">
                      {sub.completedCount}/{sub.totalLevels} MODULES
                    </span>
                  </div>
                  <div className="w-full h-4 bg-[#E8DFD1] rounded-full overflow-hidden p-1 relative z-10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(sub.completedCount / sub.totalLevels) * 100}%` }}
                      transition={{ duration: 1, delay: 0.8 }}
                      className="h-full bg-gradient-to-r from-[#D4641A] to-[#8B2500] rounded-full shadow-sm"
                    />
                  </div>
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                     <Trophy className="w-12 h-12 rotate-12" />
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

function StatCard({ icon, title, value, color, delay }) {
  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay }}
      className={`${color} p-6 rounded-[2rem] border-2 shadow-sm flex flex-col items-center text-center hover:scale-105 transition-transform`}
    >
      <div className="mb-3 p-3 bg-white/80 rounded-2xl shadow-inner">
        {icon}
      </div>
      <p className="text-[10px] font-black text-[#6b6b6b] uppercase tracking-widest mb-1">{title}</p>
      <p className="text-2xl font-black text-[#1a1a1a]">{value}</p>
    </motion.div>
  );
}

