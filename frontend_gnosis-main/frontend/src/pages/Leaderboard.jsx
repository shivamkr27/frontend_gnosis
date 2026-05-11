import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../lib/api";
import { useAuthStore } from "../lib/store";
import { motion } from "framer-motion";

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState("global");
  const [board, setBoard] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) return;

    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        if (activeTab === "global") {
          const res = await api.get(
            `/xp/leaderboard/global?currentUserId=${user.id}`,
          );
          setBoard(res.data.leaderboard || []);
        } else {
          // Fix for Friends Leaderboard: correctly format friendIds query and default array
          const friendsRes = await api.get("/auth/friends");
          const friendsList = Array.isArray(friendsRes.data) ? friendsRes.data : [];
          const friendIds = [
            user.id,
            ...friendsList.map((friend) => friend.id),
          ].join(",");

          const res = await api.get(
            `/xp/leaderboard/friends?userId=${user.id}&friendIds=${friendIds}`,
          );
          setBoard(
            res.data.map((entry) => ({
              ...entry,
              xp: entry.totalXp, // Map totalXp to xp for uniform display
            })),
          );
        }
      } catch (err) {
        console.error(err);
        setBoard([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [activeTab, user]);

  const getNextReset = () => {
    const now = new Date();
    const target = new Date();
    target.setDate(now.getDate() + ((7 - now.getDay()) % 7));
    target.setHours(23, 59, 59, 999);

    const diff = target - now;
    if (diff <= 0) return "Resetting soon...";

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    return `${d}d ${h}h until reset`;
  };

  return (
    <Layout>
      <div className="mx-auto max-w-4xl p-4 md:p-8">
        <div className="mb-8 text-center">
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-inverse-surface">
            League of Scholars
          </h1>
          <div className="inline-block rounded-full bg-surface-variant px-4 py-2 text-sm font-bold text-on-surface-variant">
            {getNextReset()}
          </div>
        </div>

        <div className="mx-auto mb-8 flex max-w-sm rounded-2xl bg-surface-variant p-1">
          {["global", "friends"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 rounded-xl py-3 text-sm font-bold capitalize transition-colors ${
                activeTab === tab
                  ? "bg-white text-inverse-surface shadow-sm"
                  : "text-on-surface-variant"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="rounded-3xl border border-surface-variant bg-white p-4 shadow-soft md:p-8">
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : board.length === 0 ? (
            <p className="p-8 text-center font-semibold text-on-surface-variant">
              No leaderboard entries yet.
            </p>
          ) : (
            <div className="space-y-2">
              {board.map((entry, idx) => (
                <motion.div
                  key={`${entry.userId}-${activeTab}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`flex items-center gap-4 rounded-2xl p-4 ${
                    entry.userId === user?.id
                      ? "border border-primary bg-primary-container/10"
                      : "bg-surface transition-colors hover:bg-surface-container"
                  }`}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-variant text-lg font-bold text-on-surface-variant">
                    {entry.rank}
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-tertiary-container font-bold uppercase text-white">
                    {entry.username.substring(0, 2)}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-inverse-surface">
                      {entry.username}
                    </h3>
                  </div>

                  <div className="text-right text-xl font-bold text-primary">
                    {entry.xp} XP
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
