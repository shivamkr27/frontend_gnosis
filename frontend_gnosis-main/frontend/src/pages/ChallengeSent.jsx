import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { motion } from "framer-motion";

export default function ChallengeSent() {
  const { friendId } = useParams();
  const navigate = useNavigate();

  // Simulate opponent accepting after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      // Direct them to the active quiz (battle mode)
      navigate(`/lesson/room-mock123`);
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Layout>
      <div className="p-4 md:p-8 max-w-2xl mx-auto h-[80vh] flex flex-col items-center justify-center text-center">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center mb-8"
        >
          <div className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center text-3xl font-bold uppercase shadow-lg">
            AL
          </div>
        </motion.div>

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
      </div>
    </Layout>
  );
}
