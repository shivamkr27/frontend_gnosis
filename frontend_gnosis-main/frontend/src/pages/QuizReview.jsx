import React from "react";
import { useNavigate } from "react-router-dom";

const QuizReview = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fbf8f1] p-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-[#e5dfd3]">
        <h1 className="text-3xl font-bold mb-4 text-[#1f2937]">Quiz Review</h1>
        <p className="text-[#6b7280] mb-8">Review your answers.</p>
        <button
          onClick={() => navigate("/subject/1")}
          className="bg-[#f2ede4] px-4 py-2 rounded-md font-medium hover:bg-[#e5dfd3] transition-colors"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default QuizReview;
