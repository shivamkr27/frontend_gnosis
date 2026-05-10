import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function Home() {
  // Generate 25 subjects for the learning path
  const subjects = [
    "Data Structures I", "Discrete Math", "Memory Management", "Compiler Design",
    "OS Kernels", "Concurrency", "Distributed Systems", "Database Internals",
    "Computer Networks", "Cryptography", "Algorithm Design", "Machine Learning",
    "Neural Networks", "Deep Learning", "Computer Vision", "Natural Language Processing",
    "Reinforcement Learning", "Quantum Computing", "Information Theory", "Cloud Architecture",
    "DevOps Practices", "Microservices", "System Design", "Advanced Algorithms", "Theoretical Computer Science"
  ];

  const pathNodes = subjects.map((name, index) => {
    let status = 'locked';
    if (index < 3) status = 'completed';
    else if (index === 3) status = 'current';

    return {
      id: index + 1,
      name,
      status,
    };
  });

  return (
    <div className="bg-background text-on-surface font-body-md selection:bg-primary-container selection:text-on-primary-container min-h-screen relative">
      <main className="max-w-container-max mx-auto px-margin-desktop py-12 md:py-20 relative">

        {/* Floating Stats Panel (Asymmetric Design) */}
        <aside className="hidden lg:block absolute left-margin-desktop top-20 w-64 space-y-8">
          <div className="border-l-2 border-primary pl-6 py-2">
            <h3 className="font-headline-md text-[24px] font-semibold text-primary mb-1">Global Rank</h3>
            <p className="text-on-surface font-headline-xl text-[48px] font-bold">#412</p>
            <p className="font-label-sm text-[12px] font-medium text-on-surface-variant uppercase tracking-widest mt-2">Top 5% of Engineers</p>
          </div>
          <div className="p-6 bg-surface-container border border-outline-variant/20 rounded-lg">
            <p className="font-label-md text-[14px] font-semibold text-secondary-fixed mb-2 uppercase">NEXT MILESTONE</p>
            <h4 className="font-headline-md text-[24px] font-semibold text-on-surface mb-4">Neural Networks</h4>
            <div className="w-full bg-surface-variant h-1 rounded-full overflow-hidden">
              <div className="bg-secondary h-full w-[65%]"></div>
            </div>
            <p className="font-label-sm text-[12px] font-medium text-on-surface-variant mt-2 text-right">65% Progress</p>
          </div>
        </aside>

        <section className="flex flex-col items-center relative z-10">
          {/* Header Section */}
          <div className="text-center mb-16 max-w-2xl">
            <h1 className="font-headline-xl text-[48px] font-bold text-on-surface mb-4">Architectural Foundation</h1>
            <p className="font-body-lg text-[18px] text-on-surface-variant">Master the core principles of high-performance system design through our structured academic curriculum.</p>
          </div>

          {/* Path Container */}
          <div className="relative flex flex-col items-center">
            {/* Connecting Vertical Line */}
            <div className="absolute w-1 h-full bg-outline-variant/30 left-1/2 -translate-x-1/2 rounded-full overflow-hidden">
              <div className="absolute top-0 w-full bg-secondary" style={{ height: '14%' }}></div>
            </div>

            {/* Learning Nodes */}
            <div className="space-y-24 w-full max-w-md flex flex-col items-center">
              {pathNodes.map((node, index) => {
                const isLeft = index % 2 === 0;

                if (node.status === 'completed') {
                  return (
                    <Link to={`/subject/${node.id}`} key={node.id} className={`flex items-center ${isLeft ? '' : 'flex-row-reverse'} gap-8 w-full group hover:scale-[1.02] transition-transform`}>
                      <div className="relative z-20 flex-shrink-0 w-20 h-20 rounded-full bg-secondary-container flex items-center justify-center border-4 border-surface-dim">
                        <span className="material-symbols-outlined text-on-secondary-container text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      </div>
                      <div className={`flex-grow ${isLeft ? '' : 'text-right'}`}>
                        <h3 className="font-headline-md text-[24px] font-semibold text-on-surface">{node.name}</h3>
                        <p className="font-label-md text-[14px] font-semibold text-secondary uppercase tracking-widest">Mastered</p>
                      </div>
                    </Link>
                  );
                }

                if (node.status === 'current') {
                  return (
                    <Link to={`/subject/${node.id}`} key={node.id} className={`flex items-center ${isLeft ? '' : 'flex-row-reverse'} gap-8 w-full group`}>
                      <div className="relative z-30 flex-shrink-0 w-24 h-24 rounded-full bg-primary-container flex items-center justify-center border-4 border-primary shadow-[0_0_20px_rgba(244,162,97,0.4)] cursor-pointer transform hover:scale-105 transition-transform duration-300">
                        <span className="material-symbols-outlined text-on-primary-container text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                      </div>
                      <div className={`flex-grow ${isLeft ? '' : 'text-right'}`}>
                        <span className="bg-primary text-on-primary px-3 py-1 rounded-full font-label-sm text-[12px] font-medium mb-2 inline-block">CURRENT</span>
                        <h3 className="font-headline-md text-[24px] font-semibold text-on-surface">{node.name}</h3>
                        <p className="font-label-md text-[14px] font-semibold text-primary uppercase tracking-widest">In Progress</p>
                      </div>
                    </Link>
                  );
                }

                // locked
                return (
                  <div key={node.id} className={`flex items-center ${isLeft ? '' : 'flex-row-reverse'} gap-8 w-full opacity-40 grayscale group`}>
                    <div className="relative z-20 flex-shrink-0 w-20 h-20 rounded-full bg-surface-container-highest flex items-center justify-center border-4 border-surface-dim">
                      <span className="material-symbols-outlined text-on-surface-variant text-3xl">lock</span>
                    </div>
                    <div className={`flex-grow ${isLeft ? '' : 'text-right'}`}>
                      <h3 className="font-headline-md text-[24px] font-semibold text-on-surface-variant">{node.name}</h3>
                      <p className="font-label-md text-[14px] font-semibold text-on-surface-variant uppercase tracking-widest">Unit {node.id}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}