import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useAuthStore } from "../lib/store";

export default function HostLobby() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState({
    text: "",
    a: "",
    b: "",
    c: "",
    d: "",
    correct: "A",
  });

  const handleAdd = () => {
    if (currentQ.text && currentQ.a && currentQ.b && currentQ.c && currentQ.d) {
      setQuestions([
        ...questions,
        {
          question_text: currentQ.text,
          option_a: currentQ.a,
          option_b: currentQ.b,
          option_c: currentQ.c,
          option_d: currentQ.d,
          correct_options: [currentQ.correct],
          question_type: "single_correct",
          timer_seconds: 15,
        },
      ]);
      setCurrentQ({ text: "", a: "", b: "", c: "", d: "", correct: "A" });
    }
  };

  const handleCreate = () => {
    // In a full app, we would emit 'group:create' here with the Socket
    // For now we simulate navigation to the lobby room screen
    const fakeCode = "X7B9WQ";
    navigate(`/battle/lobby/${fakeCode}`);
  };

  return (
    <Layout>
      <div className="p-4 md:p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-inverse-surface mb-8">
          Host Setup
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-3xl shadow-soft border border-surface-variant">
            <h2 className="text-xl font-bold mb-4 text-inverse-surface">
              Add Question
            </h2>
            <div className="space-y-4">
              <input
                value={currentQ.text}
                onChange={(e) =>
                  setCurrentQ({ ...currentQ, text: e.target.value })
                }
                placeholder="Question Text"
                className="w-full p-3 border-2 border-surface-variant rounded-xl"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  value={currentQ.a}
                  onChange={(e) =>
                    setCurrentQ({ ...currentQ, a: e.target.value })
                  }
                  placeholder="Option A"
                  className="p-3 border-2 border-surface-variant rounded-xl"
                />
                <input
                  value={currentQ.b}
                  onChange={(e) =>
                    setCurrentQ({ ...currentQ, b: e.target.value })
                  }
                  placeholder="Option B"
                  className="p-3 border-2 border-surface-variant rounded-xl"
                />
                <input
                  value={currentQ.c}
                  onChange={(e) =>
                    setCurrentQ({ ...currentQ, c: e.target.value })
                  }
                  placeholder="Option C"
                  className="p-3 border-2 border-surface-variant rounded-xl"
                />
                <input
                  value={currentQ.d}
                  onChange={(e) =>
                    setCurrentQ({ ...currentQ, d: e.target.value })
                  }
                  placeholder="Option D"
                  className="p-3 border-2 border-surface-variant rounded-xl"
                />
              </div>
              <select
                value={currentQ.correct}
                onChange={(e) =>
                  setCurrentQ({ ...currentQ, correct: e.target.value })
                }
                className="w-full p-3 border-2 border-surface-variant rounded-xl font-bold"
              >
                <option value="A">Correct: A</option>
                <option value="B">Correct: B</option>
                <option value="C">Correct: C</option>
                <option value="D">Correct: D</option>
              </select>
              <button
                onClick={handleAdd}
                className="w-full py-3 bg-surface-variant text-inverse-surface font-bold rounded-xl hover:bg-surface-dim"
              >
                Add to Quiz
              </button>
            </div>
          </div>

          <div>
            <div className="bg-white p-6 rounded-3xl shadow-soft border border-surface-variant h-full flex flex-col">
              <h2 className="text-xl font-bold mb-4 text-inverse-surface">
                Quiz Summary
              </h2>
              <div className="flex-1 overflow-auto space-y-2">
                {questions.map((q, i) => (
                  <div
                    key={i}
                    className="p-3 bg-surface rounded-xl border border-surface-variant text-sm font-medium"
                  >
                    {i + 1}. {q.question_text}
                  </div>
                ))}
                {questions.length === 0 && (
                  <p className="text-on-surface-variant text-sm">
                    No questions added yet.
                  </p>
                )}
              </div>
              <button
                onClick={handleCreate}
                disabled={questions.length === 0}
                className="mt-4 w-full py-4 bg-primary text-white font-bold rounded-xl disabled:opacity-50"
              >
                Generate Room Code
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
