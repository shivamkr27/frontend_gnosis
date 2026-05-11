import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BookOpen, Trophy, Swords, User } from "lucide-react";
import { useAuthStore } from "../lib/store";
import { createSocket } from "../lib/socket";

export default function Layout({ children }) {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const socketRef = useRef(null);

  // Incoming challenge state
  const [incomingChallenge, setIncomingChallenge] = useState(null);

  useEffect(() => {
    if (!user?.id) return;
    const socket = createSocket(user);
    socketRef.current = socket;

    socket.on("connect", () => {
      socket.emit("user:identify", { userId: user.id, username: user.username });
    });

    socket.on("challenge:received", (payload) => {
      setIncomingChallenge(payload);
    });

    socket.on("challenge:accepted", (payload) => {
        if(payload.roomCode) {
            navigate(`/battle/lobby/${payload.roomCode}`);
        }
    });

    return () => socket.disconnect();
  }, [user, navigate]);

  const handleRespond = (accepted) => {
    if(!incomingChallenge || !socketRef.current) return;
    socketRef.current.emit("challenge:respond", {
        accepted,
        fromUserId: incomingChallenge.fromUserId,
        subjectId: incomingChallenge.subjectId,
        levelId: incomingChallenge.levelId,
        subjectName: incomingChallenge.subjectName,
        levelNumber: incomingChallenge.levelNumber
    });
    setIncomingChallenge(null);
  }

  const navItems = [
    { to: "/home", icon: <BookOpen className="w-6 h-6" />, label: "Learn" },
    { to: "/battle", icon: <Swords className="w-6 h-6" />, label: "Battle" },
    { to: "/leaderboard", icon: <Trophy className="w-6 h-6" />, label: "Rank" },
    {
      to: `/profile/${user?.id}`,
      icon: <User className="w-6 h-6" />,
      label: "Profile",
    },
  ];

  return (
    <div className="min-h-screen pb-20 md:pb-0 md:pl-24 bg-background jaali-bg">
      {/* Top Bar for Mobile */}
      <div className="md:hidden sticky top-0 bg-white/80 backdrop-blur-md border-b border-surface-variant z-40 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
            G
          </div>
          <span className="font-bold text-lg text-inverse-surface">Gnosis</span>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5 text-secondary font-bold bg-secondary-container/20 px-3 py-1 rounded-full">
            <Trophy className="w-4 h-4" />
            <span>{user?.total_xp || 0}</span>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <nav className="hidden md:flex flex-col items-center fixed left-0 top-0 bottom-0 w-24 bg-white border-r border-surface-variant z-50 py-8">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-soft mb-12">
          G
        </div>

        <div className="flex flex-col gap-8 flex-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1.5 group ${isActive ? "text-primary" : "text-on-surface-variant hover:text-inverse-surface"}`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`p-3 rounded-2xl transition-all ${isActive ? "bg-primary-container/10" : "group-hover:bg-surface"}`}
                  >
                    {item.icon}
                  </div>
                  <span className="text-xs font-bold">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-surface-variant z-50 pb-safe">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 w-16 ${isActive ? "text-primary" : "text-on-surface-variant"}`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`p-1.5 rounded-xl ${isActive ? "bg-primary-container/10" : ""}`}
                  >
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-bold">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      <main className="max-w-3xl mx-auto min-h-screen">{children}</main>

      {/* Incoming Challenge Modal */}
      {incomingChallenge && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl text-center">
            <h3 className="mb-2 text-2xl font-bold text-inverse-surface">
              Challenge Received!
            </h3>
            <p className="mb-6 font-semibold text-on-surface-variant">
              <span className="text-primary font-bold">{incomingChallenge.fromUsername}</span> has challenged you to a battle in <span className="font-bold">{incomingChallenge.subjectName}</span>!
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleRespond(false)}
                className="flex-1 py-3 rounded-xl font-bold border-2 border-surface-variant text-on-surface-variant hover:bg-surface-variant transition-colors"
              >
                Decline
              </button>
              <button
                onClick={() => handleRespond(true)}
                className="flex-1 py-3 rounded-xl bg-primary text-white font-bold shadow-soft hover:bg-primary/90 transition-colors"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
