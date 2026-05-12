import re

# Update ParticipantLobby.jsx which handles BOTH the host view of waiting room and participant view

with open('frontend_gnosis-main/frontend/src/pages/ParticipantLobby.jsx', 'r') as f:
    content = f.read()

# We need to replace the return statement to match host lobby.png / lobby.png
# Both are very similar: They show the user vs opponent (or empty placeholder), the room code, and a Start Clash / Waiting button

new_return = """  return (
    <Layout>
      <div className="min-h-[calc(100vh-80px)] bg-[#f9fafb] flex flex-col items-center py-12 px-4 relative">
        {/* Background Grid Pattern - Simple CSS implementation */}
        <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

        <div className="relative z-10 w-full max-w-4xl text-center">
          <h1 className="text-4xl font-extrabold text-[#1f2937] mb-2 drop-shadow-sm">
            {isHost ? 'Waiting for Participant...' : 'Waiting for Host...'}
          </h1>
          <p className="text-[#6b7280] font-bold text-lg mb-12">
            The clash of minds begins soon!
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16 mb-16">
            {/* Player 1 */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-indigo-100 rounded-full border-8 border-white shadow-xl flex items-center justify-center relative overflow-hidden mb-4">
                {/* Fallback to initials if no avatar */}
                <span className="text-4xl md:text-5xl font-extrabold text-indigo-700 uppercase">
                  {user?.username ? user.username.substring(0, 2) : 'ME'}
                </span>
                {/* If we had an image it would go here */}
              </div>
              <h3 className="text-2xl font-bold text-[#1f2937] bg-white px-6 py-2 rounded-full shadow-sm border border-[#e5e7eb]">
                {user?.username || 'You'}
              </h3>
            </div>

            {/* VS Badge */}
            <div className="flex flex-col items-center justify-center shrink-0">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl rotate-12 flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                <span className="text-white font-black text-2xl -rotate-12">VS</span>
              </div>
            </div>

            {/* Player 2 (Opponent or Empty) */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-full border-8 border-[#f3f4f6] border-dashed flex items-center justify-center relative mb-4 shadow-sm">
                {players.length > 1 ? (
                  <span className="text-4xl md:text-5xl font-extrabold text-orange-500 uppercase">
                    {players.find(p => p.userId !== user?.id)?.username?.substring(0, 2) || 'OP'}
                  </span>
                ) : (
                  <span className="text-6xl text-[#d1d5db]">?</span>
                )}
              </div>
              <h3 className="text-2xl font-bold text-[#1f2937] bg-white px-6 py-2 rounded-full shadow-sm border border-[#e5e7eb] min-w-[120px]">
                {players.length > 1 ? players.find(p => p.userId !== user?.id)?.username : 'Waiting...'}
              </h3>
            </div>
          </div>

          {/* Action Area */}
          <div className="max-w-md mx-auto bg-white p-6 rounded-3xl shadow-lg border-2 border-[#f3f4f6]">
            {isHost && (
              <div className="mb-6">
                <p className="text-sm font-bold text-[#6b7280] mb-2 uppercase tracking-wider">Room Code</p>
                <div className="flex items-center justify-center gap-3 bg-[#f9fafb] border-2 border-[#e5e7eb] rounded-2xl py-3 px-4">
                  <span className="text-3xl font-black tracking-widest text-[#1f2937] uppercase">{code}</span>
                  <button
                    onClick={() => navigator.clipboard.writeText(code)}
                    className="p-2 hover:bg-[#e5e7eb] rounded-xl transition-colors text-[#6b7280] hover:text-[#1f2937]"
                    title="Copy Code"
                  >
                    <Copy className="w-6 h-6" />
                  </button>
                </div>
              </div>
            )}

            {error && <p className="mb-4 font-bold text-red-500">{error}</p>}

            {isHost ? (
              <button
                onClick={handleStart}
                disabled={players.length < 2 || starting}
                className="w-full bg-[#ea580c] text-white py-4 rounded-xl font-bold text-xl hover:bg-[#c2410c] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0"
              >
                {starting ? "Starting..." : "Start Clash"}
              </button>
            ) : (
              <button
                disabled
                className="w-full bg-[#f3f4f6] text-[#6b7280] border-2 border-[#e5e7eb] py-4 rounded-xl font-bold text-xl transition-all cursor-not-allowed"
              >
                Waiting for Host...
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );"""

content = re.sub(r'  if \(results\) \{.*?return \(\n    <Layout>.*?    </Layout>\n  \);\n}', new_return, content, flags=re.DOTALL)

with open('frontend_gnosis-main/frontend/src/pages/ParticipantLobby.jsx', 'w') as f:
    f.write(content)
