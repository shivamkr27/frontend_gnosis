import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { Trophy, Home, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

export default function BattleResults() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isVictory = true; // Hardcoded for preview

  return (
    <Layout>
      <div className="p-4 md:p-8 max-w-2xl mx-auto h-[90vh] flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center w-full"
        >
          <div className="mb-8 relative inline-block">
            <div className="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-4 bg-secondary-container">
              <Trophy className="w-16 h-16 text-secondary-container-on" />
            </div>
            {isVictory && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-6 py-2 rounded-full border-2 border-surface-variant font-bold text-lg whitespace-nowrap shadow-md text-inverse-surface"
              >
                VICTORY!
              </motion.div>
            )}
          </div>

          <div className="bg-white rounded-[2rem] p-8 shadow-soft border border-surface-variant mb-8 w-full">
            <div className="flex justify-between items-center mb-8 pb-8 border-b border-surface-variant">
              <div className="text-center w-1/3">
                <div className="text-sm font-bold text-on-surface-variant uppercase mb-2">
                  You
                </div>
                <div className="text-4xl font-bold text-primary">850</div>
              </div>
              <div className="text-2xl font-bold text-on-surface-variant/50">
                VS
              </div>
              <div className="text-center w-1/3">
                <div className="text-sm font-bold text-on-surface-variant uppercase mb-2">
                  AlexD
                </div>
                <div className="text-4xl font-bold text-inverse-surface">
                  720
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center px-4">
              <span className="font-bold text-on-surface-variant">
                Room XP Earned
              </span>
              <span className="font-bold text-secondary text-xl">+150 XP</span>
            </div>
          </div>

          <div className="flex gap-4 w-full">
            <button
              onClick={() => navigate("/home")}
              className="flex-1 py-4 bg-surface text-inverse-surface border-2 border-surface-variant font-bold text-lg rounded-xl flex items-center justify-center gap-2 hover:bg-surface-variant transition-colors"
            >
              <Home className="w-5 h-5" /> Return Home
            </button>
            <button
              onClick={() => navigate("/battle")}
              className="flex-1 py-4 bg-primary text-white font-bold text-lg rounded-xl flex items-center justify-center gap-2 hover:bg-primary-container transition-colors shadow-soft"
            >
              <RotateCcw className="w-5 h-5" /> Play Again
            </button>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
