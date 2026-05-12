import re

with open('frontend_gnosis-main/frontend/src/pages/BattleLobby.jsx', 'r') as f:
    content = f.read()

# We need to change the Layout of the BattleLobby to match the reference "battle hub.png"
# It has a "Battle Arena" title, and two large cards side-by-side for "1 VS 1" and "Group Battle"
# Under "1 VS 1", there are tabs "Friend List" and "Add Friends"
# Under "Group Battle", there are buttons "Host Room" and "Join Room"

replacement = """  const [activeTab, setActiveTab] = useState("friendList");

  useEffect(() => {
    fetchFriends();
    fetchPendingRequests();
    fetchSubjects();
  }, []);"""

content = content.replace("""  const [activeTab, setActiveTab] = useState("1v1");

  useEffect(() => {
    fetchFriends();
    fetchPendingRequests();
    fetchSubjects();
  }, []);""", replacement)

new_jsx = """  return (
    <Layout>
      <div className="mx-auto max-w-6xl p-4 md:p-8">
        <h1 className="mb-8 text-4xl font-bold tracking-tight text-[#1f2937] text-center">
          Battle Arena
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* 1 VS 1 Section */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border-2 border-[#f3f4f6]">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[#1f2937]">1 VS 1</h2>
            </div>

            <div className="flex bg-[#f3f4f6] rounded-xl p-1 mb-6">
              <button
                onClick={() => setActiveTab("friendList")}
                className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  activeTab === "friendList"
                    ? "bg-white text-[#1f2937] shadow-sm"
                    : "text-[#6b7280] hover:text-[#1f2937]"
                }`}
              >
                Friend List
              </button>
              <button
                onClick={() => setActiveTab("addFriends")}
                className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  activeTab === "addFriends"
                    ? "bg-white text-[#1f2937] shadow-sm"
                    : "text-[#6b7280] hover:text-[#1f2937]"
                }`}
              >
                Add Friends
              </button>
            </div>

            <div className="min-h-[300px]">
              {activeTab === "friendList" ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-[#6b7280]">Your Friends ({friends.length})</span>
                    <button
                      onClick={fetchFriends}
                      className="text-[#6b7280] hover:text-orange-500 transition-colors"
                    >
                      <RefreshCw className="w-5 h-5" />
                    </button>
                  </div>

                  {loading ? (
                    <div className="flex h-32 items-center justify-center">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
                    </div>
                  ) : friends.length === 0 ? (
                    <p className="text-center font-semibold text-[#6b7280] py-8">
                      No friends found.
                    </p>
                  ) : (
                    friends.map((friend) => (
                      <div
                        key={friend.id}
                        className="flex items-center justify-between p-3 rounded-2xl border-2 border-[#f3f4f6] bg-white hover:border-orange-100 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold uppercase">
                              {friend.username.substring(0, 2)}
                            </div>
                            {friend.online && (
                              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-bold text-[#1f2937]">{friend.username}</h3>
                            <p className="text-xs font-semibold text-orange-500">{friend.total_xp} XP</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleChallengeClick(friend)}
                          disabled={!friend.online}
                          className="px-4 py-2 bg-orange-500 text-white rounded-xl font-bold text-sm hover:bg-orange-600 disabled:opacity-50 transition-colors"
                        >
                          Challenge
                        </button>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Search Form */}
                  <div>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af] w-5 h-5" />
                        <input
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                          placeholder="Search username"
                          className="w-full rounded-xl border-2 border-[#f3f4f6] bg-[#f9fafb] pl-10 pr-4 py-3 font-semibold outline-none focus:border-orange-400 focus:bg-white transition-all text-[#1f2937]"
                        />
                      </div>
                      <button
                        onClick={handleSearch}
                        className="rounded-xl bg-[#1f2937] px-5 py-3 font-bold text-white hover:bg-gray-800 transition-colors"
                      >
                        Search
                      </button>
                    </div>

                    {message && (
                      <p className="mt-2 text-sm font-semibold text-orange-600">
                        {message}
                      </p>
                    )}

                    {searchResults.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <h4 className="font-bold text-[#6b7280] text-sm mb-2">Results</h4>
                        {searchResults.map((result) => (
                          <div
                            key={result.id}
                            className="flex items-center justify-between rounded-xl border-2 border-[#f3f4f6] p-3"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-bold uppercase text-sm">
                                {result.username.substring(0, 2)}
                              </div>
                              <div>
                                <p className="font-bold text-[#1f2937] text-sm">{result.username}</p>
                                <p className="text-xs font-semibold text-orange-500">{result.total_xp} XP</p>
                              </div>
                            </div>
                            <button
                              onClick={() => sendRequest(result.id)}
                              className="rounded-lg bg-[#f3f4f6] text-[#4b5563] hover:bg-orange-100 hover:text-orange-600 px-3 py-1.5 text-sm font-bold transition-colors"
                            >
                              Add
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Pending Requests */}
                  {pending.length > 0 && (
                    <div>
                      <h4 className="font-bold text-[#6b7280] text-sm mb-3 flex items-center gap-2">
                        <Inbox className="w-4 h-4" /> Pending Requests
                      </h4>
                      <div className="space-y-2">
                        {pending.map((request) => (
                          <div
                            key={request.id}
                            className="flex items-center justify-between rounded-xl border-2 border-indigo-100 bg-indigo-50/50 p-3"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold uppercase text-sm">
                                {request.requester.username.substring(0, 2)}
                              </div>
                              <p className="font-bold text-[#1f2937] text-sm">{request.requester.username}</p>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => respondRequest(request.requester.id, "accept")}
                                className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-indigo-700 transition-colors"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => respondRequest(request.requester.id, "reject")}
                                className="rounded-lg bg-white border-2 border-gray-200 px-3 py-1.5 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                              >
                                Reject
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Group Battle Section */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border-2 border-[#f3f4f6]">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                <Users className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-[#1f2937]">Group Battle</h2>
            </div>

            <div className="space-y-6">
              {/* Host Box */}
              <div className="border-2 border-dashed border-[#e5e7eb] rounded-2xl p-6 text-center hover:border-indigo-300 transition-colors bg-[#f9fafb] group cursor-pointer" onClick={handleCreateGroup}>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-indigo-600 ml-1" />
                </div>
                <h3 className="font-bold text-lg text-[#1f2937] mb-2">Host Room</h3>
                <p className="text-sm font-medium text-[#6b7280] mb-4">
                  Create custom questions and invite friends.
                </p>
                <button
                  className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all"
                >
                  Create Room
                </button>
              </div>

              <div className="relative flex items-center justify-center py-2">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#e5e7eb]"></div></div>
                <span className="relative bg-white px-4 text-sm font-bold text-[#9ca3af]">OR</span>
              </div>

              {/* Join Box */}
              <div className="border-2 border-[#f3f4f6] rounded-2xl p-6">
                <h3 className="font-bold text-lg text-[#1f2937] mb-2">Join Room</h3>
                <p className="text-sm font-medium text-[#6b7280] mb-4">
                  Enter the 6-character room code provided by the host.
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                    placeholder="ENTER CODE"
                    className="flex-1 px-4 py-3 text-center font-bold text-lg tracking-widest bg-[#f9fafb] border-2 border-[#e5e7eb] rounded-xl focus:outline-none focus:border-indigo-400 focus:bg-white uppercase transition-colors"
                  />
                  <button
                    onClick={handleJoinGroup}
                    disabled={roomCode.length !== 6}
                    className="px-6 bg-[#1f2937] text-white rounded-xl font-bold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Join
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subject Selection Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md rounded-3xl bg-white p-6 md:p-8 shadow-2xl border-4 border-orange-50"
          >
            <h3 className="mb-2 text-2xl font-bold text-[#1f2937]">
              Select Module
            </h3>
            <p className="mb-6 font-semibold text-[#6b7280]">
              Choose a subject to challenge <span className="text-indigo-600">{selectedFriend?.username}</span>.
            </p>
            <div className="max-h-60 overflow-y-auto space-y-2 mb-8 pr-2 custom-scrollbar">
              {subjects.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubjectId(sub.id)}
                  className={`w-full p-4 rounded-xl border-2 text-left font-bold transition-all ${
                    selectedSubjectId === sub.id
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-[#f3f4f6] text-[#4b5563] hover:border-orange-200 hover:bg-orange-50/50'
                  }`}
                >
                  {sub.name}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-3 rounded-xl font-bold text-[#6b7280] bg-[#f3f4f6] hover:bg-[#e5e7eb] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmChallenge}
                disabled={!selectedSubjectId}
                className="flex-1 py-3 rounded-xl bg-orange-500 text-white font-bold disabled:opacity-50 hover:bg-orange-600 transition-colors"
              >
                Start Clash
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </Layout>
  );
}
"""

content = re.sub(r'  return \(\n    <Layout>.*?    </Layout>\n  \);\n}', new_jsx, content, flags=re.DOTALL)

with open('frontend_gnosis-main/frontend/src/pages/BattleLobby.jsx', 'w') as f:
    f.write(content)
