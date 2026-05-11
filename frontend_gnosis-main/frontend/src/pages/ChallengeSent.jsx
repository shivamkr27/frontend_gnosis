import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import { useAuthStore } from "../lib/store";
import { createSocket } from "../lib/socket";
import { motion } from "framer-motion";

export default function ChallengeSent() {
  const { friendId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const socketRef = useRef(null);

  const [error, setError] = useState(null);
  const [rejected, setRejected] = useState(false);

  useEffect(() => {
    if (!user?.id) return;

    // Parse query params for subject details passed from BattleLobby
    const searchParams = new URLSearchParams(location.search);
    const subjectId = searchParams.get("subjectId");
    const subjectName = searchParams.get("subjectName");

    if (!subjectId) {
      setError("No subject selected.");
      return;
    }

    const socket = createSocket(user);
    socketRef.current = socket;

    socket.on("connect", () => {
      // Identity
      socket.emit("user:identify", { userId: user.id, username: user.username });

      // Wait a moment then send the challenge so opponent receiver is ready
      setTimeout(() => {
        socket.emit("challenge:send", {
            toUserId: friendId,
            toUsername: "Friend",
            subjectId,
            subjectName,
            levelId: "dummy-level-id", // We'll let the backend generate fallback or we can use subject id to lookup questions
            levelNumber: 1
        });
      }, 500);
    });

    socket.on("challenge:error", (data) => {
        setError(data.message);
    });

    socket.on("challenge:rejected", () => {
        setRejected(true);
    });

    socket.on("challenge:accepted", (payload) => {
        if(payload.roomCode) {
            navigate(`/battle/lobby/${payload.roomCode}?host=1`);
        }
    });

    return () => socket.disconnect();
  }, [user, friendId, location, navigate]);

  return (
    <Layout>
      <div className="p-4 md:p-8 max-w-2xl mx-auto h-[80vh] flex flex-col items-center justify-center text-center">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center mb-8"
        >
          <div className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center text-3xl font-bold uppercase shadow-lg">
            CH
          </div>
        </motion.div>

        {error ? (
            <>
                <h1 className="text-4xl font-bold text-error mb-4">Error</h1>
                <p className="text-xl text-on-surface-variant mb-12">{error}</p>
                <button
                    onClick={() => navigate("/battle")}
                    className="px-8 py-3 bg-surface border-2 border-surface-variant text-inverse-surface font-bold rounded-xl hover:bg-surface-variant transition-colors"
                    >
                    Go Back
                </button>
            </>
        ) : rejected ? (
            <>
                <h1 className="text-4xl font-bold text-error mb-4">Challenge Declined</h1>
                <p className="text-xl text-on-surface-variant mb-12">Opponent has rejected the challenge.</p>
                <button
                    onClick={() => navigate("/battle")}
                    className="px-8 py-3 bg-surface border-2 border-surface-variant text-inverse-surface font-bold rounded-xl hover:bg-surface-variant transition-colors"
                    >
                    Go Back
                </button>
            </>
        ) : (
            <>
                <h1 className="text-4xl font-bold text-inverse-surface mb-4">
                Challenge Sent!
                </h1>
                <p className="text-xl text-on-surface-variant mb-12">
                Waiting for opponent to accept...
                </p>

                <div className="flex gap-2 justify-center mb-16">
                <div
                    className="w-3 h-3 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                />
                <div
                    className="w-3 h-3 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                />
                <div
                    className="w-3 h-3 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                />
                </div>

                <button
                onClick={() => navigate("/battle")}
                className="px-8 py-3 bg-surface border-2 border-surface-variant text-inverse-surface font-bold rounded-xl hover:bg-surface-variant transition-colors"
                >
                Cancel Challenge
                </button>
            </>
        )}
      </div>
    </Layout>
  );
}
