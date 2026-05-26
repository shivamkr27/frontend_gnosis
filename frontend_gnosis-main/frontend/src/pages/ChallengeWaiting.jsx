import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useAuthStore } from "../lib/store";
import { createSocket } from "../lib/socket";
import api from "../lib/api";

const ChallengeWaiting = () => {
  const navigate = useNavigate();
  const { friendId } = useParams();
  const [searchParams] = useSearchParams();
  const { user } = useAuthStore();
  
  const subjectId = searchParams.get("subjectId");
  const subjectName = searchParams.get("subjectName");
  const levelId = searchParams.get("levelId");
  const levelNumber = searchParams.get("levelNumber");

  const [friendName, setFriendName] = useState("Friend");
  const [error, setError] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!user || !friendId || !subjectId) {
        navigate("/battle");
        return;
    }

    const socket = createSocket(user);
    socketRef.current = socket;

    socket.on("connect", () => {
      // Step 1: Identify
      socket.emit("user:identify", {
        userId: user.id,
        username: user.username,
      });

      // Step 2: Send Challenge
      socket.emit("challenge:send", {
        toUserId: friendId,
        subjectId,
        levelId,
        subjectName,
        levelNumber: parseInt(levelNumber || "1")
      });
    });

    socket.on("challenge:accepted", ({ roomCode }) => {
      navigate(`/battle/lobby/${roomCode}?host=1`);
    });

    socket.on("challenge:rejected", () => {
      setError("Challenge was declined.");
      setTimeout(() => navigate("/battle"), 3000);
    });

    socket.on("challenge:error", ({ message }) => {
        setError(message || "Failed to send challenge.");
        setTimeout(() => navigate("/battle"), 3000);
    });

    // Fetch friend name for display
    api.get(`/auth/users/${friendId}`).then(res => {
        setFriendName(res.data.username);
    }).catch(() => {});

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, [user, friendId, subjectId, levelId, subjectName, levelNumber, navigate]);

  return (
    <div className="min-h-screen bg-[#fbf8f1] flex flex-col items-center justify-center p-8 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-lg border border-[#e5dfd3] p-12 text-center relative overflow-hidden">
        {/* Animated Background Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-50 rounded-full animate-ping opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-orange-100 rounded-full animate-pulse"></div>

        {/* Content */}
        <div className="relative z-10">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-md border-4 border-white uppercase">
            {friendName.substring(0, 2)}
          </div>

          <h1 className="text-3xl font-bold text-[#1f2937] mb-3">
            {error ? "Oops!" : "Challenge Sent!"}
          </h1>
          <p className="text-[#6b7280] text-lg mb-10">
            {error || `Waiting for ${friendName} to accept...`}
          </p>

          {!error && (
            <div className="flex justify-center gap-2 mb-12">
              <div
                className="w-3 h-3 bg-orange-400 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              ></div>
              <div
                className="w-3 h-3 bg-orange-400 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              ></div>
              <div
                className="w-3 h-3 bg-orange-400 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              ></div>
            </div>
          )}

          <button
            onClick={() => navigate("/battle")}
            className="w-full bg-white border-2 border-red-200 text-red-600 hover:bg-red-50 py-3 rounded-xl font-semibold transition-all"
          >
            {error ? "Back to Arena" : "Cancel Challenge"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeWaiting;
