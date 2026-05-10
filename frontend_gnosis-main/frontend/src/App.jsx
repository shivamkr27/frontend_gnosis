import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuthStore, useAppStore } from "./lib/store";
import api from "./lib/api";
import { createSocket } from "./lib/socket";

import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home";
import SubjectDetail from "./pages/SubjectDetail";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";

import BattleLobby from "./pages/BattleLobby";
import HostLobby from "./pages/HostLobby";
import ParticipantLobby from "./pages/ParticipantLobby";
import ActiveQuiz from "./pages/ActiveQuiz";
import BattleResults from "./pages/BattleResults";
import ChallengeSent from "./pages/ChallengeSent";
import LessonComplete from "./pages/LessonComplete";
import QuizReview from "./pages/QuizReview";

function ProtectedRoute({ children }) {
  const { token } = useAuthStore();
  if (!token) return <Navigate to="/auth" />;
  return children;
}

function App() {
  const { user, token, setUser, logout } = useAuthStore();
  const { setImageMap } = useAppStore();

  useEffect(() => {
    fetch("/assets/image_map.json")
      .then((res) => res.json())
      .then((data) => setImageMap(data))
      .catch(() => console.log("No image map found"));
  }, [setImageMap]);

  useEffect(() => {
    if (token) {
      api
        .get("/auth/me")
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.error("Failed to fetch user", err);
          logout();
        });
    }
  }, [logout, token, setUser]);

  useEffect(() => {
    if (!token || !user?.id) return undefined;
    const socket = createSocket(user);
    return () => socket.disconnect();
  }, [token, user]);

  return (
    <Router>
      <div className="min-h-screen bg-background jaali-bg text-on-surface">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/subject/:id"
            element={
              <ProtectedRoute>
                <SubjectDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:id?"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <ProtectedRoute>
                <Leaderboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/battle"
            element={
              <ProtectedRoute>
                <BattleLobby />
              </ProtectedRoute>
            }
          />
          <Route
            path="/battle/host"
            element={
              <ProtectedRoute>
                <HostLobby />
              </ProtectedRoute>
            }
          />
          <Route
            path="/battle/lobby/:code"
            element={
              <ProtectedRoute>
                <ParticipantLobby />
              </ProtectedRoute>
            }
          />
          <Route
            path="/battle/waiting/:friendId"
            element={
              <ProtectedRoute>
                <ChallengeSent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lesson/:levelId"
            element={
              <ProtectedRoute>
                <ActiveQuiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lesson/:levelId/complete"
            element={
              <ProtectedRoute>
                <LessonComplete />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lesson/:levelId/review"
            element={
              <ProtectedRoute>
                <QuizReview />
              </ProtectedRoute>
            }
          />
          <Route
            path="/battle/results/:id"
            element={
              <ProtectedRoute>
                <BattleResults />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
