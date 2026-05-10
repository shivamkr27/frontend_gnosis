import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function Home() {
  const subjects = [
    { id: 'c_programming', name: "C Programming" },
    { id: 'python', name: "Python" },
    { id: 'java', name: "Java" },
    { id: 'dsa', name: "Data Structures & Algorithms" },
    { id: 'dbms', name: "DBMS" },
    { id: 'os', name: "Operating Systems" },
    { id: 'dcn', name: "Computer Networks" },
    { id: 'coa', name: "Computer Organization" },
    { id: 'daa', name: "Design & Analysis of Algorithms" },
    { id: 'toc', name: "Theory of Computation" },
    { id: 'engineering_math', name: "Engineering Math" },
    { id: 'digital_electronics', name: "Digital Electronics" },
    { id: 'software_engineering', name: "Software Engineering" },
    { id: 'systemdesign', name: "System Design" },
    { id: 'ooad', name: "Object-Oriented Analysis" },
    { id: 'linux', name: "Linux" },
    { id: 'aws_cloud_mastery', name: "AWS Cloud Mastery" },
    { id: 'docker', name: "Docker" },
    { id: 'kubernetes', name: "Kubernetes" },
    { id: 'cicd', name: "CI/CD" },
    { id: 'terraform', name: "Terraform" },
    { id: 'devsecops', name: "DevSecOps" },
    { id: 'cryptography', name: "Cryptography" },
    { id: 'logical_reasoning', name: "Logical Reasoning" },
    { id: 'quant', name: "Quantitative Aptitude" },
  ];

  const pathNodes = subjects.map((sub, idx) => ({
    id: sub.id,
    name: sub.name,
    status: idx < 3 ? 'completed' : idx === 3 ? 'current' : 'locked',
  }));

  return (
    <div className="max-w-container-max mx-auto px-4 sm:px-10 py-12 md:py-20 relative">
      <section className="flex flex-col items-center relative z-10">
        <div className="text-center mb-16 max-w-2xl">
          <h1 className="text-4xl font-serif font-bold text-gnosis-text mb-4">Architectural Foundation</h1>
          <p className="text-lg text-gnosis-muted">Master the core principles of high-performance system design through our structured academic curriculum.</p>
        </div>

        <div className="relative flex flex-col items-center">
          {/* Vertical Connecting Line */}
          <div className="absolute w-1 h-full bg-gnosis-border/30 left-1/2 -translate-x-1/2 rounded-full overflow-hidden">
             {/* Progress fill to node 4 */}
            <div className="absolute top-0 w-full bg-gnosis-secondary" style={{height: '14%'}}></div>
          </div>

          <div className="space-y-24 w-full max-w-md flex flex-col items-center pb-24">
            {pathNodes.map((node, idx) => {
              const isCompleted = node.status === 'completed';
              const isCurrent = node.status === 'current';
              const isLocked = node.status === 'locked';
              const isLeft = idx % 2 === 0;

              return (
                <div key={node.id} className={`flex items-center gap-8 w-full group ${isLeft ? '' : 'flex-row-reverse text-right'} ${isLocked ? 'opacity-40 grayscale' : ''}`}>

                  {/* Icon Circle */}
                  <Link
                    to={!isLocked ? `/subject/${node.id}` : '#'}
                    className={`relative z-20 flex-shrink-0 flex items-center justify-center border-4 border-gnosis-bg
                      ${isCurrent ? 'w-24 h-24 rounded-full bg-[#f4a261] border-[#f4a261] node-pulse cursor-pointer transform hover:scale-105 transition-transform duration-300 z-30' : ''}
                      ${isCompleted ? 'w-20 h-20 rounded-full bg-gnosis-secondary/20' : ''}
                      ${isLocked ? 'w-20 h-20 rounded-full bg-gnosis-border' : ''}
                    `}
                  >
                    {isCompleted && (
                      <svg className="w-10 h-10 text-gnosis-secondary fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                    )}
                    {isCurrent && (
                      <svg className="w-12 h-12 text-[#4e2600] fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    )}
                    {isLocked && (
                      <svg className="w-8 h-8 text-gnosis-text" viewBox="0 0 24 24"><path fill="currentColor" d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
                    )}
                  </Link>

                  {/* Text Description */}
                  <div className="flex-grow">
                    {isCurrent && <span className="bg-[#ffc499] text-[#4e2600] px-3 py-1 rounded-full text-xs font-bold mb-2 inline-block">CURRENT</span>}
                    <h3 className="text-2xl font-serif font-bold text-gnosis-text">{node.name}</h3>
                    <p className={`text-sm font-semibold tracking-widest uppercase mt-1
                      ${isCompleted ? 'text-gnosis-secondary' : isCurrent ? 'text-[#f4a261]' : 'text-gnosis-text'}
                    `}>
                      {isCompleted ? 'Mastered' : isCurrent ? 'Active' : 'Locked'}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}