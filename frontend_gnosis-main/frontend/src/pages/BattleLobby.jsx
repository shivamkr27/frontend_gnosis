import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useAuthStore } from "../lib/store";
import api from "../lib/api";
import { Users, Play, Search, UserPlus, Inbox, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BattleLobby() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState("1v1");
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roomCode, setRoomCode] = useState("");

  // Friend Management State
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [pending, setPending] = useState([]);
  const [message, setMessage] = useState("");

  // Subject Selection Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState("");

  useEffect(() => {
    fetchFriends();
    fetchPendingRequests();
    fetchSubjects();
  }, []);

  const fetchFriends = async () => {
    setLoading(true);
    try {
      const res = await api.get("/auth/friends");
      const friendsData = res.data;

      // Batch online status check
      if (friendsData.length > 0) {
        const userIds = friendsData.map(f => f.id);
        const onlineRes = await api.post('/notifications/online/batch', { userIds });
        const onlineStatusMap = onlineRes.data;

        const friendsWithStatus = friendsData.map(f => ({
          ...f,
          online: onlineStatusMap[f.id] || false
        }));
        setFriends(friendsWithStatus);
      } else {
        setFriends([]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingRequests = async () => {
    try {
      const res = await api.get("/auth/friend-requests/pending");
      setPending(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSubjects = async () => {
    try {
      const res = await api.get("/content/subjects");
      setSubjects(Array.isArray(res.data) ? res.data : res.data.subjects);
    } catch(err) {
      console.error(err);
    }
  };

  const handleSearch = async () => {
    if (!query) return;
    try {
      const res = await api.get(`/auth/users/search?q=${query}`);
      setSearchResults(res.data);
      setMessage("");
    } catch (err) {
      console.error(err);
      setMessage("Search failed");
    }
  };

  const sendRequest = async (id) => {
    try {
      await api.post("/auth/friend-request", { receiverId: id });
      setMessage("Request sent!");
      setSearchResults([]);
      setQuery("");
    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to send");
    }
  };

  const respondRequest = async (id, action) => {
    try {
      await api.post("/auth/friend-request/respond", {
        requesterId: id,
        action,
      });
      fetchPendingRequests();
      if (action === "accept") fetchFriends();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChallengeClick = (friend) => {
    setSelectedFriend(friend);
    setIsModalOpen(true);
  };

  const confirmChallenge = () => {
    if (!selectedSubjectId || !selectedFriend) return;

    // Find the subject detail
    const subject = subjects.find(s => s.id === selectedSubjectId);

    // Note: To keep things simple, we'll challenge on Level 1 of the chosen subject.
    // Ideally we would fetch the subject levels and pick one, but battle flow needs levelId.
    // We will just pass the subject and let the next page deal with it or fetch levels here.
    navigate(`/battle/waiting/${selectedFriend.id}?subjectId=${selectedSubjectId}&subjectName=${encodeURIComponent(subject.name)}`);
  };

  const handleCreateGroup = () => {
    navigate("/battle/host");
  };

  const handleJoinGroup = () => {
    if (roomCode.length === 6) {
      navigate(`/battle/lobby/${roomCode}`);
    }
  };

  return (
    <Layout>
      <div className="mx-auto max-w-5xl p-4 md:p-8">
        <h1 className="mb-8 text-4xl font-bold tracking-tight text-inverse-surface text-center">
          Battle Arena
        </h1>

        <div className="mx-auto mb-8 flex max-w-sm rounded-2xl bg-surface-variant p-1">
          {["1v1", "group"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 rounded-xl py-3 text-sm font-bold transition-colors ${
                activeTab === tab
                  ? "bg-white text-inverse-surface shadow-sm"
                  : "text-on-surface-variant hover:text-inverse-surface"
              }`}
            >
              {tab === "1v1" ? "⚔️ 1v1 Duel" : "👥 Group Quiz"}
            </button>
          ))}
        </div>

        <div className="min-h-[500px]">
          <AnimatePresence mode="wait">
            {activeTab === "1v1" ? (
              <motion.div
                key="1v1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                <h2 className="text-xl font-bold text-inverse-surface mb-6 flex justify-between items-center">
                  Challenge Friends
                  <button
                    onClick={fetchFriends}
                    className="text-primary hover:bg-primary-container/10 p-2 rounded-full transition-colors"
                  >
                    <RefreshCw className="w-5 h-5" />
                  </button>
                </h2>

                {/* Friend Search and Pending (Rest of UI is same) */}
                <div className="rounded-2xl border border-surface-variant bg-surface p-4">
                  <div className="mb-3 flex items-center gap-2 font-bold text-inverse-surface">
                    <UserPlus className="h-5 w-5 text-primary" /> Add Friend
                  </div>
                  <div className="flex gap-2">
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      placeholder="Search username"
                      className="min-w-0 flex-1 rounded-xl border-2 border-surface-variant bg-white px-4 py-3 font-semibold outline-none focus:border-primary"
                    />
                    <button
                      onClick={handleSearch}
                      className="rounded-xl bg-primary px-4 font-bold text-white"
                    >
                      <Search className="h-5 w-5" />
                    </button>
                  </div>
                  {message && (
                    <p className="mt-3 text-sm font-semibold text-on-surface-variant">
                      {message}
                    </p>
                  )}
                  {searchResults.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {searchResults.map((result) => (
                        <div
                          key={result.id}
                          className="flex items-center justify-between rounded-xl bg-white p-3"
                        >
                          <div>
                            <p className="font-bold text-inverse-surface">
                              {result.username}
                            </p>
                            <p className="text-sm font-semibold text-primary">
                              {result.total_xp} XP
                            </p>
                          </div>
                          <button
                            onClick={() => sendRequest(result.id)}
                            className="rounded-lg bg-secondary px-4 py-2 font-bold text-white"
                          >
                            Add
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {pending.length > 0 && (
                  <div className="rounded-2xl border border-surface-variant bg-surface p-4">
                    <div className="mb-3 flex items-center gap-2 font-bold text-inverse-surface">
                      <Inbox className="h-5 w-5 text-secondary" /> Pending Requests
                    </div>
                    <div className="space-y-2">
                      {pending.map((request) => (
                        <div
                          key={request.id}
                          className="flex items-center justify-between rounded-xl bg-white p-3"
                        >
                          <p className="font-bold text-inverse-surface">
                            {request.requester.username}
                          </p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => respondRequest(request.requester.id, "accept")}
                              className="rounded-lg bg-primary px-3 py-2 text-sm font-bold text-white"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => respondRequest(request.requester.id, "reject")}
                              className="rounded-lg bg-surface-variant px-3 py-2 text-sm font-bold text-inverse-surface"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {loading && (
                  <div className="flex h-32 items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                  </div>
                )}

                {!loading && friends.length === 0 && (
                  <p className="rounded-2xl bg-surface p-6 text-center font-semibold text-on-surface-variant">
                    No friends found.
                  </p>
                )}

                {!loading && friends.map((friend) => (
                  <div
                    key={friend.id}
                    className="flex items-center justify-between p-4 rounded-2xl bg-surface border border-surface-variant"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-tertiary-container rounded-full flex items-center justify-center text-white font-bold uppercase">
                          {friend.username.substring(0, 2)}
                        </div>
                        {friend.online && (
                          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-surface rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-inverse-surface">
                          {friend.username}
                        </h3>
                        <p className="text-sm font-medium text-primary">
                          {friend.total_xp} XP
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleChallengeClick(friend)}
                      disabled={!friend.online}
                      className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-container transition-colors shadow-soft"
                    >
                      Challenge
                    </button>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="group"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid md:grid-cols-2 gap-8"
              >
                <div className="flex flex-col items-center text-center p-8 border-2 border-dashed border-surface-variant rounded-3xl bg-surface">
                  <div className="w-16 h-16 bg-primary-container/20 text-primary rounded-2xl flex items-center justify-center mb-6">
                    <Users className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-inverse-surface mb-3">
                    Host a Room
                  </h3>
                  <p className="text-on-surface-variant mb-8">
                    Create custom questions and invite friends to a live
                    multiplayer quiz.
                  </p>
                  <button
                    onClick={handleCreateGroup}
                    className="w-full py-3.5 bg-primary text-white rounded-xl font-bold hover:bg-primary-container transition-all shadow-soft"
                  >
                    Create Room
                  </button>
                </div>

                <div className="flex flex-col items-center text-center p-8 border border-surface-variant rounded-3xl bg-surface-container-lowest shadow-sm">
                  <div className="w-16 h-16 bg-secondary-container/20 text-secondary rounded-2xl flex items-center justify-center mb-6">
                    <Play className="w-8 h-8 ml-1" />
                  </div>
                  <h3 className="text-2xl font-bold text-inverse-surface mb-3">
                    Join a Room
                  </h3>
                  <p className="text-on-surface-variant mb-6">
                    Enter the 6-character room code provided by the host.
                  </p>

                  <div className="w-full flex gap-2">
                    <input
                      type="text"
                      maxLength={6}
                      value={roomCode}
                      onChange={(e) =>
                        setRoomCode(e.target.value.toUpperCase())
                      }
                      placeholder="ENTER CODE"
                      className="flex-1 px-4 py-3.5 text-center font-bold text-xl tracking-widest bg-white border-2 border-surface-variant rounded-xl focus:outline-none focus:border-secondary uppercase"
                    />
                    <button
                      onClick={handleJoinGroup}
                      disabled={roomCode.length !== 6}
                      className="px-6 bg-secondary text-white rounded-xl font-bold hover:bg-secondary-container disabled:opacity-50 transition-colors shadow-soft"
                    >
                      Join
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Subject Selection Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-2xl font-bold text-inverse-surface">
              Select Subject for Battle
            </h3>
            <p className="mb-6 font-semibold text-on-surface-variant">
              Choose a subject to challenge {selectedFriend?.username}.
            </p>
            <div className="max-h-60 overflow-y-auto space-y-2 mb-6">
              {subjects.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubjectId(sub.id)}
                  className={`w-full p-4 rounded-xl border-2 text-left font-bold transition-colors ${
                    selectedSubjectId === sub.id
                      ? 'border-primary bg-primary-container/10 text-primary'
                      : 'border-surface-variant hover:border-primary/50'
                  }`}
                >
                  {sub.name}
                </button>
              ))}
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 rounded-xl font-bold text-on-surface-variant hover:bg-surface-variant"
              >
                Cancel
              </button>
              <button
                onClick={confirmChallenge}
                disabled={!selectedSubjectId}
                className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold shadow-soft disabled:opacity-50"
              >
                Send Challenge
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
