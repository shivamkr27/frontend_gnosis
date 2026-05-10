import React from 'react';
import { Settings, Zap, Flame, Trophy, BookOpen, Medal } from 'lucide-react';
import { motion } from 'framer-motion';

export function Profile() {

  const achievements = [
    { name: "First Blood", desc: "Win your first battle", unlocked: true },
    { name: "Scholar", desc: "Complete 10 lessons", unlocked: true },
    { name: "Unstoppable", desc: "Win 5 battles in a row", unlocked: false },
  ];

  return (
    <div className="max-w-container-max mx-auto px-margin-desktop py-12 md:py-20 font-body-md text-on-surface selection:bg-primary-container selection:text-on-primary-container min-h-screen bg-background">

      {/* Profile Header Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-10 mb-20">
        <div className="relative">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-primary/30 p-1">
            <img alt="User Profile" className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_V6mLErgmjtwjYGw4IYhN2-EpGe-9TYmxyp2JwUVLy81rZFum2gzx3txam4BARMht7HqfL1MAJA074LQb05ufVYiZwHwHdE6xcn3HEJKET-ReInhWT_3vX-GkqAN5A-DzQ40G5BYSYbZ2fxjzLr2Il03CsVDvuFkNZc8-r0VpOQfQGs7_r0gON1FYMYsV03DzVeGrWOZUFNbRpns9IDCJg4F3gypPI2nkb9LTo6Of6CSCg6a6wr9Lc_UXF2QYPCxkf7XrMtBMxg8"/>
          </div>
          <div className="absolute bottom-2 right-2 bg-primary text-on-primary w-8 h-8 rounded-full flex items-center justify-center border-4 border-background">
            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
          </div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="font-headline-xl text-[48px] font-bold text-on-surface mb-2">Arjun Mehta</h1>
          <p className="font-body-md text-[16px] text-on-surface-variant mb-4">M.Tech Computer Science • Final Year</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            <span className="bg-surface-container-high text-on-surface-variant px-3 py-1 rounded font-label-sm text-[12px] border border-outline-variant/30">Joined Jan 2023</span>
            <span className="bg-secondary-container/20 text-secondary px-3 py-1 rounded font-label-sm text-[12px] border border-secondary/20">Active Researcher</span>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-primary text-on-primary font-label-md text-[14px] font-semibold rounded-lg active:scale-95 transition-all">Edit Profile</button>
          <button className="px-6 py-3 border border-outline-variant text-on-surface font-label-md text-[14px] font-semibold rounded-lg hover:bg-surface-variant/20 transition-all">Share Profile</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
        <div className="bg-surface-container-low border border-outline-variant/20 p-6 rounded-xl flex flex-col justify-between group hover:border-primary/50 transition-all">
          <div className="flex justify-between items-start mb-4">
            <span className="material-symbols-outlined text-primary">local_fire_department</span>
            <span className="font-label-sm text-[12px] font-medium text-on-surface-variant">Total XP</span>
          </div>
          <div className="text-[24px] font-semibold text-primary">12,450</div>
        </div>
        <div className="bg-surface-container-low border border-outline-variant/20 p-6 rounded-xl flex flex-col justify-between group hover:border-primary/50 transition-all">
          <div className="flex justify-between items-start mb-4">
            <span className="material-symbols-outlined text-primary">bolt</span>
            <span className="font-label-sm text-[12px] font-medium text-on-surface-variant">Daily Streak</span>
          </div>
          <div className="text-[24px] font-semibold text-primary">42 Days</div>
        </div>
        <div className="bg-surface-container-low border border-outline-variant/20 p-6 rounded-xl flex flex-col justify-between group hover:border-primary/50 transition-all">
          <div className="flex justify-between items-start mb-4">
            <span className="material-symbols-outlined text-primary">menu_book</span>
            <span className="font-label-sm text-[12px] font-medium text-on-surface-variant">Subjects</span>
          </div>
          <div className="text-[24px] font-semibold text-primary">18 / 24</div>
        </div>
        <div className="bg-surface-container-low border border-outline-variant/20 p-6 rounded-xl flex flex-col justify-between group hover:border-primary/50 transition-all">
          <div className="flex justify-between items-start mb-4">
            <span className="material-symbols-outlined text-primary">public</span>
            <span className="font-label-sm text-[12px] font-medium text-on-surface-variant">Global Rank</span>
          </div>
          <div className="text-[24px] font-semibold text-primary">#142</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Progress Section */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-headline-md text-[24px] font-semibold text-on-surface">Academic Progress</h2>
          </div>
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="font-label-md text-[14px] font-semibold text-on-surface">Quantum Mechanics III</h3>
                  <p className="font-label-sm text-[12px] font-medium text-on-surface-variant">Final Module: Entanglement</p>
                </div>
                <span className="font-label-md text-[14px] font-semibold text-primary">85%</span>
              </div>
              <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="font-label-md text-[14px] font-semibold text-on-surface">Advanced Data Structures</h3>
                  <p className="font-label-sm text-[12px] font-medium text-on-surface-variant">Review Phase: B-Trees</p>
                </div>
                <span className="font-label-md text-[14px] font-semibold text-primary">62%</span>
              </div>
              <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: '62%' }}></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="font-label-md text-[14px] font-semibold text-on-surface">Digital Signal Processing</h3>
                  <p className="font-label-sm text-[12px] font-medium text-on-surface-variant">In Progress: Fourier Series</p>
                </div>
                <span className="font-label-md text-[14px] font-semibold text-primary">40%</span>
              </div>
              <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: '40%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="lg:col-span-1">
          <h2 className="font-headline-md text-[24px] font-semibold text-on-surface mb-6">Achievements</h2>
          <div className="space-y-4">
            {achievements.map((ach, idx) => (
              <motion.div
                key={idx}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 + (idx * 0.1) }}
                className={`flex items-center p-5 rounded-2xl border transition-all ${ach.unlocked ? 'bg-surface-container-low border-outline-variant/30 hover:border-primary/50' : 'bg-surface-container-lowest border-outline-variant/10 opacity-60'}`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mr-5 ${ach.unlocked ? 'bg-primary/20 text-primary' : 'bg-surface-variant text-on-surface-variant'}`}>
                  <Medal className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-label-md text-[14px] font-semibold">{ach.name}</h3>
                  <p className="font-label-sm text-[12px] font-medium text-on-surface-variant mt-1">{ach.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}