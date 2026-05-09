import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import {
  Landing,
  Auth,
  Home,
  SubjectDetail,
  ActiveQuiz,
  QuizReview,
  LessonComplete,
  BattleLobby,
  ChallengeWaiting,
  ActiveBattle,
  BattleResults,
  HostConfig,
  HostLobby,
  ParticipantWaiting,
  Leaderboard,
  Profile
} from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/subject/:id" element={<SubjectDetail />} />
          <Route path="/lesson/:levelId" element={<ActiveQuiz />} />
          <Route path="/lesson/:levelId/review" element={<QuizReview />} />
          <Route path="/lesson/:levelId/complete" element={<LessonComplete />} />

          <Route path="/battle" element={<BattleLobby />} />
          <Route path="/battle/waiting/:friendId" element={<ChallengeWaiting />} />
          <Route path="/battle/room/:roomId" element={<ActiveBattle />} />
          <Route path="/battle/results/:roomId" element={<BattleResults />} />
          <Route path="/battle/host" element={<HostConfig />} />
          <Route path="/battle/host/:roomId" element={<HostLobby />} />
          <Route path="/battle/join/:roomId" element={<ParticipantWaiting />} />

          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile/:userId" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
