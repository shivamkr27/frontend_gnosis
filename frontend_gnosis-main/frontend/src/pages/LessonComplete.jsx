import React from "react";
import { useNavigate } from "react-router-dom";
import { Award, ArrowRight } from "lucide-react";

const LessonComplete = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fbf8f1] flex flex-col items-center justify-center p-8 font-sans">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-lg border border-[#e5dfd3] p-12 text-center relative overflow-hidden">
        {/* Confetti-like background elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-10 left-10 w-4 h-4 bg-orange-500 rounded-full"></div>
          <div className="absolute top-20 right-20 w-3 h-3 bg-blue-500 rotate-45"></div>
          <div className="absolute bottom-20 left-32 w-5 h-5 bg-yellow-500 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-4 h-4 bg-green-500 rotate-12"></div>
        </div>

        <div className="relative z-10">
          <div className="w-24 h-24 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award size={48} />
          </div>

          <h1 className="text-4xl font-bold text-[#1f2937] mb-2">
            Lesson Complete!
          </h1>
          <p className="text-[#6b7280] text-lg mb-10">
            Excellent work mastering this module.
          </p>

          <div className="bg-[#fbf8f1] border border-[#e5dfd3] rounded-2xl p-8 mb-10 max-w-sm mx-auto">
            <p className="text-[#6b7280] font-medium mb-2 uppercase tracking-widest text-sm">
              Experience Gained
            </p>
            <p className="text-4xl font-black text-orange-600 mb-2">+150 XP</p>
            <div className="flex justify-center items-center gap-2 text-sm font-bold text-[#1f2937] bg-white w-max mx-auto px-3 py-1 rounded-full border border-[#e5dfd3]">
              <span className="text-orange-500 text-lg">🔥</span> 1-Day Streak
              Bonus
            </div>
          </div>

          <button
            onClick={() => navigate("/subject/1")}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-xl font-bold text-xl hover:from-orange-600 hover:to-amber-600 transition-all flex items-center justify-center gap-2 shadow-md"
          >
            Continue <ArrowRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonComplete;
