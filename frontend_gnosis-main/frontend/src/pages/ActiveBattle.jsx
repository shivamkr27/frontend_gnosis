import React from "react";
import { useNavigate } from "react-router-dom";

const ActiveBattle = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fbf8f1] p-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-[#e5dfd3]">
        <h1 className="text-3xl font-bold mb-4 text-[#1f2937]">
          Active Battle
        </h1>
        <button
          onClick={() => navigate("/battle-results")}
          className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-md font-medium"
        >
          Finish Battle
        </button>
      </div>
    </div>
  );
};

export default ActiveBattle;
