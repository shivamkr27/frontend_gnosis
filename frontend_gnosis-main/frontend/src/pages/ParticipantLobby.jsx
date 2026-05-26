import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useAuthStore } from "../lib/store";
import { createSocket } from "../lib/socket";
import { Users, Copy, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    const isWinner = results.top3 && results.top3[0]?.userId === user?.id;
    
    return (
      <Layout>
        <div className="mx-auto flex min-h-[80vh] max-w-2xl flex-col justify-center p-4 md:p-8">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="rounded-[2.5rem] border-2 border-[#E8DFD1] bg-white p-10 text-center shadow-xl"
          >
            <div className="mb-8 relative inline-block">
               <div className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-4 ${isWinner ? 'bg-[#FFF4E5]' : 'bg-[#F5F5F5]'}`}>
                  <Trophy className={`w-16 h-16 ${isWinner ? 'text-[#D4641A]' : 'text-[#8a8a8a]'}`} />
               </div>
               {isWinner && (
                 <motion.div 
                   initial={{ y: 10, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ delay: 0.3 }}
                   className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#8B2500] text-white px-5 py-1.5 rounded-full font-black text-sm shadow-md whitespace-nowrap"
                 >
                   VICTORY!
                 </motion.div>
               )}
            </div>

            <h1 className="mb-0 text-3xl font-black text-[#1a1a1a]">
              Battle Results
            </h1>
            <p className="text-[#6b6b6b] mb-8 font-medium">Top performance in the Arena</p>
            
            <div className="space-y-3 mb-10">
              {(results.top3 || []).map((player, index) => (
                <motion.div
                  key={player.userId}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className={`flex items-center justify-between rounded-2xl p-4 border-2 ${
                    player.userId === user?.id 
                      ? "border-[#D4641A] bg-[#FFF8F0]" 
                      : "border-[#F0EDE8] bg-[#FAF7F2]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs ${
                      index === 0 ? "bg-[#D4641A] text-white" : "bg-[#E8DFD1] text-[#6b6b6b]"
                    }`}>
                      {index + 1}
                    </span>
                    <span className="font-bold text-base text-[#1a1a1a]">
                      {player.username} {player.userId === user?.id && "(You)"}
                    </span>
                  </div>
                  <span className="font-black text-lg text-[#8B2500]">{player.score} XP</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
               <button
                  onClick={() => navigate("/battle")}
                  className="flex-1 rounded-xl border-2 border-[#E8DFD1] py-3.5 font-black text-[#6b6b6b] hover:bg-[#FAF7F2] transition-colors flex items-center justify-center gap-2"
                >
                  <Home className="w-5 h-5" /> Back to Arena
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="flex-1 rounded-xl bg-gradient-to-r from-[#D4641A] to-[#8B2500] py-3.5 font-black text-white shadow-lg shadow-orange-900/10 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" /> Play Again
                </button>
            </div>
          </motion.div>
        </div>
      </Layout>
    );
  }

  if (question) {
    return (
      <Layout>
        <div className="mx-auto max-w-4xl px-4 py-8 md:px-8">
          <div className="mb-8 flex items-center justify-between rounded-3xl border border-[#E8DFD1] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-[#FFF4E5] rounded-xl flex items-center justify-center text-[#D4641A] font-bold">
                  {questionPayload.qIndex}
               </div>
               <div>
                  <p className="text-[10px] font-bold text-[#8a8a8a] uppercase tracking-wider">Question</p>
                  <p className="text-sm font-bold text-[#1a1a1a]">{questionPayload.qIndex} of {questionPayload.total}</p>
               </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {players.map((p, i) => (
                   <div key={p.userId} className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white uppercase shadow-sm ${i === 0 ? 'bg-[#8B2500]' : 'bg-[#D4641A]'}`}>
                      {p.username.substring(0, 2)}
                   </div>
                ))}
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-[#F0C090] flex items-center justify-center text-lg font-black text-[#8B2500] shadow-sm bg-white">
                {questionPayload.timerSeconds}
              </div>
            </div>
          </div>

          <motion.h1 
            key={question.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 text-center text-3xl md:text-4xl font-extrabold text-[#1a1a1a] leading-tight"
          >
            {question.question_text}
          </motion.h1>

          <div className="grid gap-4 sm:grid-cols-2">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => submitAnswer(option.id)}
                disabled={Boolean(selected)}
                className={`relative group rounded-3xl border-2 p-6 text-left transition-all duration-200 ${
                  selected === option.id
                    ? "border-[#8B2500] bg-[#FFF4E5] shadow-md ring-2 ring-[#8B2500]/10"
                    : "border-[#E8DFD1] bg-white hover:border-[#F0C090] hover:bg-[#FAF7F2] shadow-sm"
                } disabled:opacity-80`}
              >
                <span className={`mr-4 inline-flex h-9 w-9 items-center justify-center rounded-xl font-bold transition-colors ${
                    selected === option.id ? "bg-[#8B2500] text-white" : "bg-[#FAF7F2] text-[#8B2500]"
                }`}>
                  {option.id}
                </span>
                <span className="text-lg font-bold text-[#1a1a1a]">{option.text}</span>
              </button>
            ))}
          </div>

          <AnimatePresence>
            {answerResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-8 rounded-3xl p-6 border-2 ${
                  answerResult.correct
                    ? "bg-[#EAF6EA] border-[#4CAF50] text-[#1B5E20]"
                    : "bg-[#FFF0F0] border-[#FF5252] text-[#B71C1C]"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                    {answerResult.correct ? (
                        <div className="w-6 h-6 rounded-full bg-[#4CAF50] text-white flex items-center justify-center"><CheckCircle2 className="w-4 h-4" /></div>
                    ) : (
                        <div className="w-6 h-6 rounded-full bg-[#FF5252] text-white flex items-center justify-center text-xs font-bold">X</div>
                    )}
                    <span className="font-black text-xl">{answerResult.correct ? "Spot on!" : "Keep going!"}</span>
                    <span className="ml-auto font-bold bg-white/50 px-3 py-1 rounded-full">+{answerResult.xpEarned || 0} XP</span>
                </div>
                {answerResult.explanation && (
                  <p className="text-sm font-medium leading-relaxed opacity-90">{answerResult.explanation}</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mx-auto flex min-h-[80vh] max-w-4xl flex-col items-center justify-center p-4 md:p-8">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-xl rounded-[2.5rem] border-2 border-[#E8DFD1] bg-white p-10 text-center shadow-xl md:p-14"
        >
          <div className="mb-6">
            <span className="inline-block px-4 py-1.5 bg-[#FFF4E5] text-[#D4641A] rounded-full text-xs font-black uppercase tracking-widest mb-4">
              {quizName || "Battle Arena"}
            </span>
            <h2 className="text-3xl font-black text-[#1a1a1a] mb-2">Room Lobby</h2>
            <p className="text-[#6b6b6b] font-medium">Waiting for players to join the duel</p>
          </div>

          <div className="mb-10 flex flex-col items-center gap-4">
            <div className="relative group cursor-pointer" onClick={() => navigator.clipboard?.writeText(code)}>
              <span className="inline-block rounded-[1.5rem] border-2 border-dashed border-[#D4641A] bg-[#FFF8F0] px-10 py-4 text-5xl font-black tracking-[0.2em] text-[#8B2500] md:text-6xl transition-transform hover:scale-105">
                {code}
              </span>
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-white border-2 border-[#E8DFD1] rounded-full flex items-center justify-center text-[#D4641A] shadow-sm">
                <Copy className="h-4 w-4" />
              </div>
            </div>
            <p className="text-[10px] text-[#8a8a8a] font-bold uppercase tracking-widest leading-none">Tap to copy code</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-bold animate-pulse">
              {error}
            </div>
          )}

          {starting && (
             <motion.div 
               initial={{ y: 5, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               className="mb-8 p-4 bg-gradient-to-r from-[#D4641A] to-[#8B2500] rounded-2xl flex items-center justify-center gap-3 text-white shadow-lg"
             >
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                <span className="font-black text-lg">Battle starting...</span>
             </motion.div>
          )}

          <div className="text-left w-full">
            <div className="flex items-center justify-between mb-5 px-1">
                <h3 className="flex items-center gap-2 text-base font-black text-[#1a1a1a]">
                  <Users className="h-5 w-5 text-[#D4641A]" /> 
                  Players Joined
                </h3>
                <span className="bg-[#FAF7F2] px-3 py-1 rounded-full border border-[#E8DFD1] text-xs font-bold text-[#8B2500]">
                    {players.length} / 2
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {players.map((player, idx) => (
                <motion.div
                  key={player.userId}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-3 rounded-2xl border-2 border-[#F0EDE8] bg-[#FAF7F2] p-4 group"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#8B2500] text-sm font-black uppercase text-white shadow-sm ring-2 ring-white">
                    {player.username?.substring(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[#1a1a1a] truncate">{player.username}</p>
                    <p className="text-[10px] font-bold text-[#4CAF50] uppercase tracking-wider">Ready</p>
                  </div>
                </motion.div>
              ))}
              {players.length === 0 && (
                <p className="text-sm font-semibold text-on-surface-variant">Waiting for players...</p>
              )}
            </div>
          </div>

          {isHost && !starting && (
            <button
               onClick={startQuiz}
               disabled={players.length < 1}
               className="w-full rounded-2xl bg-gradient-to-r from-[#D4641A] to-[#8B2500] py-5 font-black text-white shadow-xl shadow-orange-900/10 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
             >
               Start Game Manually
             </button>
          )}
        </motion.div>
      </div>
    </Layout>
  );
}
