import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Star, Lock, CheckCircle } from 'lucide-react';

export function Home() {
  const subjects = [
    { id: 1, name: "Data Structures", description: "Learn arrays, trees, and graphs.", progress: 80, icon: <BookOpen className="text-gnosis-purple-light" /> },
    { id: 2, name: "Algorithms", description: "Sorting, searching, and dynamic programming.", progress: 30, icon: <BookOpen className="text-gnosis-gold" /> },
    { id: 3, name: "System Design", description: "Build scalable architectures.", progress: 0, icon: <Lock className="text-gnosis-muted" />, locked: true },
    { id: 4, name: "Databases", description: "SQL, NoSQL, and caching strategies.", progress: 0, icon: <Lock className="text-gnosis-muted" />, locked: true },
  ];

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto pb-24 md:pb-8">

      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Your Learning Path</h1>
        <p className="text-gnosis-muted">Select a subject to continue your journey.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subjects.map((subject, idx) => (
          <motion.div
            key={subject.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            {subject.locked ? (
              <div className="bg-gnosis-card/50 border border-gnosis-border/50 rounded-2xl p-6 flex items-start gap-4 opacity-75">
                <div className="w-12 h-12 bg-gnosis-bg rounded-xl flex items-center justify-center shrink-0">
                  {subject.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gnosis-muted mb-1 flex items-center gap-2">
                    {subject.name}
                  </h3>
                  <p className="text-sm text-gnosis-muted/70">{subject.description}</p>
                </div>
              </div>
            ) : (
              <Link
                to={`/subject/${subject.id}`}
                className="bg-gnosis-card border border-gnosis-border hover:border-gnosis-purple rounded-2xl p-6 flex flex-col h-full transition-all hover:-translate-y-1"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-gnosis-bg rounded-xl flex items-center justify-center shrink-0">
                    {subject.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{subject.name}</h3>
                    <p className="text-sm text-gnosis-muted">{subject.description}</p>
                  </div>
                  {subject.progress === 100 && <CheckCircle className="text-gnosis-green w-6 h-6" />}
                </div>

                <div className="mt-auto">
                  <div className="flex justify-between text-sm mb-2 font-medium">
                    <span className="text-gnosis-muted">Progress</span>
                    <span className="text-gnosis-purple-light">{subject.progress}%</span>
                  </div>
                  <div className="w-full bg-gnosis-bg rounded-full h-2.5">
                    <div
                      className="bg-gnosis-purple h-2.5 rounded-full"
                      style={{ width: `${subject.progress}%` }}
                    ></div>
                  </div>
                </div>
              </Link>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
