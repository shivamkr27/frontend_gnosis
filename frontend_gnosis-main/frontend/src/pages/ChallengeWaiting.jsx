import React from "react";
import { useNavigate } from "react-router-dom";

const ChallengeWaiting = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fbf8f1] flex flex-col items-center justify-center p-8 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-lg border border-[#e5dfd3] p-12 text-center relative overflow-hidden">
        {/* Animated Background Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-50 rounded-full animate-ping opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-orange-100 rounded-full animate-pulse"></div>

        {/* Content */}
        <div className="relative z-10">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-md border-4 border-white">
            🤖
          </div>

          <h1 className="text-3xl font-bold text-[#1f2937] mb-3">
            Challenge Sent!
          </h1>
          <p className="text-[#6b7280] text-lg mb-10">
            Waiting for opponent to accept...
          </p>

          {/* Progress Indicator */}
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

          <button
            onClick={() => navigate("/battle")}
            className="w-full bg-white border-2 border-red-200 text-red-600 hover:bg-red-50 py-3 rounded-xl font-semibold transition-all"
          >
            Cancel Challenge
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeWaiting;
