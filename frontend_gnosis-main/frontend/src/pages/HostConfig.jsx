import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';

export function HostConfig() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-gnosis-card border border-gnosis-border rounded-3xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Group Quiz</h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gnosis-muted mb-2">Select Subject</label>
            <select className="w-full bg-gnosis-bg border border-gnosis-border rounded-xl p-4 text-gnosis-text focus:outline-none focus:border-gnosis-purple">
              <option>Data Structures</option>
              <option>Algorithms</option>
              <option>React Basics</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gnosis-muted mb-2">Difficulty</label>
            <select className="w-full bg-gnosis-bg border border-gnosis-border rounded-xl p-4 text-gnosis-text focus:outline-none focus:border-gnosis-purple">
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          <button
            onClick={() => navigate('/battle/host/room-123')}
            className="w-full bg-gnosis-purple hover:bg-gnosis-purple/90 text-white rounded-xl py-4 font-bold flex items-center justify-center gap-2 mt-4"
          >
            Generate Room <Play className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
