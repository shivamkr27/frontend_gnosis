import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useAuthStore } from "../lib/store";
import { createSocket } from "../lib/socket";
import { Users, Copy, Trophy } from "lucide-react";

const optionMap = [
  ["A", "option_a"],
  ["B", "option_b"],
  ["C", "option_c"],
  ["D", "option_d"],
];

export default function ParticipantLobby() {
  const { code } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const socketRef = useRef(null);
  const isHost = new URLSearchParams(location.search).get("host") === "1";
  const [players, setPlayers] = useState([]);
  const [quizName, setQuizName] = useState("");
  const [error, setError] = useState("");
  const [starting, setStarting] = useState(false);
  const [questionPayload, setQuestionPayload] = useState(null);
  const [selected, setSelected] = useState(null);
  const [answerResult, setAnswerResult] = useState(null);
  const [results, setResults] = useState(null);

  const question = questionPayload?.question;
  const options = useMemo(() => {
    if (!question) return [];
    return optionMap.map(([id, key]) => ({ id, text: question[key] }));
  }, [question]);

  useEffect(() => {
    if (!user?.id) return undefined;
    const socket = createSocket(user);
    socketRef.current = socket;

    socket.on("connect", () => {
      socket.emit(isHost ? "room:host_join" : "room:join", {
        roomCode: code,
        userId: user.id,
        username: user.username,
      });
    });

    socket.on("room:joined", (payload) => {
      setQuizName(payload.quizName || "");
      setPlayers(payload.players || []);
      setError("");
    });
    socket.on("room:players", ({ players: nextPlayers }) => setPlayers(nextPlayers || []));
    socket.on("room:player_joined", ({ players: nextPlayers }) => setPlayers(nextPlayers || []));
    socket.on("room:error", ({ message }) => setError(message));
    socket.on("quiz:error", ({ message }) => setError(message));
    socket.on("quiz:starting", () => {
      setStarting(true);
      setError("");
    });
    socket.on("quiz:question", (payload) => {
      setQuestionPayload(payload);
      setSelected(null);
      setAnswerResult(null);
      setStarting(false);
    });
    socket.on("quiz:answer_result", (payload) => setAnswerResult(payload));
    socket.on("quiz:answer_rejected", ({ reason }) => {
      setAnswerResult({ correct: false, xpEarned: 0, explanation: reason });
    });
    socket.on("quiz:results", (payload) => setResults(payload));

    return () => socket.disconnect();
  }, [code, isHost, user]);

  const startQuiz = () => {
    socketRef.current?.emit("host:start_quiz", { roomCode: code });
  };

  const submitAnswer = (optionId) => {
    if (!question || selected) return;
    setSelected(optionId);
    socketRef.current?.emit("quiz:answer", {
      roomCode: code,
      questionId: question.id,
      selectedOptions: [optionId],
    });
  };

  if (results) {
    return (
      <Layout>
        <div className="mx-auto flex min-h-[80vh] max-w-3xl flex-col justify-center p-4 md:p-8">
          <div className="rounded-3xl border border-surface-variant bg-white p-8 text-center shadow-soft">
            <Trophy className="mx-auto mb-4 h-14 w-14 text-secondary" />
            <h1 className="mb-6 text-3xl font-bold text-inverse-surface">
              Battle Results
            </h1>
            <div className="space-y-3">
              {(results.top3 || []).map((player, index) => (
                <div
                  key={player.userId}
                  className="flex items-center justify-between rounded-xl bg-surface p-4 font-bold"
                >
                  <span>
                    #{index + 1} {player.username}
                  </span>
                  <span className="text-primary">{player.score} XP</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate("/battle")}
              className="mt-8 rounded-xl bg-primary px-8 py-3 font-bold text-white"
            >
              Back to Battle
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (question) {
    return (
      <Layout>
        <div className="mx-auto max-w-3xl p-4 md:p-8">
          <div className="mb-6 flex items-center justify-between rounded-2xl border border-surface-variant bg-white p-4">
            <span className="font-bold text-on-surface-variant">
              Question {questionPayload.qIndex}/{questionPayload.total}
            </span>
            <span className="font-bold text-primary">
              {questionPayload.timerSeconds}s
            </span>
          </div>

          <h1 className="mb-8 text-center text-3xl font-bold text-inverse-surface">
            {question.question_text}
          </h1>

          <div className="grid gap-4 sm:grid-cols-2">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => submitAnswer(option.id)}
                disabled={Boolean(selected)}
                className="rounded-2xl border-2 border-surface-variant bg-white p-5 text-left font-bold shadow-sm disabled:opacity-70"
              >
                <span className="mr-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-surface-variant text-sm">
                  {option.id}
                </span>
                {option.text}
              </button>
            ))}
          </div>

          {answerResult && (
            <div
              className={`mt-6 rounded-2xl p-4 font-bold ${
                answerResult.correct
                  ? "bg-green-100 text-green-900"
                  : "bg-error-container text-on-error-container"
              }`}
            >
              {answerResult.correct ? "Correct" : "Wrong"} · +
              {answerResult.xpEarned || 0} XP
              {answerResult.explanation && (
                <p className="mt-2 text-sm">{answerResult.explanation}</p>
              )}
            </div>
          )}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-[calc(100vh-80px)] bg-[#f9fafb] flex flex-col items-center py-12 px-4 relative">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

        <div className="relative z-10 w-full max-w-4xl text-center">
          <h1 className="text-4xl font-extrabold text-[#1f2937] mb-2 drop-shadow-sm">
            {isHost ? 'Waiting for Participant...' : 'Waiting for Host...'}
          </h1>
          <p className="text-[#6b7280] font-bold text-lg mb-12">
            The clash of minds begins soon!
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16 mb-16">
            {/* Player 1 */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-indigo-100 rounded-full border-8 border-white shadow-xl flex items-center justify-center relative overflow-hidden mb-4">
                <span className="text-4xl md:text-5xl font-extrabold text-indigo-700 uppercase">
                  {user?.username ? user.username.substring(0, 2) : 'ME'}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-[#1f2937] bg-white px-6 py-2 rounded-full shadow-sm border border-[#e5e7eb]">
                {user?.username || 'You'}
              </h3>
            </div>

            {/* VS Badge */}
            <div className="flex flex-col items-center justify-center shrink-0">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl rotate-12 flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                <span className="text-white font-black text-2xl -rotate-12">VS</span>
              </div>
            </div>

            {/* Player 2 (Opponent or Empty) */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-full border-8 border-[#f3f4f6] border-dashed flex items-center justify-center relative mb-4 shadow-sm">
                {players.length > 1 ? (
                  <span className="text-4xl md:text-5xl font-extrabold text-orange-500 uppercase">
                    {players.find(p => p.userId !== user?.id)?.username?.substring(0, 2) || 'OP'}
                  </span>
                ) : (
                  <span className="text-6xl text-[#d1d5db]">?</span>
                )}
              </div>
              <h3 className="text-2xl font-bold text-[#1f2937] bg-white px-6 py-2 rounded-full shadow-sm border border-[#e5e7eb] min-w-[120px]">
                {players.length > 1 ? players.find(p => p.userId !== user?.id)?.username : 'Waiting...'}
              </h3>
            </div>
          </div>

          {/* Action Area */}
          <div className="max-w-md mx-auto bg-white p-6 rounded-3xl shadow-lg border-2 border-[#f3f4f6]">
            {isHost && (
              <div className="mb-6">
                <p className="text-sm font-bold text-[#6b7280] mb-2 uppercase tracking-wider">Room Code</p>
                <div className="flex items-center justify-center gap-3 bg-[#f9fafb] border-2 border-[#e5e7eb] rounded-2xl py-3 px-4">
                  <span className="text-3xl font-black tracking-widest text-[#1f2937] uppercase">{code}</span>
                  <button
                    onClick={() => navigator.clipboard.writeText(code)}
                    className="p-2 hover:bg-[#e5e7eb] rounded-xl transition-colors text-[#6b7280] hover:text-[#1f2937]"
                    title="Copy Code"
                  >
                    <Copy className="w-6 h-6" />
                  </button>
                </div>
              </div>
            )}

            {error && <p className="mb-4 font-bold text-red-500">{error}</p>}

            {isHost ? (
              <button
                onClick={startQuiz}
                disabled={players.length < 1 || starting}
                className="w-full bg-[#ea580c] text-white py-4 rounded-xl font-bold text-xl hover:bg-[#c2410c] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0"
              >
                {starting ? "Starting..." : "Start Clash"}
              </button>
            ) : (
              <button
                disabled
                className="w-full bg-[#f3f4f6] text-[#6b7280] border-2 border-[#e5e7eb] py-4 rounded-xl font-bold text-xl transition-all cursor-not-allowed"
              >
                Waiting for Host...
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}