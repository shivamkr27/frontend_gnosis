import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useAuthStore } from "../lib/store";
import { createSocket } from "../lib/socket";

export default function HostLobby() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const socketRef = useRef(null);
  const [questions, setQuestions] = useState([]);
  const [quizName, setQuizName] = useState("Group Quiz");
  const [error, setError] = useState("");
  const [currentQ, setCurrentQ] = useState({
    text: "",
    a: "",
    b: "",
    c: "",
    d: "",
    correct: "A",
  });

  useEffect(() => {
    if (!user?.id) return undefined;
    const socket = createSocket(user);
    socketRef.current = socket;

    socket.on("group:created", ({ roomCode }) => {
      navigate(`/battle/lobby/${roomCode}?host=1`);
    });

    socket.on("battle:error", ({ message }) => setError(message));

    return () => socket.disconnect();
  }, [navigate, user]);

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
          question_type: "easy",
          timer_seconds: 20,
          explanation: "",
        },
      ]);
      setCurrentQ({ text: "", a: "", b: "", c: "", d: "", correct: "A" });
      setError("");
    }
  };

  const handleCreate = () => {
    if (!socketRef.current || questions.length === 0) return;
    socketRef.current.emit("group:create", {
      hostId: user.id,
      hostUsername: user.username,
      quizName,
      questions,
    });
  };

  return (
    <Layout>
      <div className="mx-auto max-w-4xl p-4 md:p-8">
        <h1 className="mb-8 text-3xl font-bold text-inverse-surface">
          Host Setup
        </h1>

        <div className="mb-6 rounded-2xl border border-surface-variant bg-white p-4">
          <input
            value={quizName}
            onChange={(e) => setQuizName(e.target.value)}
            placeholder="Quiz name"
            className="w-full rounded-xl border-2 border-surface-variant p-3 font-bold outline-none focus:border-primary"
          />
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-surface-variant bg-white p-6 shadow-soft">
            <h2 className="mb-4 text-xl font-bold text-inverse-surface">
              Add Question
            </h2>
            <div className="space-y-4">
              <input
                value={currentQ.text}
                onChange={(e) =>
                  setCurrentQ({ ...currentQ, text: e.target.value })
                }
                placeholder="Question Text"
                className="w-full rounded-xl border-2 border-surface-variant p-3"
              />
              <div className="grid grid-cols-2 gap-2">
                {["a", "b", "c", "d"].map((key) => (
                  <input
                    key={key}
                    value={currentQ[key]}
                    onChange={(e) =>
                      setCurrentQ({ ...currentQ, [key]: e.target.value })
                    }
                    placeholder={`Option ${key.toUpperCase()}`}
                    className="rounded-xl border-2 border-surface-variant p-3"
                  />
                ))}
              </div>
              <select
                value={currentQ.correct}
                onChange={(e) =>
                  setCurrentQ({ ...currentQ, correct: e.target.value })
                }
                className="w-full rounded-xl border-2 border-surface-variant p-3 font-bold"
              >
                <option value="A">Correct: A</option>
                <option value="B">Correct: B</option>
                <option value="C">Correct: C</option>
                <option value="D">Correct: D</option>
              </select>
              <button
                onClick={handleAdd}
                className="w-full rounded-xl bg-surface-variant py-3 font-bold text-inverse-surface hover:bg-surface-dim"
              >
                Add to Quiz
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-surface-variant bg-white p-6 shadow-soft">
            <h2 className="mb-4 text-xl font-bold text-inverse-surface">
              Quiz Summary
            </h2>
            <div className="min-h-64 space-y-2">
              {questions.map((q, i) => (
                <div
                  key={`${q.question_text}-${i}`}
                  className="rounded-xl border border-surface-variant bg-surface p-3 text-sm font-medium"
                >
                  {i + 1}. {q.question_text}
                </div>
              ))}
              {questions.length === 0 && (
                <p className="text-sm text-on-surface-variant">
                  No questions added yet.
                </p>
              )}
            </div>
            {error && <p className="mt-3 font-semibold text-error">{error}</p>}
            <button
              onClick={handleCreate}
              disabled={questions.length === 0}
              className="mt-4 w-full rounded-xl bg-primary py-4 font-bold text-white disabled:opacity-50"
            >
              Generate Room Code
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
