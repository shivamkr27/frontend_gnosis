import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";

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
  const answers = state?.answers || [];

  return (
    <Layout>
      <div className="mx-auto max-w-4xl p-4 md:p-8">
        <button
          onClick={() => navigate(`/lesson/${levelId}/complete`, { state })}
          className="mb-8 flex items-center gap-2 font-bold text-on-surface-variant transition-colors hover:text-inverse-surface"
        >
          <ArrowLeft className="h-5 w-5" /> Back to Results
        </button>

        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-inverse-surface">
            Quiz Review
          </h1>
          <p className="font-semibold text-on-surface-variant">
            {answers.length} answered questions
          </p>
        </div>

        {answers.length === 0 ? (
          <div className="rounded-2xl border border-surface-variant bg-white p-8 text-center font-semibold text-on-surface-variant">
            No review data found for this attempt.
          </div>
        ) : (
          <div className="space-y-4">
            {answers.map((answer, index) => {
              const selected = answer.selectedOptions || [];
              const correct = answer.correctOptions || [];

              return (
                <div
                  key={answer.questionId || answer.question?.id || index}
                  className={`rounded-2xl border bg-white p-6 shadow-sm ${
                    answer.correct ? "border-green-500" : "border-error"
                  }`}
                >
                  <div className="mb-4 flex items-start gap-3">
                    {answer.correct ? (
                      <CheckCircle2 className="mt-1 h-6 w-6 flex-shrink-0 text-green-600" />
                    ) : (
                      <XCircle className="mt-1 h-6 w-6 flex-shrink-0 text-error" />
                    )}
                    <div>
                      <p className="text-sm font-bold uppercase tracking-wider text-on-surface-variant">
                        Question {index + 1}
                      </p>
                      <h2 className="text-xl font-bold text-inverse-surface">
                        {answer.question?.question_text}
                      </h2>
                    </div>
                  </div>

                  <div className="mb-4 grid gap-3 sm:grid-cols-2">
                    {Object.entries(optionLabels).map(([label, key]) => {
                      const isSelected = selected.includes(label);
                      const isCorrect = correct.includes(label);
                      const stateClass = isCorrect
                        ? "border-green-500 bg-green-100 text-green-900"
                        : isSelected
                          ? "border-error bg-error-container text-on-error-container"
                          : "border-surface-variant bg-surface text-on-surface-variant";

                      return (
                        <div
                          key={label}
                          className={`rounded-xl border-2 p-4 font-semibold ${stateClass}`}
                        >
                          <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white/70 text-sm font-bold">
                            {label}
                          </span>
                          {answer.question?.[key]}
                        </div>
                      );
                    })}
                  </div>

                  <div className="rounded-xl bg-surface p-4 font-semibold text-on-surface-variant">
                    <p>
                      Your answer: {selected.length ? selected.join(", ") : "No answer"}
                    </p>
                    <p>Correct answer: {correct.join(", ")}</p>
                    {answer.explanation && (
                      <p className="mt-2 text-inverse-surface">
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
