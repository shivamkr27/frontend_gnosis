import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../lib/api";
import { useAuthStore } from "../lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { Swords, Users, Play, Copy, RefreshCw } from "lucide-react";

export default function BattleLobby() {
  const [activeTab, setActiveTab] = useState("1v1");
  const [friends, setFriends] = useState([]);
  const [roomCode, setRoomCode] = useState("");
  const [quizName, setQuizName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthStore();

  useEffect(() => {
    // In a real app we fetch friends from /auth/friends
    // For now we'll mock it since we can't easily add friends in the UI yet
    setFriends([
      { id: "mock-1", username: "AlexD", total_xp: 4500, online: true },
      { id: "mock-2", username: "SamuraiX", total_xp: 3200, online: true },
      { id: "mock-3", username: "PriyaK", total_xp: 5100, online: false },
    ]);
  }, []);

  const handleCreateGroup = () => {
    navigate("/battle/host");
  };

  const handleJoinGroup = () => {
    if (roomCode.trim().length === 6) {
      navigate(`/battle/lobby/${roomCode.toUpperCase()}`);
    }
  };

  const handleChallenge = (friendId) => {
    navigate(`/battle/waiting/${friendId}`);
  };

  return (
    <Layout>
      <div className="p-4 md:p-8 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-inverse-surface mb-3 tracking-tight">
            Battle Arena
          </h1>
          <p className="text-on-surface-variant">
            Test your knowledge against others in real-time.
          </p>
        </div>

        {/* Custom Tabs */}
        <div className="flex bg-surface-variant rounded-2xl p-1 mb-8 relative w-full max-w-md mx-auto">
          <div
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-xl shadow-sm transition-all duration-300 ${activeTab === "1v1" ? "left-1" : "left-[calc(50%+2px)]"}`}
          />
          <button
            className={`flex-1 py-3 text-sm font-bold relative z-10 flex items-center justify-center gap-2 ${activeTab === "1v1" ? "text-inverse-surface" : "text-on-surface-variant"}`}
            onClick={() => setActiveTab("1v1")}
          >
            <Swords className="w-4 h-4" /> 1v1 Duel
          </button>
          <button
            className={`flex-1 py-3 text-sm font-bold relative z-10 flex items-center justify-center gap-2 ${activeTab === "group" ? "text-inverse-surface" : "text-on-surface-variant"}`}
            onClick={() => setActiveTab("group")}
          >
            <Users className="w-4 h-4" /> Group Quiz
          </button>
        </div>

        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-soft border border-surface-variant min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === "1v1" ? (
              <motion.div
                key="1v1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                <h2 className="text-xl font-bold text-inverse-surface mb-6 flex justify-between items-center">
                  Challenge Friends
                  <button className="text-primary hover:bg-primary-container/10 p-2 rounded-full transition-colors">
                    <RefreshCw className="w-5 h-5" />
                  </button>
                </h2>

                {friends.map((friend) => (
                  <div
                    key={friend.id}
                    className="flex items-center justify-between p-4 rounded-2xl bg-surface border border-surface-variant"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-tertiary-container rounded-full flex items-center justify-center text-white font-bold uppercase">
                          {friend.username.substring(0, 2)}
                        </div>
                        {friend.online && (
                          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-surface rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-inverse-surface">
                          {friend.username}
                        </h3>
                        <p className="text-sm font-medium text-primary">
                          {friend.total_xp} XP
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleChallenge(friend.id)}
                      disabled={!friend.online}
                      className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-container transition-colors shadow-soft"
                    >
                      Challenge
                    </button>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="group"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid md:grid-cols-2 gap-8"
              >
                <div className="flex flex-col items-center text-center p-8 border-2 border-dashed border-surface-variant rounded-3xl bg-surface">
                  <div className="w-16 h-16 bg-primary-container/20 text-primary rounded-2xl flex items-center justify-center mb-6">
                    <Users className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-inverse-surface mb-3">
                    Host a Room
                  </h3>
                  <p className="text-on-surface-variant mb-8">
                    Create custom questions and invite friends to a live
                    multiplayer quiz.
                  </p>
                  <button
                    onClick={handleCreateGroup}
                    className="w-full py-3.5 bg-primary text-white rounded-xl font-bold hover:bg-primary-container transition-all shadow-soft"
                  >
                    Create Room
                  </button>
                </div>

                <div className="flex flex-col items-center text-center p-8 border border-surface-variant rounded-3xl bg-surface-container-lowest shadow-sm">
                  <div className="w-16 h-16 bg-secondary-container/20 text-secondary rounded-2xl flex items-center justify-center mb-6">
                    <Play className="w-8 h-8 ml-1" />
                  </div>
                  <h3 className="text-2xl font-bold text-inverse-surface mb-3">
                    Join a Room
                  </h3>
                  <p className="text-on-surface-variant mb-6">
                    Enter the 6-character room code provided by the host.
                  </p>

                  <div className="w-full flex gap-2">
                    <input
                      type="text"
                      maxLength={6}
                      value={roomCode}
                      onChange={(e) =>
                        setRoomCode(e.target.value.toUpperCase())
                      }
                      placeholder="ENTER CODE"
                      className="flex-1 px-4 py-3.5 text-center font-bold text-xl tracking-widest bg-white border-2 border-surface-variant rounded-xl focus:outline-none focus:border-secondary uppercase"
                    />
                    <button
                      onClick={handleJoinGroup}
                      disabled={roomCode.length !== 6}
                      className="px-6 bg-secondary text-white rounded-xl font-bold hover:bg-secondary-container disabled:opacity-50 transition-colors shadow-soft"
                    >
                      Join
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
}
