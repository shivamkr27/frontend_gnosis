import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Lock, CheckCircle, Play } from 'lucide-react';

export function SubjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data for levels
  const levels = [
    { id: 1, name: "Arrays & Strings", status: "completed", stars: 3 },
    { id: 2, name: "Hash Maps", status: "completed", stars: 2 },
    { id: 3, name: "Linked Lists", status: "current", stars: 0 },
    { id: 4, name: "Trees & Graphs", status: "locked", stars: 0 },
    { id: 5, name: "Dynamic Programming", status: "locked", stars: 0 },
  ];

  return (
    <div className="p-4 sm:p-8 max-w-3xl mx-auto pb-24 md:pb-8">

      <button
        onClick={() => navigate('/home')}
        className="flex items-center text-sm text-gnosis-muted hover:text-gnosis-text mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Map
      </button>

      <div className="bg-gnosis-card border border-gnosis-border rounded-3xl p-8 mb-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gnosis-purple to-gnosis-purple-light"></div>
        <h1 className="text-3xl font-extrabold mb-2">Data Structures</h1>
        <p className="text-gnosis-muted mb-6">Master the fundamental building blocks of computer science.</p>

        <div className="flex justify-center items-center gap-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-gnosis-gold">5/15</div>
            <div className="text-xs text-gnosis-muted uppercase tracking-wider font-medium">Stars</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gnosis-purple-light">40%</div>
            <div className="text-xs text-gnosis-muted uppercase tracking-wider font-medium">Progress</div>
          </div>
        </div>
      </div>

      <div className="space-y-4 relative">
        {/* Connection line behind levels */}
        <div className="absolute left-[2.25rem] top-8 bottom-8 w-1 bg-gnosis-border -z-10 hidden sm:block"></div>

        {levels.map((level, idx) => (
          <div key={level.id} className="flex items-center gap-4 sm:gap-6">

            {/* Timeline Node (Hidden on very small screens) */}
            <div className={`hidden sm:flex w-16 h-16 rounded-full border-4 items-center justify-center bg-gnosis-bg z-10 shrink-0
              ${level.status === 'completed' ? 'border-gnosis-green text-gnosis-green' :
                level.status === 'current' ? 'border-gnosis-purple text-gnosis-purple-light shadow-[0_0_15px_rgba(124,58,237,0.5)]' :
                'border-gnosis-border text-gnosis-muted'}
            `}>
              {level.status === 'completed' ? <CheckCircle className="w-6 h-6" /> :
               level.status === 'current' ? <Play className="w-6 h-6 ml-1" /> :
               <Lock className="w-6 h-6" />}
            </div>

            {/* Level Card */}
            <Link
              to={level.status !== 'locked' ? `/lesson/${level.id}` : '#'}
              className={`flex-1 p-5 rounded-2xl border transition-all flex items-center justify-between
                ${level.status === 'locked' ? 'bg-gnosis-card/50 border-gnosis-border/50 opacity-75 cursor-not-allowed' :
                  'bg-gnosis-card border-gnosis-border hover:border-gnosis-purple cursor-pointer'}
              `}
            >
              <div>
                <div className="text-xs font-bold text-gnosis-muted mb-1">LEVEL {level.id}</div>
                <h3 className={`text-lg font-bold ${level.status === 'locked' ? 'text-gnosis-muted' : 'text-gnosis-text'}`}>
                  {level.name}
                </h3>
              </div>

              <div className="flex gap-1">
                {[1, 2, 3].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${star <= level.stars ? 'text-gnosis-gold fill-gnosis-gold' : 'text-gnosis-border fill-gnosis-bg'}`}
                  />
                ))}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
