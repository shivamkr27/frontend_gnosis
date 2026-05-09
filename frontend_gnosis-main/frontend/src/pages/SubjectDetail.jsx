import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, CheckCircle, Play, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export function SubjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data for levels
  const levels = [
    { id: 1, name: "Arrays & Strings", status: "completed" },
    { id: 2, name: "Hash Maps", status: "completed" },
    { id: 3, name: "Linked Lists", status: "current" },
    { id: 4, name: "Trees & Graphs", status: "locked" },
    { id: 5, name: "Dynamic Programming", status: "locked" },
  ];

  return (
    <div className="p-4 sm:p-8 max-w-3xl mx-auto pb-24 md:pb-8">

      <button
        onClick={() => navigate('/home')}
        className="flex items-center text-sm font-bold text-gnosis-muted hover:text-gnosis-text mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Map
      </button>

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gnosis-card border border-gnosis-border rounded-3xl p-8 mb-10 text-center relative overflow-hidden shadow-lg"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gnosis-purple via-gnosis-purple-light to-gnosis-purple"></div>

        <div className="w-16 h-16 mx-auto bg-gnosis-bg rounded-2xl flex items-center justify-center mb-4">
          <BookOpen className="w-8 h-8 text-gnosis-purple-light" />
        </div>

        <h1 className="text-3xl font-black mb-2 tracking-tight">Data Structures</h1>
        <p className="text-gnosis-muted font-medium mb-6">Master the fundamental building blocks of computer science.</p>

        <div className="flex justify-center items-center gap-8">
          <div className="text-center">
            <div className="text-3xl font-black text-gnosis-green">2/5</div>
            <div className="text-xs text-gnosis-muted uppercase tracking-wider font-bold mt-1">Completed</div>
          </div>
          <div className="w-px h-10 bg-gnosis-border"></div>
          <div className="text-center">
            <div className="text-3xl font-black text-gnosis-purple-light">40%</div>
            <div className="text-xs text-gnosis-muted uppercase tracking-wider font-bold mt-1">Progress</div>
          </div>
        </div>
      </motion.div>

      <div className="space-y-4 relative">
        {/* Connection line behind levels */}
        <div className="absolute left-[2.25rem] top-8 bottom-8 w-1.5 bg-gnosis-border -z-10 hidden sm:block rounded-full"></div>

        {levels.map((level, idx) => (
          <motion.div
            key={level.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-center gap-4 sm:gap-6"
          >

            {/* Timeline Node */}
            <div className={`hidden sm:flex w-16 h-16 rounded-2xl border-4 items-center justify-center bg-gnosis-bg z-10 shrink-0 transition-colors
              ${level.status === 'completed' ? 'border-gnosis-green text-gnosis-green' :
                level.status === 'current' ? 'border-gnosis-purple text-gnosis-purple-light shadow-[0_0_15px_rgba(124,58,237,0.5)]' :
                'border-gnosis-border text-gnosis-muted'}
            `}>
              {level.status === 'completed' ? <CheckCircle className="w-6 h-6" /> :
               level.status === 'current' ? <Play className="w-6 h-6 ml-1 fill-current" /> :
               <Lock className="w-6 h-6" />}
            </div>

            {/* Level Card */}
            <Link
              to={level.status !== 'locked' ? `/lesson/${level.id}` : '#'}
              className={`flex-1 p-6 rounded-2xl border-2 transition-all flex items-center justify-between
                ${level.status === 'locked' ? 'bg-gnosis-card/50 border-gnosis-border/50 opacity-75 cursor-not-allowed' :
                  level.status === 'current' ? 'bg-gnosis-card border-gnosis-purple hover:bg-gnosis-purple/5' :
                  'bg-gnosis-card border-gnosis-border hover:border-gnosis-purple-light'}
              `}
            >
              <div>
                <div className="text-xs font-black text-gnosis-purple-light mb-1 tracking-wider">LESSON {level.id}</div>
                <h3 className={`text-xl font-bold ${level.status === 'locked' ? 'text-gnosis-muted' : 'text-gnosis-text'}`}>
                  {level.name}
                </h3>
              </div>

              <div className="hidden sm:block">
                {level.status === 'completed' && <span className="bg-gnosis-green/10 text-gnosis-green font-bold px-3 py-1 rounded-lg text-sm">Done</span>}
                {level.status === 'current' && <span className="bg-gnosis-purple/10 text-gnosis-purple-light font-bold px-3 py-1 rounded-lg text-sm">Active</span>}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
