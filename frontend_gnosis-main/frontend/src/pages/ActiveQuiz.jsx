import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export function ActiveQuiz() {
  const { levelId } = useParams();
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const mockQuestion = {
    text: "Which physical principle directly implies the existence of the Heisenberg Uncertainty Relation?",
    options: ["Non-commutativity of operators", "Wave-particle duality of light", "The exclusion principle", "Conservation of angular momentum"],
    correctIndex: 0
  };

  const handleSelect = (idx) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    setTimeout(() => {
      navigate(`/lesson/${levelId}/complete`);
    }, 1500);
  };

  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-body-md overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">

      <main className="flex-grow relative flex flex-col items-center justify-center px-margin-mobile md:px-margin-desktop py-12 max-w-container-max mx-auto w-full">
        <div className="w-full max-w-3xl relative z-10">

          {/* Header Stats Section */}
          <div className="flex justify-between items-end mb-8 w-full">
            <div className="space-y-1">
              <span className="font-label-md text-[14px] font-semibold text-secondary uppercase tracking-widest">Quantum Mechanics II</span>
              <h2 className="font-headline-md text-[24px] font-semibold text-on-surface">Question 3 of 10</h2>
            </div>
            {/* Keeping You vs Opponent scores conceptually, replacing Session XP with scores for battle mode as requested */}
            <div className="text-right">
              <span className="font-label-md text-[14px] font-semibold text-on-surface-variant block mb-1">Score: You 150 - Opp 100</span>
            </div>
          </div>

          {/* Global Progress Bar */}
          <div className="w-full h-1 bg-surface-variant rounded-full mb-16 overflow-hidden">
            <div className="h-full bg-secondary w-[30%] transition-all duration-500 shadow-[0_0_8px_rgba(111,216,200,0.4)]"></div>
          </div>

          {/* Question Canvas */}
          <section className="text-center mb-16">
            <p className="font-headline-lg text-[32px] md:text-[48px] font-bold text-on-surface leading-tight">
              {mockQuestion.text}
            </p>
          </section>

          {/* Option Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter mb-20">
            {mockQuestion.options.map((option, idx) => {

              let stateClass = "bg-surface-container-low border-outline-variant/30 hover:border-primary";
              if (isAnswered) {
                if (idx === mockQuestion.correctIndex) {
                   stateClass = "bg-[#30a193]/20 border-[#30a193]";
                } else if (idx === selectedOption) {
                   stateClass = "bg-[#93000a]/20 border-[#93000a]";
                } else {
                   stateClass = "bg-surface-container-low border-outline-variant/30 opacity-50";
                }
              } else if (selectedOption === idx) {
                stateClass = "bg-primary/20 border-primary";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={isAnswered}
                  className={`group relative flex items-center p-6 border transition-all duration-200 text-left active:scale-[0.98] ${stateClass}`}
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-transparent group-hover:bg-primary transition-colors"></div>
                  <span className={`font-label-md text-[14px] font-semibold text-primary mr-6 border border-primary/30 px-2 py-1 rounded-sm transition-colors
                    ${(isAnswered && idx === mockQuestion.correctIndex) || selectedOption === idx ? 'bg-primary text-on-primary' : 'group-hover:bg-primary group-hover:text-on-primary'}`}
                  >
                    {optionLabels[idx]}
                  </span>
                  <span className="font-body-lg text-[18px] text-on-surface">{option}</span>
                </button>
              );
            })}
          </div>

        </div>
      </main>

      {/* Professional Countdown Footer */}
      <footer className="fixed bottom-0 left-0 w-full z-50">
        <div className="max-w-container-max mx-auto px-margin-desktop py-4 flex justify-between items-center bg-surface-container-low/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-tertiary">schedule</span>
            <span className="font-label-md text-[14px] font-semibold text-on-surface-variant">Time remaining: <span className="text-on-surface font-bold">14s</span></span>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-on-surface-variant hover:text-error transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">flag</span>
              <span className="font-label-sm text-[12px] font-medium">REPORT</span>
            </button>
          </div>
        </div>
        {/* Shrinking Countdown Bar */}
        <div className="w-full h-1.5 bg-surface-variant">
          <div className="h-full bg-tertiary w-[35%] transition-all duration-1000 ease-linear shadow-[0_0_12px_rgba(241,204,113,0.3)]"></div>
        </div>
      </footer>
    </div>
  );
}