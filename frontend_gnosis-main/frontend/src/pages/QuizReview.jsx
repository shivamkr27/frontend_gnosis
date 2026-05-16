import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../lib/api";
import { useAuthStore, useSocketStore } from "../lib/store";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Trophy,
  XCircle,
} from "lucide-react";

const optionLabels = {
  A: "option_a",
  B: "option_b",
  C: "option_c",
  D: "option_d",
};

export default function QuizReview() {
  const { levelId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [levelInfo, setLevelInfo] = useState(null);
  const [subjectInfo, setSubjectInfo] = useState(null);
  const [answers, setAnswers] = useState(state?.answers || []);

  const { user } = useAuthStore();
  const { addNotification } = useSocketStore();

  const [loadingAnswers, setLoadingAnswers] = useState(
    !state?.answers || state.answers.length === 0
  );

  const [retaking, setRetaking] = useState(false);

  const breadcrumbSubject =
    state?.subjectName ||
    subjectInfo?.name ||
    levelInfo?.subject?.name ||
    "Subject";

  const breadcrumbModule =
    state?.moduleName ||
    (levelInfo?.level_number
      ? `Level ${levelInfo.level_number}`
      : null) ||
    levelInfo?.topic ||
    levelInfo?.name ||
    "Module";

  const fallbackSubjectId =
    state?.subjectId || levelInfo?.subject_id;

  const correctCount = answers.filter(
    (answer) => answer.correct
  ).length;

  const performancePercent = answers.length
    ? Math.round((correctCount / answers.length) * 100)
    : 0;

  const totalSeconds = Math.max(
    1,
    Math.round(answers.length * 12.4)
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/content/levels/${levelId}`);
        setLevelInfo(res.data);

        let subId = res.data.subject_id;

        if (subId) {
          const subRes = await api.get(
            `/content/subjects/${subId}`
          );

          setSubjectInfo(subRes.data);
        }

        // Fetch historical answers if we didn't receive them in state
        if (answers.length === 0 && user?.id && subId) {
          try {
            const progRes = await api.get(
              `/progress/${user.id}/subject/${subId}`
            );

            const progressLevel = progRes.data.levels.find(
              (pl) => pl.level_id === levelId
            );

            if (
              progressLevel &&
              progressLevel.answers &&
              progressLevel.answers.length > 0
            ) {
              setAnswers(progressLevel.answers);
            }
          } catch (progErr) {
            console.error(
              "Failed to fetch historical answers",
              progErr
            );
          }
        }
      } catch (err) {
        console.error("Failed to fetch level info", err);
      } finally {
        setLoadingAnswers(false);
      }
    };

    if (levelId) fetchData();
  }, [levelId, user?.id]);

  // Handle Retake Logic
  const handleRetake = async () => {
    if (retaking || !user?.id) return;

    const confirmRetake = window.confirm(
      "Retaking this module will reset your previous progress. Your new score will be updated. Do you want to continue?"
    );

    if (!confirmRetake) return;

    setRetaking(true);

    addNotification({
      id: Date.now() + "-retake",
      message: "Resetting progress for retake...",
      source: "local",
      type: "info",
      duration: 3000,
    });

    try {
      const targetSubjectId =
        fallbackSubjectId ||
        subjectInfo?.id ||
        levelInfo?.subject_id;

      await api.post("/progress/reset-level", {
        userId: user.id,
        subjectId: targetSubjectId,
        levelId: levelId,
      });

      navigate(`/lesson/${levelId}`);
    } catch (err) {
      console.error("Failed to reset progress:", err);

      addNotification({
        id: Date.now() + "-error",
        message: "Failed to start retake. Please try again.",
        source: "local",
        type: "error",
        duration: 3000,
      });

      setRetaking(false);
    }
  };

  return (
    <Layout>
      <div className="mx-auto max-w-5xl px-4 py-4 md:px-6 md:py-6">
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#2F2C28]">
              Quiz Review
            </h1>

            <p className="mt-2 text-sm font-semibold text-[#7a6d60]">
              {breadcrumbSubject} &gt;&gt; {breadcrumbModule}
            </p>

            <p className="text-sm md:text-base font-semibold text-[#7a6d60] mt-2">
              {answers.length} answered questions
            </p>
          </div>

          <div className="flex items-center gap-3">
            {answers.length > 0 && (
              <button
                onClick={handleRetake}
                disabled={retaking}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#A34714] text-white font-bold text-sm transition-all hover:bg-[#8f3f11] hover:shadow-sm disabled:opacity-50"
              >
                {retaking ? "Resetting..." : "Retake Module"}
              </button>
            )}

            <button
              onClick={() => {
                if (fallbackSubjectId) {
                  navigate(`/subject/${fallbackSubjectId}`);
                  return;
                }

                navigate(-1);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-[#A34714] text-[#A34714] font-bold text-sm transition-all hover:bg-[#FFF4E5] hover:shadow-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Module
            </button>
          </div>
        </div>

        <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_220px]">
          <div className="rounded-3xl border border-[#E6D8C4] bg-white p-4 md:p-5 shadow-sm flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#7a6d60]">
                Your Performance
              </p>

              <p className="text-4xl md:text-5xl font-extrabold text-[#A34714] leading-none mt-1">
                {performancePercent}%
              </p>
            </div>

            <div className="relative h-24 w-24 flex-shrink-0">
              <svg
                className="h-24 w-24 transform -rotate-90"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#E6D8C4"
                  strokeWidth="8"
                />

                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#A34714"
                  strokeWidth="8"
                  strokeDasharray={`${
                    performancePercent * 2.827
                  } 282.7`}
                  strokeLinecap="round"
                />
              </svg>

              <div className="absolute inset-0 flex items-center justify-center">
                <Trophy className="h-8 w-8 text-[#A34714]" />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#A34714] bg-[#A34714] p-4 md:p-5 text-white shadow-sm flex flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-wider text-[#F6D6B0]">
              Time Spent
            </p>

            <p className="mt-1 text-3xl md:text-4xl font-extrabold leading-none">
              {Math.floor(totalSeconds / 60)}:
              {String(totalSeconds % 60).padStart(2, "0")}
            </p>
          </div>
        </div>

        {answers.length === 0 ? (
          <div className="rounded-3xl border border-[#E6D8C4] bg-white p-6 text-center font-semibold text-[#7a6d60] shadow-sm">
            {loadingAnswers ? (
              <p>Loading historical review data...</p>
            ) : (
              <p>No review data found for this attempt.</p>
            )}

            <p className="mt-2 text-sm font-medium text-[#8a8a8a]">
              Open this screen from the completion page to see
              answer-by-answer review.
            </p>

            {levelId && (
              <button
                onClick={handleRetake}
                disabled={retaking}
                className="mt-4 inline-flex items-center justify-center rounded-xl bg-[#A34714] px-4 py-2 text-sm font-bold text-white hover:bg-[#8f3f11]"
              >
                Retake Module
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-5">
            {answers.map((answer, index) => {
              const selected =
                answer.selectedOptions || [];

              const correct =
                answer.correctOptions || [];

              return (
                <div
                  key={
                    answer.questionId ||
                    answer.question?.id ||
                    index
                  }
                  className={`rounded-[28px] border bg-white p-4 md:p-5 shadow-sm ${
                    answer.correct
                      ? "border-[#2E9E57]"
                      : "border-[#E0B8B8]"
                  }`}
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      {answer.correct ? (
                        <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-[#2E9E57]" />
                      ) : (
                        <XCircle className="mt-1 h-5 w-5 flex-shrink-0 text-[#C95A4B]" />
                      )}

                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[#9A8C7C]">
                          Question {index + 1}
                        </p>

                        <h2 className="text-xl md:text-2xl font-extrabold text-[#2F2C28] leading-snug">
                          {answer.question?.question_text}
                        </h2>
                      </div>
                    </div>

                    <span
                      className={`text-xs font-bold uppercase tracking-wider ${
                        answer.correct
                          ? "text-[#2E9E57]"
                          : "text-[#C95A4B]"
                      }`}
                    >
                      {answer.correct
                        ? "Correct"
                        : "Wrong"}
                    </span>
                  </div>

                  <div className="mb-4 grid gap-3 sm:grid-cols-2">
                    {Object.entries(optionLabels).map(
                      ([label, key]) => {
                        const isSelected =
                          selected.includes(label);

                        const isCorrect =
                          correct.includes(label);

                        const stateClass = isCorrect
                          ? "border-[#2E9E57] bg-[#EAF7EE] text-[#1F4E30]"
                          : isSelected
                          ? "border-[#D9B08C] bg-[#FBF0E3] text-[#8B4B12]"
                          : "border-[#E5DED3] bg-[#FBFAF8] text-[#6e675f]";

                        return (
                          <div
                            key={label}
                            className={`rounded-2xl border-2 p-3 md:p-4 font-semibold ${stateClass}`}
                          >
                            <span
                              className={`mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold ${
                                isCorrect
                                  ? "bg-[#2E9E57] text-white"
                                  : isSelected
                                  ? "bg-[#D58E3D] text-white"
                                  : "bg-white text-[#7a6d60]"
                              }`}
                            >
                              {label}
                            </span>

                            {answer.question?.[key]}
                          </div>
                        );
                      }
                    )}
                  </div>

                  <div className="rounded-2xl border border-[#E8DFD1] bg-[#FBF7F0] p-4 font-semibold text-[#5a5349]">
                    <p>
                      Your answer:{" "}
                      {selected.length
                        ? selected.join(", ")
                        : "No answer"}
                    </p>

                    <p>
                      Correct answer:{" "}
                      {correct.join(", ")}
                    </p>

                    {answer.explanation && (
                      <p className="mt-2 text-[#2F2C28]">
                        {answer.explanation}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}