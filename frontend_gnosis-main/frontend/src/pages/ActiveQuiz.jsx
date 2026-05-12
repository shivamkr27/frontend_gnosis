import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, X, CheckCircle, XCircle } from "lucide-react";
import useAuthStore from "../store/authStore";

const optionMap = [
  ["A", "option_a"],
  ["B", "option_b"],
  ["C", "option_c"],
  ["D", "option_d"],
];

export default function ActiveQuiz() {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [timeLeft, setTimeLeft] = useState(20);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [result, setResult] = useState(null);

  // XP Tracking
  const [initialTotalXp, setInitialTotalXp] = useState(0);
  const [sessionXp, setSessionXp] = useState(0);

  const [correctCount, setCorrectCount] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const question = questions[currentIndex];
  const timerSeconds = question?.timer_seconds || 20;
  const isMultiCorrect = question?.question_type === "multi_correct";

  const options = useMemo(() => {
    if (!question) return [];
    return optionMap.map(([id, key]) => ({ id, text: question[key] }));
  }, [question]);

  // Fetch Questions and Initial XP
  useEffect(() => {
    const initQuiz = async () => {
      try {
        // Fetch current XP and questions in parallel
        const [userRes, qRes] = await Promise.all([
          api.get("/auth/me"),
          api.get(`/content/levels/${levelId}/questions`),
        ]);

        setInitialTotalXp(userRes.data.xp || 0);

        if (qRes.data.length === 0) {
          setError("No questions found for this level.");
          return;
        }

        setQuestions(qRes.data);
        setTimeLeft(qRes.data[0]?.timer_seconds || 20);
        setStartTime(Date.now());
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load quiz.");
      } finally {
        setLoading(false);
      }
    };

    initQuiz();
  }, [levelId]);

  const handleNext = useCallback(() => {
    if (currentIndex >= questions.length - 1) {
      // End of quiz - transition to complete page
      navigate(`/lesson/${levelId}/complete`, {
        state: {
          totalXp: sessionXp,
          correctCount,
          totalQuestions: questions.length,
          answers,
        },
      });
      return;
    }

    const nextIndex = currentIndex + 1;
    const nextQuestion = questions[nextIndex];
    setCurrentIndex(nextIndex);
    setSelectedOptions([]);
    setResult(null);
    setTimeLeft(nextQuestion?.timer_seconds || 20);
    setStartTime(Date.now());
  }, [
    currentIndex,
    levelId,
    navigate,
    questions,
    sessionXp,
    correctCount,
    answers,
  ]);

  const submitAnswer = useCallback(
    async (finalSelectedOptions) => {
      if (!question || result || isSubmitting) return;
      setIsSubmitting(true);

      const timeTakenMs = Date.now() - startTime;

      try {
        const res = await api.post(
          `/content/levels/${levelId}/answer`,
          {
            questionId: question.id,
            selectedOptions: finalSelectedOptions,
            timeTakenMs,
          },
          {
            headers: {
              "x-question-sent-at": startTime.toString(),
              "x-timer-seconds": timerSeconds.toString(),
            },
          },
        );

        const answerResult = res.data;
        setResult(answerResult);

        if (answerResult.correct) {
          setSessionXp((prev) => prev + (answerResult.xpEarned || 0));
          setCorrectCount((prev) => prev + 1);
        }

        setAnswers((prev) => [
          ...prev,
          {
            question,
            selectedOptions: finalSelectedOptions,
            ...answerResult,
          },
        ]);
      } catch (err) {
        console.error("Submit answer error:", err);
        // Even on error, we must move forward to prevent getting stuck
        setResult({
          correct: false,
          correctOptions: [],
          explanation: "Error validating answer.",
          xpEarned: 0,
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [levelId, question, result, startTime, timerSeconds, isSubmitting],
  );

  // Timer Effect
  useEffect(() => {
    if (!question || result || isSubmitting) return;
    if (timeLeft <= 0) {
      submitAnswer(selectedOptions); // Auto-submit on timeout
      return;
    }

    const timer = setTimeout(() => setTimeLeft((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [question, result, submitAnswer, timeLeft, selectedOptions, isSubmitting]);

  const toggleOption = (optId) => {
    if (result || isSubmitting) return;

    if (isMultiCorrect) {
      setSelectedOptions((prev) =>
        prev.includes(optId)
          ? prev.filter((id) => id !== optId)
          : [...prev, optId],
      );
    } else {
      setSelectedOptions([optId]);
      submitAnswer([optId]); // Instant submit for single choice
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#EFEEE8]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#C1B29E] border-t-transparent" />
      </div>
    );
  }

  if (error || !question) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#EFEEE8] p-8">
        <div className="max-w-xl text-center font-bold text-red-500">
          {error || "No questions found for this level."}
          <button
            onClick={() => navigate(-1)}
            className="mt-4 block w-full rounded-2xl bg-[#B0681B] py-3 text-white"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const currentTotalXp = initialTotalXp + sessionXp;
  const progressPercentage = (currentIndex / questions.length) * 100;

  return (
    <div className="flex h-screen flex-col bg-[#EFEEE8] font-sans">
      {/* Header */}
      <header className="flex w-full items-center justify-between px-6 py-4">
        <button
          onClick={() => navigate(-1)}
          className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-200"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="flex flex-1 items-center px-8">
          <div className="mr-4 text-sm font-bold text-gray-500 whitespace-nowrap">
            Question {currentIndex + 1} of {questions.length}
          </div>
          <div className="relative flex-1 h-3 rounded-full bg-gray-300 overflow-hidden">
            <motion.div
              initial={{
                width: `${((currentIndex - 1) / questions.length) * 100}%`,
              }}
              animate={{ width: `${progressPercentage}%` }}
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#A67B46] to-[#6A4E2B] rounded-full"
            />
          </div>
          <div className="ml-4 text-sm font-bold text-gray-500 whitespace-nowrap">
            {Math.round(progressPercentage)}% Complete
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-xl bg-[#E3D9CC] px-4 py-2 font-bold text-[#A67B46]">
            <Trophy className="h-5 w-5" /> {currentTotalXp}
          </div>
          <button
            onClick={() => navigate(-1)}
            className="font-bold text-gray-500 hover:text-gray-700 uppercase text-sm"
          >
            Quit
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative flex flex-1 items-center justify-center px-4 overflow-hidden">
        {/* Background Decor (Matching image style) */}
        <div className="absolute top-[-10%] right-[-10%] h-[600px] w-[600px] rounded-full bg-[#E3D9CC] opacity-50 blur-3xl z-0 pointer-events-none" />

        <div className="z-10 w-full max-w-4xl pt-8 pb-32">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col items-center"
          >
            <h2 className="mb-12 text-center text-3xl md:text-4xl font-extrabold text-[#3D3A36] leading-tight">
              {question.question_text}
            </h2>

            {/* Timer Bar */}
            <div className="mb-8 w-full max-w-xl h-2 rounded-full bg-gray-300 overflow-hidden">
              <motion.div
                key={`timer-${currentIndex}`}
                initial={{ width: "100%" }}
                animate={{ width: `${(timeLeft / timerSeconds) * 100}%` }}
                transition={{ duration: 1, ease: "linear" }}
                className={`h-full ${timeLeft <= 5 ? "bg-red-500" : "bg-[#B0681B]"}`}
              />
            </div>

            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
              {options.map((opt) => {
                const isSelected = selectedOptions.includes(opt.id);
                let stateClass =
                  "border-[#C1B29E] bg-[#FAFAF8] text-[#3D3A36] hover:bg-[#F0EBE1] hover:border-[#A67B46]";

                if (isSelected) {
                  stateClass =
                    "border-[#B0681B] bg-[#F5EDDF] text-[#B0681B] ring-2 ring-[#B0681B]/20";
                }

                return (
                  <button
                    key={opt.id}
                    disabled={Boolean(result) || isSubmitting}
                    onClick={() => toggleOption(opt.id)}
                    className={`relative flex min-h-[100px] items-center rounded-2xl border-2 p-6 transition-all duration-200 ${stateClass} ${
                      !result && !isSubmitting
                        ? "active:scale-[0.98] shadow-sm hover:shadow-md"
                        : "opacity-80 cursor-not-allowed"
                    }`}
                  >
                    <span className="mr-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E3D9CC] text-sm font-bold text-[#A67B46]">
                      {opt.id}
                    </span>
                    <span className="text-left text-lg font-bold leading-snug">
                      {opt.text}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Multi-correct submit button */}
            {isMultiCorrect && !result && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                disabled={selectedOptions.length === 0 || isSubmitting}
                onClick={() => submitAnswer(selectedOptions)}
                className="mt-8 rounded-full bg-[#B0681B] px-12 py-4 font-bold text-white shadow-lg transition hover:bg-[#8e5212] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Checking..." : "Submit Answer"}
              </motion.button>
            )}
          </motion.div>
        </div>
      </main>

      {/* Result Modal Overlay */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-lg rounded-[2rem] bg-white p-8 shadow-2xl relative overflow-hidden"
            >
              {/* Decorative background circle */}
              <div
                className={`absolute top-[-50px] right-[-50px] h-40 w-40 rounded-full blur-2xl opacity-20 pointer-events-none ${result.correct ? "bg-green-500" : "bg-red-500"}`}
              />

              <div className="flex flex-col items-center text-center">
                <div
                  className={`mb-6 flex h-20 w-20 items-center justify-center rounded-full ${result.correct ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
                >
                  {result.correct ? (
                    <CheckCircle className="h-10 w-10" />
                  ) : (
                    <XCircle className="h-10 w-10" />
                  )}
                </div>

                <h3 className="mb-2 text-2xl font-extrabold text-[#3D3A36]">
                  {result.correct ? "Excellent Work!" : "Not Quite Right"}
                </h3>

                <p className="mb-6 text-[#6B655B] text-lg">
                  {result.explanation ||
                    (result.correct
                      ? "Great job on getting that one right!"
                      : "Review the concepts and try again later.")}
                </p>

                {!result.correct && result.correctOptions && (
                  <div className="mb-6 w-full rounded-xl bg-gray-100 p-4">
                    <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                      Correct Answer
                    </span>
                    <p className="mt-1 font-bold text-[#3D3A36]">
                      {result.correctOptions
                        .map(
                          (opt) =>
                            `${opt}: ${question[`option_${opt.toLowerCase()}`]}`,
                        )
                        .join(" | ")}
                    </p>
                  </div>
                )}

                {result.correct && (
                  <div className="mb-8 flex items-center justify-center gap-2 font-bold text-[#B0681B]">
                    You've earned{" "}
                    <span className="text-xl">+{result.xpEarned} XP</span>
                  </div>
                )}

                <button
                  onClick={handleNext}
                  className="w-full rounded-full bg-[#D48C2B] py-4 text-xl font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
