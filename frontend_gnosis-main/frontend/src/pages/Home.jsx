import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../lib/api";
import { useAuthStore } from "../lib/store";
import { motion } from "framer-motion";
import { Trophy, Flame, Lock, Check, Star } from "lucide-react";

export default function Home() {
  const { user } = useAuthStore();
  const [subjects, setSubjects] = useState([]);
  const [streakData, setStreakData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const [progRes, streakRes] = await Promise.all([
          api.get(`/progress/${user.id}`),
          api.get(`/progress/${user.id}/streak`),
        ]);

        // Fetch subject details for names/descriptions
        const contentRes = await api.get("/content/subjects");
        const contentSubjects = contentRes.data;

        // Merge progress with content to get a complete 25-node list
        const merged = contentSubjects
          .map((cs) => {
            const userProg = progRes.data.subjects.find(
              (s) => s.subject_id === cs.id,
            );
            const isComplete =
              userProg && userProg.levels.every((l) => l.status === "complete");
            const isUnlocked =
              userProg &&
              userProg.levels.some(
                (l) => l.status === "unlocked" || l.status === "complete",
              );

            return {
              ...cs,
              status: isComplete
                ? "complete"
                : isUnlocked
                  ? "unlocked"
                  : "locked",
              progress: userProg ? userProg.levels : [],
            };
          })
          .sort((a, b) => a.order_index - b.order_index);

        setSubjects(merged);
        setStreakData(streakRes.data);
      } catch (err) {
        console.error("Failed to fetch progress", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading)
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </Layout>
    );

  return (
    <Layout>
      {/* Top Header */}
      <header className="sticky top-0 md:top-4 bg-white/90 backdrop-blur-md z-30 border-b md:border md:rounded-2xl border-surface-variant p-4 flex justify-between items-center md:mx-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-surface p-2 pr-4 rounded-xl">
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center text-primary">
              <Flame className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">
                Streak
              </span>
              <span className="text-sm font-bold text-inverse-surface leading-none">
                {streakData?.streakCount || 0} Days
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-secondary-container/20 p-2 pr-4 rounded-xl">
          <div className="w-8 h-8 bg-secondary-container rounded-lg flex items-center justify-center text-secondary-container-on">
            <Trophy className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">
              Total XP
            </span>
            <span className="text-sm font-bold text-inverse-surface leading-none">
              {user?.total_xp || 0}
            </span>
          </div>
        </div>
      </header>

      {/* Path Container */}
      <div className="py-12 px-4 flex flex-col items-center relative">
        {/* The dotted line connecting nodes */}
        <div className="absolute top-0 bottom-0 left-1/2 w-1.5 -ml-[3px] bg-surface-variant rounded-full z-0" />

        {subjects.map((subject, index) => {
          // Zigzag layout logic
          const isLeft = index % 2 === 0;
          const xOffset = isLeft ? -40 : 40;

          let NodeIcon = Lock;
          let nodeColor =
            "bg-surface text-on-surface-variant border-surface-variant";
          let shadow = "";
          let pulse = "";

          if (subject.status === "complete") {
            NodeIcon = Check;
            nodeColor = "bg-secondary text-white border-secondary";
            shadow = "shadow-lg shadow-secondary/30";
          } else if (subject.status === "unlocked") {
            NodeIcon = Star;
            nodeColor = "bg-primary text-white border-primary";
            shadow = "shadow-xl shadow-primary/40";
            pulse = "ring-4 ring-primary/20 ring-offset-2 animate-pulse";
          }

          return (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative z-10 my-6 flex flex-col items-center group cursor-pointer"
              style={{ transform: `translateX(${xOffset}px)` }}
              onClick={() => {
                if (subject.status !== "locked") {
                  navigate(`/subject/${subject.id}`);
                }
              }}
            >
              {/* Tooltip bubble */}
              <div
                className={`absolute -top-14 whitespace-nowrap bg-white px-4 py-2 rounded-xl shadow-md border border-surface-variant font-bold text-inverse-surface transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 pointer-events-none`}
              >
                {subject.name}
              </div>

              {/* Node */}
              <div
                className={`w-20 h-20 rounded-full border-4 flex items-center justify-center transition-transform group-hover:scale-110 ${nodeColor} ${shadow} ${pulse}`}
              >
                <NodeIcon
                  className={`w-8 h-8 ${subject.status === "locked" ? "opacity-50" : ""}`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Scroll indicator for the bottom */}
      <div className="py-12 flex justify-center text-on-surface-variant/50">
        <div className="w-2 h-2 rounded-full bg-current mx-1"></div>
        <div className="w-2 h-2 rounded-full bg-current mx-1"></div>
        <div className="w-2 h-2 rounded-full bg-current mx-1"></div>
      </div>
    </Layout>
  );
}
