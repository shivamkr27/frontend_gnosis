import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../lib/api";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

const optionMap = [
  ["A", "option_a"],
  ["B", "option_b"],
  ["C", "option_c"],
  ["D", "option_d"],
];

export default function ActiveQuiz() {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [timeLeft, setTimeLeft] = useState(20);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [totalXp, setTotalXp] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const question = questions[currentIndex];
  const timerSeconds = question?.timer_seconds || 20;

  const options = useMemo(() => {
    if (!question) return [];
    return optionMap.map(([id, key]) => ({ id, text: question[key] }));
  }, [question]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await api.get(`/content/levels/${levelId}/questions`);
        setQuestions(res.data);
        setTimeLeft(res.data[0]?.timer_seconds || 20);
        setStartTime(Date.now());
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load questions.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [levelId]);

  const goNext = useCallback(
    (nextXp, nextCorrect, nextAnswers) => {
      if (currentIndex >= questions.length - 1) {
        navigate(`/lesson/${levelId}/complete`, {
          state: {
            totalXp: nextXp,
            correctCount: nextCorrect,
            totalQuestions: questions.length,
            answers: nextAnswers,
          },
        });
        return;
      }

      const nextIndex = currentIndex + 1;
      const nextQuestion = questions[nextIndex];
      setCurrentIndex(nextIndex);
      setSelected(null);
      setResult(null);
      setTimeLeft(nextQuestion?.timer_seconds || 20);
      setStartTime(Date.now());
    },
    [currentIndex, levelId, navigate, questions],
  );

  const submitAnswer = useCallback(
    async (optionId) => {
      if (!question || result) return;

      const selectedOptions = optionId ? [optionId] : [];
      const timeTakenMs = Date.now() - startTime;
      setSelected(optionId || "timeout");

      try {
        const res = await api.post(`/content/levels/${levelId}/answer`, {
          questionId: question.id,
          selectedOptions,
          timeTakenMs,
        });

        const answerResult = res.data;
        setResult(answerResult);

        const nextXp = totalXp + (answerResult.xpEarned || 0);
        const nextCorrect = correctCount + (answerResult.correct ? 1 : 0);
        const nextAnswers = [
          ...answers,
          {
            question,
            selectedOptions,
            ...answerResult,
          },
        ];

        setTotalXp(nextXp);
        setCorrectCount(nextCorrect);
        setAnswers(nextAnswers);
        setTimeout(() => goNext(nextXp, nextCorrect, nextAnswers), 1200);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to submit answer.");
      }
    },
    [
      answers,
      correctCount,
      goNext,
      levelId,
      question,
      result,
      startTime,
      totalXp,
    ],
  );

  useEffect(() => {
    if (!question || result) return;
    if (timeLeft <= 0) {
      submitAnswer(null);
      return;
    }

    const timer = setTimeout(() => setTimeLeft((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [question, result, submitAnswer, timeLeft]);

  if (loading) {
    return (
      <Layout>
        <div className="flex h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </Layout>
    );
  }

  if (error || !question) {
    return (
      <Layout>
        <div className="mx-auto max-w-xl p-8 text-center font-bold text-error">
          {error || "No questions found for this level."}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mx-auto flex h-[90vh] max-w-3xl flex-col p-4 md:p-8">
        <div className="mb-8 flex items-center justify-between rounded-2xl border border-surface-variant bg-white p-4 shadow-sm">
          <div className="flex flex-col">
            <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
              Question {currentIndex + 1}/{questions.length}
            </span>
            <span className="font-bold text-inverse-surface">
              {question.question_type}
            </span>
          </div>

          <div className="flex items-center gap-2 font-bold text-secondary">
            <Trophy className="h-5 w-5" /> {totalXp} XP
          </div>
        </div>

        <div className="mb-8 h-2 w-full overflow-hidden rounded-full bg-surface-container">
          <motion.div
            animate={{ width: `${(timeLeft / timerSeconds) * 100}%` }}
            transition={{ duration: 0.4, ease: "linear" }}
            className={`h-full ${timeLeft <= 3 ? "bg-error" : "bg-primary"}`}
          />
        </div>

        <div className="flex flex-1 flex-col justify-center">
          <h2 className="mb-10 text-center text-2xl font-bold leading-relaxed text-inverse-surface md:text-3xl">
            {question.question_text}
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {options.map((opt) => {
              const isCorrect = result?.correctOptions?.includes(opt.id);
              const isSelected = selected === opt.id;
              let stateClass =
                "border-surface-variant bg-white text-inverse-surface hover:border-primary/50";

              if (result) {
                if (isCorrect) {
                  stateClass = "border-green-500 bg-green-100 text-green-900";
                } else if (isSelected) {
                  stateClass =
                    "border-error bg-error-container text-on-error-container";
                } else {
                  stateClass = "border-surface-variant bg-surface opacity-60";
                }
              }

              return (
                <button
                  key={opt.id}
                  disabled={Boolean(result)}
                  onClick={() => submitAnswer(opt.id)}
                  className={`rounded-2xl border-2 p-6 text-left text-lg font-bold transition-all ${stateClass} ${
                    !result ? "shadow-sm hover:-translate-y-1 hover:shadow-md" : ""
                  }`}
                >
                  <span className="mr-4 inline-block h-8 w-8 rounded-lg bg-surface-variant/50 text-center text-sm leading-8 text-on-surface-variant">
                    {opt.id}
                  </span>
                  {opt.text}
                </button>
              );
            })}
          </div>

          {result && (
            <div
              className={`mt-6 rounded-2xl p-4 font-semibold ${
                result.correct
                  ? "bg-green-100 text-green-900"
                  : "bg-error-container text-on-error-container"
              }`}
            >
              {result.correct ? "Correct" : "Wrong"} · +{result.xpEarned} XP
              {!result.correct && (
                <span> · Correct: {result.correctOptions?.join(", ")}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
