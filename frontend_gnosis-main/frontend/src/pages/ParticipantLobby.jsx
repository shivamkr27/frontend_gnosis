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
      <div className="mx-auto flex min-h-[80vh] max-w-4xl flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-2xl rounded-[2rem] border border-surface-variant bg-white p-8 text-center shadow-soft md:p-12">
          <h2 className="mb-2 text-xl font-bold uppercase tracking-widest text-on-surface-variant">
            {quizName || "Room Code"}
          </h2>
          <div className="mb-8 flex items-center justify-center gap-3">
            <span className="rounded-2xl border-4 border-primary/20 bg-primary-fixed px-6 py-2 text-5xl font-bold tracking-widest text-primary md:text-6xl">
              {code}
            </span>
            <button
              onClick={() => navigator.clipboard?.writeText(code)}
              className="rounded-xl bg-surface p-3 text-primary"
            >
              <Copy className="h-5 w-5" />
            </button>
          </div>

          {error && <p className="mb-4 font-bold text-error">{error}</p>}
          {starting && (
            <p className="mb-4 rounded-full bg-primary-fixed px-4 py-2 font-bold text-primary">
              Quiz starting...
            </p>
          )}

          <div className="text-left">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-inverse-surface">
              <Users className="h-5 w-5 text-secondary" /> Participants (
              {players.length})
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {players.map((player) => (
                <div
                  key={player.userId}
                  className="flex items-center gap-3 rounded-xl border border-surface-variant bg-surface p-3"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-tertiary-container text-xs font-bold uppercase text-white">
                    {player.username?.substring(0, 2)}
                  </div>
                  <span className="truncate text-sm font-bold">
                    {player.username}
                  </span>
                </div>
              ))}
              {players.length === 0 && (
                <p className="text-sm font-semibold text-on-surface-variant">Waiting for players...</p>
              )}
            </div>
          </div>

          {isHost && (
            <button
              onClick={startQuiz}
              disabled={players.length < 1}
              className="mt-10 w-full rounded-xl bg-primary py-4 text-lg font-bold text-white shadow-soft disabled:opacity-50"
            >
              Start Game
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
}
