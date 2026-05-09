import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Lock, Play } from 'lucide-react';

export function Home() {
  const pathNodes = [
    { id: 1, name: "Data Structures", status: "completed", offset: -40 },
    { id: 2, name: "Algorithms", status: "completed", offset: 40 },
    { id: 3, name: "React Basics", status: "current", offset: 0 },
    { id: 4, name: "System Design", status: "locked", offset: -30 },
    { id: 5, name: "Databases", status: "locked", offset: 30 },
  ];

  return (
    <div className="p-4 sm:p-8 max-w-lg mx-auto pb-32 md:pb-16 flex flex-col items-center">

      <div className="mb-12 text-center">
        <h1 className="text-3xl font-black mb-2 tracking-tight">Learning Path</h1>
        <p className="text-gnosis-muted font-medium">Continue your journey.</p>
      </div>

      <div className="relative w-full flex flex-col items-center py-8">

        {/* Background dotted line */}
        <div className="absolute top-0 bottom-0 w-2 border-l-4 border-dashed border-gnosis-border -ml-1 z-0"></div>

        {/* Nodes */}
        {pathNodes.map((node, idx) => {
          const isCompleted = node.status === 'completed';
          const isCurrent = node.status === 'current';
          const isLocked = node.status === 'locked';

          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.15, type: "spring" }}
              className="relative z-10 w-full flex flex-col items-center mb-16 last:mb-0"
              style={{ transform: `translateX(${node.offset}px)` }}
            >
              <Link
                to={!isLocked ? `/subject/${node.id}` : '#'}
                className="group relative flex flex-col items-center"
              >
                {/* Node Button */}
                <div className={`
                  w-20 h-20 rounded-full flex items-center justify-center border-b-[6px] transition-all
                  ${isCompleted ? 'bg-gnosis-green border-gnosis-green/50 text-white hover:brightness-110' : ''}
                  ${isCurrent ? 'bg-gnosis-purple border-gnosis-purple/50 text-white shadow-[0_0_30px_rgba(124,58,237,0.5)] animate-bounce-slow' : ''}
                  ${isLocked ? 'bg-gnosis-card border-gnosis-border text-gnosis-muted cursor-not-allowed' : ''}
                  active:border-b-0 active:translate-y-[6px]
                `}>
                  {isCompleted && <Check className="w-10 h-10" strokeWidth={3} />}
                  {isCurrent && <Play className="w-10 h-10 ml-1 fill-white" strokeWidth={3} />}
                  {isLocked && <Lock className="w-8 h-8" strokeWidth={2.5} />}
                </div>

                {/* Node Label Floating slightly below */}
                <div className={`mt-4 px-4 py-2 rounded-xl font-bold text-sm text-center shadow-lg whitespace-nowrap
                  ${isCurrent ? 'bg-gnosis-purple text-white' : 'bg-gnosis-card border border-gnosis-border text-gnosis-muted'}
                `}>
                  {node.name}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
