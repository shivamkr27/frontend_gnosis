import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../lib/api";
import { useAuthStore } from "../lib/store";
import { motion } from "framer-motion";
import { Trophy, Bell, Lock, Check, BookOpen, ChevronRight, Zap } from "lucide-react";

export default function Home() {
  const { user } = useAuthStore();
  const [subjects, setSubjects] = useState([]);
  const [totalXp, setTotalXp] = useState(user?.total_xp || 0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        const [progRes, contentRes, xpRes] = await Promise.all([
          api.get(`/progress/${user.id}`),
          api.get("/content/subjects"),
          api.get(`/xp/user/${user.id}/total`),
        ]);

        const contentSubjects = contentRes.data;
        const userProgress = progRes.data.subjects || [];

        const merged = contentSubjects.map((cs) => {
          const uProg = userProgress.find((s) => s.subject_id === cs.id);
          const completedLevels = uProg
            ? uProg.levels.filter((l) => l.status === "complete").length
            : 0;
          const progressPercentage = (completedLevels / 4) * 100;
          const isComplete = completedLevels === 4;
          const isUnlocked =
            uProg &&
            uProg.levels.some(
              (l) => l.status === "unlocked" || l.status === "complete"
            );
          return {
            ...cs,
            status: isComplete ? "complete" : isUnlocked ? "unlocked" : "locked",
            progressPercentage,
            completedLevels,
          };
        }).sort((a, b) => a.order_index - b.order_index);

        setSubjects(merged);
        setTotalXp(xpRes.data.totalXp);
      } catch (err) {
        setError("Failed to load your learning path. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen bg-[#FAF7F2]">
          <div className="w-8 h-8 border-4 border-[#8B2500] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex flex-col justify-center items-center h-screen bg-[#FAF7F2]">
          <p className="text-[#8B2500] font-bold mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-[#8B2500] text-white rounded-lg font-bold"
          >
            Retry
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Sticky Navbar */}
      <header className="sticky top-0 bg-[#FAF7F2]/90 backdrop-blur-md z-30 border-b border-[#E8DFD1] px-6 py-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-extrabold text-[#8B2500]">Gnosis</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-[#D4641A] font-bold bg-[#FFF4E5] px-3 py-1.5 rounded-full border border-[#F0C090]">
            <Zap className="w-4 h-4 fill-[#D4641A]" />
            <span>{totalXp} XP</span>
          </div>
          <button className="p-2 text-[#8a8a8a] hover:text-[#8B2500] transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D4641A] rounded-full border-2 border-[#FAF7F2]"></span>
          </button>
          <div
            onClick={() => navigate(`/profile/${user?.id}`)}
            className="w-9 h-9 bg-[#8B2500] rounded-full flex items-center justify-center text-white font-bold uppercase cursor-pointer shadow-sm"
          >
            {user?.username ? user.username[0] : "U"}
          </div>
        </div>
      </header>

      {/* Page Content */}
      <div className="pt-10 pb-24 px-4 flex flex-col items-center bg-[#FAF7F2] min-h-screen">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-[#1a1a1a] mb-2">
            Your Learning Path
          </h2>
          <p className="text-[#6b6b6b] text-lg">
            Select a subject to continue your journey.
          </p>
        </div>

        {/* Path */}
        <div className="relative w-full max-w-2xl flex flex-col items-center">
          {/* Vertical dotted line */}
          <div className="absolute top-8 bottom-8 left-1/2 w-0 border-l-[3px] border-dashed border-[#E8DFD1] -ml-[1.5px] z-0" />

          {subjects.map((subject, index) => {
            const isComplete = subject.status === "complete";
            const isUnlocked = subject.status === "unlocked";
            const isLocked = subject.status === "locked";

            let iconBg = "bg-white border-[#E8DFD1] border-2";
            let iconColor = "text-[#c2c2c2]";
            let IconComponent = Lock;

            if (isComplete) {
              iconBg = "bg-[#4CAF50] border-[#4CAF50] border-2";
              iconColor = "text-white";
              IconComponent = Check;
            } else if (isUnlocked) {
              iconBg = "bg-[#D4641A] border-[#D4641A] border-2 ring-4 ring-[#D4641A]/20";
              iconColor = "text-white";
              IconComponent = BookOpen;
            }

            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative z-10 flex items-center w-full mb-10 group"
              >
                {/* LEFT card (even index on desktop) */}
                <div
                  className={`hidden md:flex w-[45%] justify-end pr-6 ${
                    !isLeft ? "invisible" : ""
                  }`}
                >
                  {isLeft && (
                    <SubjectCard
                      subject={subject}
                      isComplete={isComplete}
                      isUnlocked={isUnlocked}
                      isLocked={isLocked}
                      align="right"
                      onClick={() => !isLocked && navigate(`/subject/${subject.id}`)}
                    />
                  )}
                </div>

                {/* Center Node */}
                <div className="relative flex justify-center w-[10%] z-20">
                  {isLocked && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#1a1a1a] text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
                      Complete previous to unlock
                    </div>
                  )}
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 shadow-md ${iconBg} ${
                      isLocked ? "opacity-50" : "cursor-pointer"
                    }`}
                    onClick={() => !isLocked && navigate(`/subject/${subject.id}`)}
                  >
                    <IconComponent className={`w-6 h-6 ${iconColor}`} strokeWidth={2.5} />
                  </div>
                </div>

                {/* RIGHT card (odd index on desktop, always on mobile) */}
                <div
                  className={`flex w-full md:w-[45%] pl-4 md:pl-6 ${
                    isLeft ? "md:invisible md:hidden" : ""
                  }`}
                >
                  <SubjectCard
                    subject={subject}
                    isComplete={isComplete}
                    isUnlocked={isUnlocked}
                    isLocked={isLocked}
                    align="left"
                    onClick={() => !isLocked && navigate(`/subject/${subject.id}`)}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

function SubjectCard({ subject, isComplete, isUnlocked, isLocked, align, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl shadow-sm border border-[#E8DFD1] w-full max-w-xs p-5 transition-all
        ${isLocked ? "opacity-60 cursor-not-allowed" : "cursor-pointer hover:shadow-md hover:-translate-y-0.5"}
        ${align === "right" ? "text-right" : "text-left"}`}
    >
      <h3
        className={`font-bold text-lg mb-1 leading-snug ${
          isLocked ? "text-[#a0a0a0]" : "text-[#1a1a1a]"
        }`}
      >
        {subject.name}
      </h3>
      <p className="text-sm text-[#6b6b6b] mb-3 line-clamp-2">
        {subject.description}
      </p>

      {/* Progress bar */}
      <div className="w-full bg-[#FAF7F2] rounded-full h-2 overflow-hidden border border-[#E8DFD1] mb-2">
        <div
          className="bg-gradient-to-r from-[#D4641A] to-[#8B2500] h-2 rounded-full transition-all duration-700"
          style={{ width: `${subject.progressPercentage}%` }}
        />
      </div>

      <div
        className={`flex items-center gap-1 text-sm font-bold ${
          align === "right" ? "justify-end" : "justify-between"
        }`}
      >
        <span className="text-[#8a8a8a] text-xs">
          {subject.completedLevels}/4 levels
        </span>
        {isUnlocked && (
          <span className="text-[#8B2500] flex items-center gap-0.5 text-xs">
            Continue <ChevronRight size={13} />
          </span>
        )}
        {isComplete && (
          <span className="text-[#4CAF50] text-xs font-bold">✓ Done</span>
        )}
      </div>
    </div>
  );
}
