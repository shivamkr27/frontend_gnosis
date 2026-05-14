import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../lib/api";
import { useAuthStore , useAppStore } from "../lib/store";
import { motion } from "framer-motion";
import { ArrowLeft, Play, Lock, CheckCircle2, Flame, RotateCcw, Trophy, Target } from "lucide-react";


// Hardcoded skills based on subject
const subjectSkills = {
  'AWS Cloud Mastery': ['VPC Architecture', 'IAM Policies', 'Cloud Security', 'EC2 & S3 Basics', 'Serverless Compute'],
  'CI/CD & GitOps': ['Pipelines', 'Git Branching', 'ArgoCD', 'Automated Testing', 'Deployment Strategies'],
  'COA': ['Digital Logic', 'Memory Hierarchy', 'CPU Architecture', 'I/O Organization', 'Pipelining'],
  'Cryptography (Ciphers & Numericals)': ['Encryption Algorithms', 'Public Key Infrastructure', 'Hashing', 'Digital Signatures', 'Cryptanalysis'],
  'C Programming': ['Memory Management', 'Pointers', 'Data Types', 'File I/O', 'Structs & Unions'],
  'Algorithms (DAA)': ['Big O Analysis', 'Dynamic Programming', 'Graph Traversal', 'Sorting Algorithms', 'Greedy Methods'],
  'DBMS': ['ER Modeling', 'Normalization', 'SQL Optimization', 'Transactions (ACID)', 'Indexing'],
  'Computer Networks (DCN)': ['OSI Model', 'TCP/IP', 'Routing Protocols', 'Subnetting', 'Network Security'],
  'DevSecOps': ['Security Scanning', 'Threat Modeling', 'Compliance as Code', 'Vulnerability Management', 'Secret Management'],
  'Microprocessors': ['8085 Architecture', 'Assembly Language', 'Addressing Modes', 'Interrupt Handling', 'Interfacing'],
  'Docker & Containers': ['Containerization', 'Dockerfiles', 'Volume Management', 'Networking', 'Image Optimization'],
  'Data Structures': ['Arrays & Linked Lists', 'Trees & Graphs', 'Hash Tables', 'Stacks & Queues', 'Heaps'],
  'Discrete Mathematics': ['Set Theory', 'Combinatorics', 'Graph Theory', 'Logic & Proofs', 'Relations & Functions'],
  'Java Development': ['JVM Architecture', 'OOP Principles', 'Collections Framework', 'Multithreading', 'Exception Handling'],
  'Kubernetes (K8s)': ['Pod Lifecycle', 'Services & Ingress', 'ConfigMaps & Secrets', 'Deployments', 'Cluster Management'],
  'Linux': ['Shell Scripting', 'File Permissions', 'Process Management', 'Text Processing (grep/awk)', 'System Administration'],
  'Logical Reasoning': ['Pattern Recognition', 'Deductive Logic', 'Analytical Thinking', 'Problem Solving', 'Data Interpretation'],
  'Object Oriented Design (OOAD)': ['SOLID Principles', 'Design Patterns', 'UML Modeling', 'Class Diagrams', 'Code Refactoring'],
  'Operating Systems (OS)': ['Process Scheduling', 'Memory Management', 'File Systems', 'Concurrency', 'Deadlocks'],
  'Python Programming': ['Data Types', 'Decorators', 'Generators', 'Object-Oriented Python', 'Exception Handling'],
  'Quantitative Ability': ['Probability', 'Statistics', 'Algebra', 'Geometry', 'Number Theory'],
  'Software Engineering': ['SDLC Models', 'Agile Methodologies', 'Requirements Engineering', 'Software Testing', 'Version Control'],
  'System Design': ['Scalability', 'Load Balancing', 'Microservices', 'Database Sharding', 'Caching Strategies'],
  'Terraform (IaC)': ['Infrastructure as Code', 'State Management', 'Modules', 'Providers', 'Provisioners'],
  'TOC': ['Finite Automata', 'Regular Expressions', 'Context-Free Grammars', 'Turing Machines', 'Computability Theory']
};

const getSkillsForSubject = (subjectName) => {
    return subjectSkills[subjectName] || ['Fundamentals', 'Advanced Concepts', 'Problem Solving', 'Application', 'Theory'];
};


export default function SubjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(true);
  const imageMap = useAppStore(state => state.imageMap);

  useEffect(() => {
  // Wait until user is loaded
  if (!user) {
    return;
  }

  const fetchDetail = async () => {
    try {
      setLoading(true);

      const [contentRes, progRes] = await Promise.all([
        api.get(`/content/subjects/${id}`),
        api.get(`/progress/${user.id}/subject/${id}`),
      ]);

      // Merge content levels with progress status
      const mergedLevels = contentRes.data.levels.map((l) => {
        const p = progRes.data.levels.find(
          (pl) => pl.level_id === l.id
        );

        return {
          ...l,
          status: p ? p.status : "locked",
          xp_earned: p ? p.xp_earned : 0,
        };
      });

      setSubject({
        ...contentRes.data,
        levels: mergedLevels,
      });

    } catch (err) {
      console.error("Failed to fetch subject details:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchDetail();

}, [id, user]);

  if (loading || !subject)
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </Layout>
    );

  const completedCount = subject.levels.filter(
    (l) => l.status === "complete",
  ).length;
  const progressPercent = (completedCount / subject.levels.length) * 100;

  const skills = getSkillsForSubject(subject.name);
  const mascotUrl = imageMap?.[subject.name] || `https://api.dicebear.com/7.x/bottts/svg?seed=${subject.name}`;

  return (
    <Layout>
      <div className="p-4 md:p-8 max-w-5xl mx-auto">
        {/* Header Section */}
        <button
          onClick={() => navigate("/home")}
          className="flex items-center gap-2 text-[#8a8a8a] hover:text-[#1a1a1a] transition-colors font-bold mb-6"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Map
        </button>

        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-[#E8DFD1] relative overflow-hidden mb-8 flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="flex-1">
            <div className="inline-block px-4 py-1.5 bg-[#FAF7F2] text-[#8B2500] font-bold text-sm rounded-full mb-4 border border-[#E8DFD1]">
              Computer Science Fundamentals
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#1a1a1a] mb-4">
              {subject.name}
            </h1>
            <p className="text-[#6b6b6b] text-lg leading-relaxed mb-8 max-w-2xl">
              {subject.description}
            </p>

            <div className="w-full max-w-md">
              <div className="flex justify-between mb-2">
                <span className="font-bold text-[#1a1a1a]">Course Progress</span>
                <span className="font-bold text-[#8B2500]">{Math.round(progressPercent)}%</span>
              </div>
              <div className="w-full h-3 bg-[#FAF7F2] rounded-full overflow-hidden border border-[#E8DFD1]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  className="h-full bg-gradient-to-r from-[#D4641A] to-[#8B2500]"
                />
              </div>
            </div>
          </div>

          <div className="hidden md:block w-48 h-48 flex-shrink-0 relative">
            <img
                src={mascotUrl}
                alt={`${subject.name} Mascot`}
                className="w-full h-full object-cover rounded-2xl shadow-md border-2 border-[#E8DFD1]"
                onError={(e) => { e.target.src = `https://api.dicebear.com/7.x/bottts/svg?seed=${subject.name}`; }}
            />
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Modules */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-extrabold text-[#1a1a1a] mb-4">Learning Modules</h2>

            {subject.levels.map((level, idx) => {
              const isLocked = level.status === "locked";
              const isComplete = level.status === "complete";
              const isCurrent = !isLocked && !isComplete;

              return (
                <motion.div
                  key={level.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => !isLocked && navigate(`/lesson/${level.id}`)}
                  className={`bg-white rounded-2xl p-6 border-2 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                      isCurrent
                        ? "border-[#D4641A] shadow-md cursor-pointer"
                        : isComplete
                            ? "border-[#E8DFD1] hover:border-[#8a8a8a] cursor-pointer"
                            : "border-transparent bg-[#FAF7F2]/50 opacity-70"
                  }`}
                >
                  <div className="flex items-start gap-5 flex-1">
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isComplete
                          ? "bg-[#FAF7F2] text-[#6b6b6b] border border-[#E8DFD1]"
                          : isCurrent
                            ? "bg-[#FFF4E5] text-[#D4641A] border-2 border-[#D4641A]"
                            : "bg-[#E8DFD1] text-[#8a8a8a]"
                      }`}
                    >
                      {isComplete ? (
                        <CheckCircle2 className="w-7 h-7" />
                      ) : isCurrent ? (
                        <Play className="w-6 h-6 fill-current" />
                      ) : (
                        <Lock className="w-6 h-6 opacity-75" />
                      )}
                    </div>

                    <div>
                      {isCurrent && (
                          <span className="text-xs font-bold text-[#D4641A] uppercase tracking-wider mb-1 block">Current Module</span>
                      )}
                      <h3
                        className={`text-xl font-bold mb-2 ${isLocked ? "text-[#8a8a8a]" : "text-[#1a1a1a]"}`}
                      >
                        {level.topic}
                      </h3>
                      <p className={`text-sm ${isLocked ? "text-[#8a8a8a]" : "text-[#6b6b6b]"}`}>
                         Master core concepts related to {level.topic.toLowerCase()}.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-shrink-0 justify-end md:justify-center w-full md:w-auto">
                      {isComplete && (
                          <button className="px-6 py-2 rounded-xl font-bold border-2 border-[#E8DFD1] text-[#6b6b6b] hover:bg-[#FAF7F2] hover:text-[#1a1a1a] transition-all">
                              Review
                          </button>
                      )}
                      {isCurrent && (
                          <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#D4641A] to-[#a84a0c] text-white font-bold shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">
                              Continue
                          </button>
                      )}
                      {isLocked && (
                          <span className="text-sm font-bold italic text-[#8a8a8a]">Complete previous to unlock</span>
                      )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Sidebar Stats & Info */}
          <div className="space-y-6">

            {/* Streak Tracker */}
            <div className="bg-[#FAF7F2] rounded-3xl p-6 border border-[#E8DFD1] text-center">
              <div className="flex justify-center mb-3">
                 <Flame className="w-12 h-12 text-[#D4641A]" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#1a1a1a] mb-1">
                 {user?.streak_count || 0} Day Streak
              </h3>
              <p className="text-[#6b6b6b] font-medium mb-6">
                 You're on fire, {user?.username}!
              </p>

              <div className="flex justify-between items-center gap-2 px-2">
                 {['M','T','W','T','F','S','S'].map((day, i) => (
                    <div
                        key={i}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                            i < Math.min(user?.streak_count || 0, 7)
                                ? "bg-[#8B2500] text-white"
                                : "bg-[#E8DFD1] text-[#8a8a8a]"
                        }`}
                    >
                        {day}
                    </div>
                 ))}
              </div>
            </div>

            {/* Skills Acquired */}
            <div className="bg-white rounded-3xl p-6 border border-[#E8DFD1] shadow-sm">
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-5">Skills Acquired</h3>
                <div className="flex flex-wrap gap-2">
                    {skills.map((skill, i) => (
                        <div key={i} className="px-4 py-2 bg-[#FAF7F2] border border-[#E8DFD1] rounded-full text-sm font-bold text-[#8B2500]">
                            {skill}
                        </div>
                    ))}
                </div>
            </div>

            {/* Badge Card */}
            <div className="bg-[#8B2500] rounded-3xl p-6 shadow-md text-white">
                <Trophy className="w-8 h-8 text-[#FFF4E5] mb-4" />
                <h3 className="text-xl font-bold mb-2">Subject Master</h3>
                <p className="text-[#f0dac2] text-sm mb-6 leading-relaxed">
                    Earn this badge by completing all modules and finishing the final assessment in this course.
                </p>
                <div className="w-full py-3 bg-white text-[#8B2500] font-bold rounded-xl text-center shadow-sm">
                    FAQ / Info
                </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}
