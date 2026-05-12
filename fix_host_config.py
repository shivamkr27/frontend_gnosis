import re

with open('frontend_gnosis-main/frontend/src/pages/HostConfig.jsx', 'r') as f:
    content = f.read()

new_content = """import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const HostConfig = () => {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState("Standard");
  const [questions, setQuestions] = useState("10 Questions");

  return (
    <Layout>
      <div className="min-h-[calc(100vh-80px)] bg-[#f9fafb] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-[2rem] shadow-xl border-4 border-orange-50 p-8 relative overflow-hidden">
          {/* Decorative background circle */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-full blur-3xl -mr-16 -mt-16 opacity-50"></div>

          <div className="relative z-10">
            <h1 className="text-3xl font-extrabold text-[#1f2937] mb-2 text-center">
              Configure Room
            </h1>
            <p className="text-[#6b7280] font-medium text-center mb-8">
              Set up your group battle parameters.
            </p>

            <div className="flex flex-col gap-6">
              <div>
                <label className="block text-sm font-bold text-[#374151] mb-2">
                  Select Subject Module
                </label>
                <div className="relative">
                  <select className="w-full bg-[#f9fafb] border-2 border-[#e5e7eb] rounded-xl px-4 py-3.5 focus:outline-none focus:border-orange-500 font-bold text-[#1f2937] appearance-none cursor-pointer transition-colors">
                    <option>Ancient Scripts</option>
                    <option>Data Structures</option>
                    <option>Algorithms</option>
                    <option>Operating Systems</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#6b7280]">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#374151] mb-2">
                  Difficulty Level
                </label>
                <div className="flex gap-3">
                  {['Standard', 'Advanced'].map((level) => (
                    <label key={level} className="flex-1 cursor-pointer">
                      <input
                        type="radio"
                        name="diff"
                        value={level}
                        checked={difficulty === level}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="peer sr-only"
                      />
                      <div className="text-center py-3 px-2 rounded-xl border-2 border-[#e5e7eb] peer-checked:border-orange-500 peer-checked:bg-orange-50 font-bold text-[#6b7280] peer-checked:text-orange-700 transition-all hover:bg-[#f9fafb]">
                        {level}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#374151] mb-2">
                  Number of Questions
                </label>
                <div className="flex gap-3">
                  {['10 Questions', 'Custom'].map((q) => (
                    <label key={q} className="flex-1 cursor-pointer">
                      <input
                        type="radio"
                        name="questions"
                        value={q}
                        checked={questions === q}
                        onChange={(e) => setQuestions(e.target.value)}
                        className="peer sr-only"
                      />
                      <div className="text-center py-3 px-2 rounded-xl border-2 border-[#e5e7eb] peer-checked:border-orange-500 peer-checked:bg-orange-50 font-bold text-[#6b7280] peer-checked:text-orange-700 transition-all hover:bg-[#f9fafb]">
                        {q}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-6 flex gap-3">
                <button
                  onClick={() => navigate("/battle")}
                  className="w-1/3 bg-white border-2 border-[#e5e7eb] text-[#4b5563] py-4 rounded-xl font-bold hover:bg-[#f9fafb] hover:text-[#1f2937] transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => navigate("/battle/host/room123")} // Placeholder route for now
                  className="flex-1 bg-[#ea580c] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#c2410c] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                >
                  Start Clash
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HostConfig;
"""

with open('frontend_gnosis-main/frontend/src/pages/HostConfig.jsx', 'w') as f:
    f.write(new_content)
