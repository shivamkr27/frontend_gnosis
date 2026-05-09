import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { X, Check, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ActiveQuiz() {
  const { levelId } = useParams();
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const progress = 30; // 30%

  const mockQuestion = {
    text: "Which data structure uses LIFO (Last In, First Out) principle?",
    options: ["Queue", "Stack", "Linked List", "Binary Tree"],
    correctIndex: 1
  };

  const handleSelect = (idx) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
  };

  const handleNext = () => {
    navigate(`/lesson/${levelId}/complete`);
  };

  return (
    <div className="min-h-screen bg-gnosis-bg flex flex-col absolute top-0 left-0 w-full z-50">

      {/* Quiz Header */}
      <div className="flex items-center gap-4 p-4 sm:p-6 max-w-4xl mx-auto w-full">
        <button
          onClick={() => navigate(`/subject/1`)}
          className="text-gnosis-muted hover:text-gnosis-text transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="flex-1 bg-gnosis-card rounded-full h-4 border border-gnosis-border overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-gradient-to-r from-gnosis-purple to-gnosis-purple-light h-full rounded-full"
          />
        </div>
        <span className="text-sm font-black text-gnosis-muted">3 / 10</span>
      </div>

      {/* Question Area */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex-1 flex flex-col items-center px-4 pt-8 sm:pt-16 max-w-3xl mx-auto w-full"
      >
        <h2 className="text-2xl sm:text-4xl font-black text-center mb-12 leading-tight">
          {mockQuestion.text}
        </h2>

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {mockQuestion.options.map((option, idx) => {
            let stateClass = "bg-gnosis-card border-gnosis-border hover:border-gnosis-purple hover:bg-gnosis-purple/5 text-gnosis-text";

            if (isAnswered) {
              if (idx === mockQuestion.correctIndex) {
                stateClass = "bg-gnosis-green/10 border-gnosis-green text-gnosis-green shadow-[0_0_15px_rgba(16,185,129,0.2)]";
              } else if (idx === selectedOption) {
                stateClass = "bg-gnosis-red/10 border-gnosis-red text-gnosis-red shadow-[0_0_15px_rgba(239,68,68,0.2)]";
              } else {
                stateClass = "bg-gnosis-card border-gnosis-border opacity-30";
              }
            } else if (selectedOption === idx) {
              stateClass = "bg-gnosis-purple/20 border-gnosis-purple text-gnosis-purple-light shadow-[0_0_15px_rgba(124,58,237,0.2)]";
            }

            return (
              <motion.button
                key={idx}
                whileHover={!isAnswered ? { scale: 1.02 } : {}}
                whileTap={!isAnswered ? { scale: 0.98 } : {}}
                onClick={() => handleSelect(idx)}
                disabled={isAnswered}
                className={`p-6 rounded-2xl border-2 text-lg font-bold transition-all text-left flex justify-between items-center ${stateClass}`}
              >
                <span>{option}</span>
                {isAnswered && idx === mockQuestion.correctIndex && <Check className="w-6 h-6" strokeWidth={3} />}
                {isAnswered && idx === selectedOption && idx !== mockQuestion.correctIndex && <X className="w-6 h-6" strokeWidth={3} />}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Feedback Footer */}
      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            className={`fixed bottom-0 left-0 w-full p-6 sm:p-8 border-t-2 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]
              ${selectedOption === mockQuestion.correctIndex
                ? 'bg-gnosis-green/10 border-gnosis-green backdrop-blur-md'
                : 'bg-gnosis-red/10 border-gnosis-red backdrop-blur-md'}
            `}
          >
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg
                  ${selectedOption === mockQuestion.correctIndex ? 'bg-gnosis-green text-white' : 'bg-gnosis-red text-white'}
                `}>
                  {selectedOption === mockQuestion.correctIndex ? <Check className="w-8 h-8" strokeWidth={3} /> : <X className="w-8 h-8" strokeWidth={3} />}
                </div>
                <div>
                  <h3 className={`text-2xl font-black mb-1
                    ${selectedOption === mockQuestion.correctIndex ? 'text-gnosis-green' : 'text-gnosis-red'}
                  `}>
                    {selectedOption === mockQuestion.correctIndex ? 'Excellent!' : 'Incorrect'}
                  </h3>
                  {selectedOption !== mockQuestion.correctIndex && (
                    <p className="text-gnosis-text font-bold">Correct answer: <span className="text-gnosis-green">{mockQuestion.options[mockQuestion.correctIndex]}</span></p>
                  )}
                </div>
              </div>
              <button
                onClick={handleNext}
                className={`px-10 py-4 rounded-xl font-black text-white text-lg flex items-center gap-2 w-full sm:w-auto justify-center transition-transform hover:scale-105 shadow-xl
                  ${selectedOption === mockQuestion.correctIndex ? 'bg-gnosis-green hover:bg-gnosis-green/90' : 'bg-gnosis-red hover:bg-gnosis-red/90'}
                `}
              >
                Continue <ArrowRight className="w-6 h-6" strokeWidth={3} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
