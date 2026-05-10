import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../lib/api";
import { useAuthStore } from "../lib/store";
import { motion } from "framer-motion";

export default function Leaderboard() {
  const [board, setBoard] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await api.get(
          `/xp/leaderboard/global?currentUserId=${user?.id}`,
        );
        setBoard(res.data.leaderboard);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, [user]);

  // Generate countdown string for "Sunday reset"
  const getNextReset = () => {
    const now = new Date();
    const target = new Date();
    target.setDate(now.getDate() + ((7 - now.getDay()) % 7)); // Next Sunday
    target.setHours(23, 59, 59, 999);

    const diff = target - now;
    if (diff <= 0) return "Resetting soon...";

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    return `${d}d ${h}h until reset`;
  };

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
      <div className="p-4 md:p-8 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-inverse-surface mb-3 tracking-tight">
            League of Scholars
          </h1>
          <div className="inline-block px-4 py-2 bg-surface-variant rounded-full text-on-surface-variant font-bold text-sm">
            {getNextReset()}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-4 md:p-8 shadow-soft border border-surface-variant">
          <div className="space-y-2">
            {board.map((entry, idx) => (
              <motion.div
                key={entry.userId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`flex items-center gap-4 p-4 rounded-2xl ${entry.userId === user?.id ? "bg-primary-container/10 border-primary border" : "bg-surface hover:bg-surface-container transition-colors"}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                    idx === 0
                      ? "bg-secondary-container text-secondary-container-on"
                      : idx === 1
                        ? "bg-surface-variant text-on-surface-variant"
                        : idx === 2
                          ? "bg-primary-fixed text-primary-fixed-on"
                          : "bg-transparent text-on-surface-variant"
                  }`}
                >
                  {entry.rank}
                </div>

                <div className="w-12 h-12 bg-tertiary-container rounded-full flex items-center justify-center text-white font-bold uppercase overflow-hidden">
                  {entry.username.substring(0, 2)}
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-inverse-surface text-lg">
                    {entry.username}
                  </h3>
                </div>

                <div className="text-right">
                  <div className="font-bold text-primary text-xl">
                    {entry.xp} XP
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
