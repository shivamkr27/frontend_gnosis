import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export function ActiveQuiz() {
  const { levelId } = useParams();
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const progress = 30; // 30%

  const mockQuestion = {
    text: "Which physical principle directly implies the existence of the Heisenberg Uncertainty Relation?",
    options: [
      "Non-commutativity of operators",
      "Wave-particle duality of light",
      "The exclusion principle",
      "Conservation of angular momentum"
    ],
    correctIndex: 0
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
    <div className="min-h-screen bg-gnosis-bg flex flex-col relative z-50 pt-20">

      {/* Background Mandala Watermark */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg height="100%" viewBox="0 0 800 800" width="100%" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" stroke="#f4a261" strokeWidth="0.5">
            <circle cx="400" cy="400" r="300"></circle>
            <circle cx="400" cy="400" r="250"></circle>
            <circle cx="400" cy="400" r="200"></circle>
            <path d="M400 100 L400 700 M100 400 L700 400"></path>
            <rect height="400" transform="rotate(45 400 400)" width="400" x="200" y="200"></rect>
            <rect height="300" width="300" x="250" y="250"></rect>
          </g>
        </svg>
      </div>

      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-10 max-w-container-max mx-auto w-full z-10">
        <div className="w-full max-w-3xl">

          {/* Header Stats Section */}
          <div className="flex justify-between items-end mb-8 w-full">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#30a193] uppercase tracking-widest">Quantum Mechanics II</span>
              <h2 className="text-2xl font-serif font-bold text-gnosis-text">Question 3 of 10</h2>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-gnosis-muted block mb-1">Session XP</span>
              <span className="text-2xl font-serif font-bold text-[#f4a261]">+ 150</span>
            </div>
          </div>

          {/* Global Progress Bar */}
          <div className="w-full h-1 bg-[#2e3543] rounded-full mb-16 overflow-hidden">
            <div className="h-full bg-[#30a193] transition-all duration-500 shadow-[0_0_8px_rgba(48,161,147,0.4)]" style={{width: `${progress}%`}}></div>
          </div>

          {/* Question Canvas */}
          <section className="text-center mb-16">
            <p className="text-3xl md:text-5xl font-serif font-bold text-gnosis-text leading-tight">
              {mockQuestion.text}
            </p>
          </section>

          {/* Option Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            {mockQuestion.options.map((option, idx) => {
              let stateClass = "border-[#2e3543]/30 bg-[#151c29] hover:border-[#f4a261] text-gnosis-text";
              let markerClass = "border-[#f4a261]/30 text-[#f4a261] group-hover:bg-[#f4a261] group-hover:text-[#4e2600]";
              let notchClass = "bg-transparent group-hover:bg-[#f4a261]";

              if (isAnswered) {
                if (idx === mockQuestion.correctIndex) {
                  stateClass = "border-[#30a193] bg-[#30a193]/10 text-gnosis-text shadow-[0_0_15px_rgba(48,161,147,0.2)]";
                  markerClass = "bg-[#30a193] text-[#003731] border-[#30a193]";
                  notchClass = "bg-[#30a193]";
                } else if (idx === selectedOption) {
                  stateClass = "border-[#ffb4ab] bg-[#93000a]/30 text-gnosis-text shadow-[0_0_15px_rgba(255,180,171,0.2)]";
                  markerClass = "bg-[#ffb4ab] text-[#690005] border-[#ffb4ab]";
                  notchClass = "bg-[#ffb4ab]";
                } else {
                  stateClass = "border-[#2e3543]/30 bg-[#151c29] text-gnosis-muted opacity-50";
                  markerClass = "border-[#2e3543] text-gnosis-muted";
                  notchClass = "bg-transparent";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={isAnswered}
                  className={`group relative flex items-center p-6 border transition-all duration-200 text-left active:scale-[0.98] ${stateClass}`}
                >
                  <div className={`absolute top-0 left-0 w-1 h-full transition-colors ${notchClass}`}></div>
                  <span className={`font-bold text-sm mr-6 border px-3 py-1 rounded-sm transition-colors ${markerClass}`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-lg">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Next Button appearing when answered */}
          {isAnswered && (
             <div className="flex justify-center mb-10">
               <button onClick={handleNext} className="bg-[#f4a261] text-[#4e2600] px-12 py-4 font-bold text-sm tracking-widest uppercase hover:brightness-110 active:scale-95 transition-all shadow-lg flex items-center gap-2">
                 CONTINUE
                 <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
               </button>
             </div>
          )}

        </div>
      </main>

      {/* Professional Countdown Footer */}
      {!isAnswered && (
        <footer className="fixed bottom-0 left-0 w-full z-50">
          <div className="max-w-container-max mx-auto px-4 md:px-10 py-4 flex justify-between items-center bg-[#151c29]/80 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-[#f1cc71] fill-current" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
              <span className="text-sm font-bold text-gnosis-muted">Time remaining: <span className="text-gnosis-text font-bold">14s</span></span>
            </div>
            <div className="flex items-center gap-6">
              <button className="text-gnosis-muted hover:text-[#ffb4ab] transition-colors flex items-center gap-2">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"/></svg>
                <span className="font-bold text-xs">REPORT</span>
              </button>
            </div>
          </div>
          <div className="w-full h-1.5 bg-[#2e3543]">
            <div className="h-full bg-[#f1cc71] transition-all duration-1000 ease-linear shadow-[0_0_12px_rgba(241,204,113,0.3)]" style={{width: '35%'}}></div>
          </div>
        </footer>
      )}

    </div>
  );
}