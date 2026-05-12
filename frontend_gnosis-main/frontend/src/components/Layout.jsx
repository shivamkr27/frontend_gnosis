import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BookOpen, Trophy, Swords, User, Bell, X } from "lucide-react";
import api from "../lib/api";
import { useSocketStore } from "../lib/store";
import { useAuthStore } from "../lib/store";
import { createSocket } from "../lib/socket";

export default function Layout({ children }) {
  const { notifications, unreadCount, setNotifications, markAsRead, removeNotification } = useSocketStore();
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    if (user?.id) {
      api.get(`/notifications/${user.id}`).then(res => {
        setNotifications(res.data);
      }).catch(err => console.error("Failed to load notifications", err));
    }
  }, [user]);

  const handleNotificationClick = async (notif) => {
    if (!notif.read) {
      // Could call backend to mark as read here if we added that endpoint, or just delete it
      markAsRead(notif.id);
    }

    // If it's a friend request, maybe navigate to profile or friends page
    if (notif.type === 'friend_request') {
      navigate('/friends'); // Assuming this route exists or they handle it there
    }
    setShowNotifications(false);
  };

  const handleDeleteNotification = async (e, id) => {
      e.stopPropagation();
      try {
          await api.delete(`/notifications/${id}`);
          removeNotification(id);
      } catch(err) {
          console.error("Failed to delete", err);
      }
  };

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
    { to: "/battle", icon: <Swords className="w-6 h-6" />, label: "Arena" },
    { to: "/leaderboard", icon: <Trophy className="w-6 h-6" />, label: "Rank" },
    {
      to: `/profile/${user?.id}`,
      icon: <User className="w-6 h-6" />,
      label: "Profile",
    },
  ];

  return (
    <div className="min-h-screen pb-20 md:pb-0 md:pl-24 bg-[#FAF7F2]">
      {/* Top Bar for Mobile */}
      <div className="md:hidden sticky top-0 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E8DFD1] z-40 px-4 py-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#8B2500] rounded-lg flex items-center justify-center text-white font-bold">
            G
          </div>
          <span className="font-bold text-lg text-[#1a1a1a]">Gnosis</span>
        </div>
        <div className="relative">
          <button onClick={() => setShowNotifications(!showNotifications)} className="p-2 relative text-[#8a8a8a] hover:text-[#1a1a1a]">
            <Bell className="w-6 h-6" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#FAF7F2]"></span>
            )}
          </button>
        </div>
      </div>

      {/* Desktop Sidebar (No Library, matches theme) */}
      <nav className="hidden md:flex flex-col items-center fixed left-0 top-0 bottom-0 w-24 bg-[#FAF7F2] border-r border-[#E8DFD1] z-50 py-8 shadow-[2px_0_15px_rgba(0,0,0,0.02)]">
        <div className="w-12 h-12 bg-[#8B2500] rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-sm mb-12">
          G
        </div>

        <div className="relative mb-8 w-full px-4 flex justify-center">
            <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-3 rounded-2xl text-[#8a8a8a] hover:text-[#1a1a1a] hover:bg-white hover:shadow-sm transition-all w-full flex justify-center">
                <Bell className="w-6 h-6" />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-4 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#FAF7F2]"></span>
                )}
            </button>
        </div>

        <div className="flex flex-col gap-8 flex-1 w-full px-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1.5 group w-full ${isActive ? "text-[#8B2500]" : "text-[#8a8a8a] hover:text-[#1a1a1a]"}`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`p-3 rounded-2xl w-full flex justify-center transition-all ${isActive ? "bg-[#FFF4E5] text-[#D4641A]" : "group-hover:bg-white group-hover:shadow-sm"}`}
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
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E8DFD1] z-50 pb-safe shadow-[0_-2px_15px_rgba(0,0,0,0.03)]">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 w-16 ${isActive ? "text-[#D4641A]" : "text-[#8a8a8a]"}`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`p-1.5 rounded-xl ${isActive ? "bg-[#FFF4E5]" : ""}`}
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

      <main className="max-w-4xl mx-auto min-h-screen bg-[#FAF7F2]">{children}</main>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="fixed top-16 md:top-4 right-4 md:left-28 z-50 w-80 bg-white rounded-2xl shadow-xl border border-[#E8DFD1] overflow-hidden flex flex-col max-h-[400px]">
          <div className="p-4 border-b border-[#E8DFD1] bg-[#FAF7F2] flex justify-between items-center">
            <h3 className="font-bold text-[#1a1a1a]">Notifications</h3>
            <button onClick={() => setShowNotifications(false)} className="text-[#8a8a8a] hover:text-[#1a1a1a]">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="overflow-y-auto flex-1 p-2">
            {notifications.length === 0 ? (
              <p className="text-center text-[#8a8a8a] p-4 text-sm">No new notifications</p>
            ) : (
              notifications.map(notif => (
                <div
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif)}
                  className={`p-3 rounded-xl mb-1 cursor-pointer transition-colors relative group flex items-start gap-3 ${notif.read ? 'bg-transparent hover:bg-[#FAF7F2]' : 'bg-[#FFF4E5] border border-[#f0dac2]'}`}
                >
                  <div className="flex-1">
                    <p className={`text-sm ${notif.read ? 'text-[#6b6b6b]' : 'text-[#1a1a1a] font-medium'}`}>
                      {notif.message}
                    </p>
                    <span className="text-[10px] text-[#8a8a8a] mt-1 block">
                      {new Date(notif.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <button
                    onClick={(e) => handleDeleteNotification(e, notif.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-[#8a8a8a] hover:text-red-500 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}


      {/* Incoming Challenge Modal */}
      {incomingChallenge && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1a1a1a]/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-[24px] bg-white p-8 shadow-xl text-center border border-[#E8DFD1]">
            <h3 className="mb-2 text-2xl font-extrabold text-[#1a1a1a]">
              Challenge Received!
            </h3>
            <p className="mb-8 text-[#6b6b6b] leading-relaxed">
              <span className="text-[#8B2500] font-bold">{incomingChallenge.fromUsername}</span> has challenged you to a battle in <span className="font-bold text-[#1a1a1a]">{incomingChallenge.subjectName}</span>!
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => handleRespond(false)}
                className="flex-1 py-3.5 rounded-xl font-bold border-2 border-[#E8DFD1] text-[#6b6b6b] hover:bg-[#FAF7F2] hover:text-[#1a1a1a] transition-all"
              >
                Decline
              </button>
              <button
                onClick={() => handleRespond(true)}
                className="flex-1 py-3.5 rounded-xl bg-[#8B2500] text-white font-bold shadow-md hover:bg-[#6A1C00] transition-all hover:-translate-y-0.5"
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
