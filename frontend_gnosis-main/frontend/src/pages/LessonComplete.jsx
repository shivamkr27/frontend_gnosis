import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../lib/api";
import { useAuthStore } from "../lib/store";
import { ArrowRight, Award, Flame, ListChecks, Trophy } from "lucide-react";

export default function LessonComplete() {
  const { levelId } = useParams();
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();
  const [streak, setStreak] = useState(null);
  const [status, setStatus] = useState("Saving progress...");
  const savedRef = useRef(false);

  const totalXp = Number(state?.totalXp || 0);
  const correctCount = Number(state?.correctCount || 0);
  const totalQuestions = Number(state?.totalQuestions || 10);
  const hasAnswers = Array.isArray(state?.answers) && state.answers.length > 0;

  useEffect(() => {
    if (state?.saved) {
      setStatus("Progress saved");
      return;
    }

    if (!user || !levelId || savedRef.current) return;
    savedRef.current = true;

    const saveCompletion = async () => {
      try {
        const levelRes = await api.get(`/content/levels/${levelId}`);
        const subjectId = levelRes.data.subject_id;

        await api.post("/xp/award", {
          userId: user.id,
          username: user.username,
          amount: totalXp,
          source: "lesson",
          scope: "global",
        });

        await api.post("/progress/complete-level", {
          userId: user.id,
          levelId,
          subjectId,
          xpEarned: totalXp,
        });

        const [streakRes, meRes] = await Promise.all([
          api.get(`/progress/${user.id}/streak`),
          api.get("/auth/me"),
        ]);
        setStreak(streakRes.data);
        setUser(meRes.data);
        setStatus("Progress saved");
        navigate(`/lesson/${levelId}/complete`, {
          replace: true,
          state: { ...state, saved: true },
        });
      } catch (err) {
        setStatus(err.response?.data?.error || "Could not save progress");
      }
    };

    saveCompletion();
  }, [levelId, navigate, setUser, state, totalXp, user]);

  return (
    <Layout>
      <div className="flex min-h-screen items-center justify-center p-8">
        <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-surface-variant bg-white p-10 text-center shadow-xl">
          <div className="relative z-10">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary-fixed text-primary">
              <Award size={48} />
            </div>

            <h1 className="mb-2 text-4xl font-bold text-inverse-surface">
              Lesson Complete
            </h1>
            <p className="mb-8 text-lg text-on-surface-variant">{status}</p>

            <div className="mx-auto mb-8 grid max-w-md grid-cols-2 gap-4">
              <div className="rounded-2xl border border-surface-variant bg-surface p-5">
                <Trophy className="mx-auto mb-2 h-6 w-6 text-secondary" />
                <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  XP Earned
                </p>
                <p className="text-3xl font-black text-primary">+{totalXp}</p>
              </div>

              <div className="rounded-2xl border border-surface-variant bg-surface p-5">
                <Flame className="mx-auto mb-2 h-6 w-6 text-primary" />
                <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Streak
                </p>
                <p className="text-3xl font-black text-inverse-surface">
                  {streak?.streakCount ?? user?.streak_count ?? 0}
                </p>
              </div>
            </div>

            <div className="mx-auto mb-8 max-w-md rounded-2xl bg-surface p-5">
              <div className="mb-2 flex justify-between font-bold">
                <span>Correct Answers</span>
                <span className="text-primary">
                  {correctCount}/{totalQuestions}
                </span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-surface-container">
                <div
                  className="h-full bg-gradient-to-r from-secondary-container to-primary"
                  style={{
                    width: `${(correctCount / Math.max(totalQuestions, 1)) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {hasAnswers && (
                <button
                  onClick={() => navigate(`/lesson/${levelId}/review`, { state })}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-primary bg-white py-4 text-lg font-bold text-primary transition-colors hover:bg-primary-fixed"
                >
                  Review Answers <ListChecks size={22} />
                </button>
              )}

              <button
                onClick={() => navigate("/home")}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 text-lg font-bold text-white shadow-soft transition-colors hover:bg-primary-container"
              >
                Continue Path <ArrowRight size={22} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
