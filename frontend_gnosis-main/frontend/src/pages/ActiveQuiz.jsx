import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { Clock, Trophy, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ActiveQuiz() {
  const { id } = useParams(); // levelId or roomId
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(15);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState("idle"); // idle, correct, incorrect
  const isBattle = id.startsWith("room-");

  // Dummy question
  const question = {
    text: "What is the time complexity of binary search?",
    options: [
      { id: "A", text: "O(n)" },
      { id: "B", text: "O(n log n)" },
      { id: "C", text: "O(log n)" },
      { id: "D", text: "O(1)" },
    ],
    correct: "C",
  };

  useEffect(() => {
    if (timeLeft > 0 && status === "idle") {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && status === "idle") {
      handleAnswer("timeout");
    }
  }, [timeLeft, status]);

  const handleAnswer = (optionId) => {
    if (status !== "idle") return;
    setSelected(optionId);

    if (optionId === question.correct) {
      setStatus("correct");
    } else {
      setStatus("incorrect");
    }

    setTimeout(() => {
      navigate(isBattle ? `/battle/results/${id}` : `/lesson/${id}/review`);
    }, 2000);
  };

  return (
    <Layout>
      <div className="p-4 md:p-8 max-w-3xl mx-auto h-[90vh] flex flex-col">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-sm border border-surface-variant">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
              Question 3/10
            </span>
            <span className="font-bold text-inverse-surface">Algorithms</span>
          </div>

          {isBattle ? (
            <div className="flex items-center gap-6 font-bold text-lg">
              <span className="text-primary">You: 150</span>
              <span className="text-on-surface-variant">vs</span>
              <span className="text-secondary">AlexD: 120</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 font-bold text-secondary">
              <Trophy className="w-5 h-5" /> 150 XP
            </div>
          )}
        </div>

        {/* Timer Bar */}
        <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden mb-8">
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: `${(timeLeft / 15) * 100}%` }}
            transition={{ duration: 1, ease: "linear" }}
            className={`h-full ${timeLeft <= 3 ? "bg-error" : "bg-primary"}`}
          />
        </div>

        {/* Question Area */}
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-inverse-surface mb-10 leading-relaxed text-center">
            {question.text}
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {question.options.map((opt) => {
              let bg = "bg-white hover:border-primary/50 text-inverse-surface";
              let border = "border-2 border-surface-variant";

              if (status !== "idle") {
                if (opt.id === question.correct) {
                  bg = "bg-green-100 text-green-900";
                  border = "border-2 border-green-500";
                } else if (opt.id === selected) {
                  bg = "bg-error-container text-on-error-container";
                  border = "border-2 border-error";
                } else {
                  bg = "bg-surface opacity-50";
                }
              }

              return (
                <button
                  key={opt.id}
                  disabled={status !== "idle"}
                  onClick={() => handleAnswer(opt.id)}
                  className={`p-6 rounded-2xl text-lg font-bold text-left transition-all ${bg} ${border} ${status === "idle" ? "hover:-translate-y-1 shadow-sm hover:shadow-md" : ""}`}
                >
                  <span className="inline-block w-8 h-8 rounded-lg bg-surface-variant/50 text-center leading-8 mr-4 text-sm text-on-surface-variant">
                    {opt.id}
                  </span>
                  {opt.text}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
