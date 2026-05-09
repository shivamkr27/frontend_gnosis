import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { X, Check, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ActiveQuiz() {
  const { levelId } = useParams();
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [progress, setProgress] = useState(30); // 30%

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
    // In a real app, move to next question. For mock, go to complete
    navigate(`/lesson/${levelId}/complete`);
  };

  return (
    <div className="min-h-screen bg-gnosis-bg flex flex-col absolute top-0 left-0 w-full z-50">

      {/* Quiz Header */}
      <div className="flex items-center gap-4 p-4 sm:p-6 max-w-4xl mx-auto w-full">
        <button
          onClick={() => navigate(`/subject/1`)}
          className="text-gnosis-muted hover:text-gnosis-text"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="flex-1 bg-gnosis-card rounded-full h-3 border border-gnosis-border overflow-hidden">
          <div
            className="bg-gnosis-purple h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-sm font-bold text-gnosis-muted">3/10</span>
      </div>

      {/* Question Area */}
      <div className="flex-1 flex flex-col items-center px-4 pt-8 sm:pt-16 max-w-2xl mx-auto w-full">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 leading-tight">
          {mockQuestion.text}
        </h2>

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {mockQuestion.options.map((option, idx) => {
            let stateClass = "bg-gnosis-card border-gnosis-border hover:border-gnosis-purple-light text-gnosis-text";

            if (isAnswered) {
              if (idx === mockQuestion.correctIndex) {
                stateClass = "bg-gnosis-green/20 border-gnosis-green text-gnosis-green";
              } else if (idx === selectedOption) {
                stateClass = "bg-gnosis-red/20 border-gnosis-red text-gnosis-red";
              } else {
                stateClass = "bg-gnosis-card border-gnosis-border opacity-50";
              }
            } else if (selectedOption === idx) {
              stateClass = "bg-gnosis-purple/20 border-gnosis-purple text-gnosis-purple-light";
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={isAnswered}
                className={`p-6 rounded-2xl border-2 text-lg font-medium transition-all text-left flex justify-between items-center
                  ${stateClass}
                `}
              >
                <span>{option}</span>
                {isAnswered && idx === mockQuestion.correctIndex && <Check className="w-6 h-6" />}
                {isAnswered && idx === selectedOption && idx !== mockQuestion.correctIndex && <X className="w-6 h-6" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback Footer */}
      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className={`fixed bottom-0 left-0 w-full p-6 border-t
              ${selectedOption === mockQuestion.correctIndex
                ? 'bg-gnosis-green/10 border-gnosis-green'
                : 'bg-gnosis-red/10 border-gnosis-red'}
            `}
          >
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center
                  ${selectedOption === mockQuestion.correctIndex ? 'bg-gnosis-green text-white' : 'bg-gnosis-red text-white'}
                `}>
                  {selectedOption === mockQuestion.correctIndex ? <Check className="w-8 h-8" /> : <X className="w-8 h-8" />}
                </div>
                <div>
                  <h3 className={`text-xl font-bold
                    ${selectedOption === mockQuestion.correctIndex ? 'text-gnosis-green' : 'text-gnosis-red'}
                  `}>
                    {selectedOption === mockQuestion.correctIndex ? 'Excellent!' : 'Incorrect'}
                  </h3>
                  {selectedOption !== mockQuestion.correctIndex && (
                    <p className="text-gnosis-text text-sm">Correct answer: {mockQuestion.options[mockQuestion.correctIndex]}</p>
                  )}
                </div>
              </div>
              <button
                onClick={handleNext}
                className={`px-8 py-3 rounded-xl font-bold text-white flex items-center gap-2 w-full sm:w-auto justify-center
                  ${selectedOption === mockQuestion.correctIndex ? 'bg-gnosis-green hover:bg-gnosis-green/90' : 'bg-gnosis-red hover:bg-gnosis-red/90'}
                `}
              >
                Continue <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
