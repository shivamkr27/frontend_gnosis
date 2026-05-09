import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swords, Users, PlusCircle, UserPlus, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function BattleLobby() {
  const navigate = useNavigate();
  const [showFriends, setShowFriends] = useState(false);

  const groupModes = [
    {
      id: 'host',
      title: "Host Group Quiz",
      desc: "Create a room and invite multiple friends.",
      icon: <PlusCircle className="w-8 h-8 text-gnosis-gold" />,
      color: "border-gnosis-gold/30 hover:border-gnosis-gold hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]",
      action: () => navigate('/battle/host')
    },
    {
      id: 'join',
      title: "Join Group Quiz",
      desc: "Enter a room code to join a game.",
      icon: <Users className="w-8 h-8 text-gnosis-green" />,
      color: "border-gnosis-green/30 hover:border-gnosis-green hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]",
      action: () => navigate('/battle/join/enter-code')
    }
  ];

  const friendsList = [
    { id: 'f1', name: 'CodeNinja', isOnline: true },
    { id: 'f2', name: 'ReactGod', isOnline: true },
    { id: 'f3', name: 'AlexDev', isOnline: false },
    { id: 'f4', name: 'Sam99', isOnline: false },
  ];

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto pb-24 md:pb-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-black mb-4 tracking-tighter">Battle Arena</h1>
        <p className="text-gnosis-muted max-w-xl mx-auto font-medium">
          Challenge your friends to a 1v1 duel, or host a group trivia night.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* 1v1 Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gnosis-card border border-gnosis-border rounded-3xl p-6 flex flex-col h-full"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gnosis-purple/20 rounded-2xl flex items-center justify-center shrink-0">
              <Swords className="w-8 h-8 text-gnosis-purple-light" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">1v1 Duel</h2>
              <p className="text-sm text-gnosis-muted">Challenge a friend</p>
            </div>
          </div>

          <button
            onClick={() => setShowFriends(!showFriends)}
            className="w-full bg-gnosis-purple hover:bg-gnosis-purple/90 text-white font-bold py-4 rounded-xl transition-colors mb-6"
          >
            {showFriends ? 'Hide Friends' : 'Pick Opponent'}
          </button>

          <AnimatePresence>
            {showFriends && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gnosis-muted" />
                  <input
                    type="text"
                    placeholder="Search friends..."
                    className="w-full bg-gnosis-bg border border-gnosis-border rounded-lg py-2 pl-10 pr-4 text-sm focus:border-gnosis-purple outline-none"
                  />
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                  {friendsList.map(friend => (
                    <div key={friend.id} className="flex items-center justify-between p-3 rounded-xl bg-gnosis-bg border border-gnosis-border hover:border-gnosis-purple/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-8 h-8 rounded-full bg-gnosis-card flex items-center justify-center font-bold text-sm">
                            {friend.name.charAt(0)}
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-gnosis-bg ${friend.isOnline ? 'bg-gnosis-green' : 'bg-gnosis-muted'}`}></div>
                        </div>
                        <span className="font-bold text-sm">{friend.name}</span>
                      </div>
                      <button
                        onClick={() => navigate(`/battle/waiting/${friend.id}`)}
                        disabled={!friend.isOnline}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors
                          ${friend.isOnline ? 'bg-gnosis-purple/20 text-gnosis-purple-light hover:bg-gnosis-purple hover:text-white' : 'bg-gnosis-card text-gnosis-muted opacity-50 cursor-not-allowed'}
                        `}
                      >
                        Challenge
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Group Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-6"
        >
          {groupModes.map((mode, idx) => (
            <button
              key={mode.id}
              onClick={mode.action}
              className={`bg-gnosis-card border-2 rounded-3xl p-6 flex items-center gap-6 transition-all text-left ${mode.color}`}
            >
              <div className="w-16 h-16 bg-gnosis-bg rounded-2xl flex items-center justify-center shrink-0">
                {mode.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">{mode.title}</h3>
                <p className="text-sm text-gnosis-muted">{mode.desc}</p>
              </div>
            </button>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
