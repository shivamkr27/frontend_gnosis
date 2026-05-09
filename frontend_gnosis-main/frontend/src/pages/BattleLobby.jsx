import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swords, Users, PlusCircle, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

export function BattleLobby() {
  const navigate = useNavigate();

  const modes = [
    {
      id: '1v1',
      title: "1v1 Random Match",
      desc: "Battle a random opponent of similar skill.",
      icon: <Swords className="w-8 h-8 text-gnosis-red" />,
      color: "hover:border-gnosis-red",
      action: () => navigate('/battle/room/random')
    },
    {
      id: 'friend',
      title: "Challenge Friend",
      desc: "Invite an online friend to a duel.",
      icon: <UserPlus className="w-8 h-8 text-gnosis-purple-light" />,
      color: "hover:border-gnosis-purple-light",
      action: () => navigate('/battle/waiting/friend123')
    },
    {
      id: 'host',
      title: "Host Group Quiz",
      desc: "Create a room and invite multiple friends.",
      icon: <PlusCircle className="w-8 h-8 text-gnosis-gold" />,
      color: "hover:border-gnosis-gold",
      action: () => navigate('/battle/host')
    },
    {
      id: 'join',
      title: "Join Group Quiz",
      desc: "Enter a room code to join a game.",
      icon: <Users className="w-8 h-8 text-gnosis-green" />,
      color: "hover:border-gnosis-green",
      action: () => navigate('/battle/join/enter-code') // Mocking for now
    }
  ];

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto pb-24 md:pb-8">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold mb-4">Battle Arena</h1>
        <p className="text-gnosis-muted max-w-xl mx-auto">
          Test your knowledge against others. Climb the ranks in 1v1, or host a fun trivia night with friends.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modes.map((mode, idx) => (
          <motion.button
            key={mode.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={mode.action}
            className={`bg-gnosis-card border border-gnosis-border rounded-3xl p-8 flex flex-col items-center text-center transition-all hover:-translate-y-1 ${mode.color}`}
          >
            <div className="w-20 h-20 bg-gnosis-bg rounded-2xl flex items-center justify-center mb-6">
              {mode.icon}
            </div>
            <h3 className="text-2xl font-bold mb-2">{mode.title}</h3>
            <p className="text-gnosis-muted">{mode.desc}</p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
