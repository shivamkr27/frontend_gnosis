import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Plus, Save, Trash2, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function HostConfig() {
  const navigate = useNavigate();
  const [quizName, setQuizName] = useState('My Custom Quiz');
  const [questions, setQuestions] = useState([]);

  // Current question editor state
  const [qText, setQText] = useState('');
  const [options, setOptions] = useState([{text: '', isCorrect: false}, {text: '', isCorrect: false}, {text: '', isCorrect: false}, {text: '', isCorrect: false}]);

  const toggleCorrect = (idx) => {
    const newOptions = [...options];
    newOptions[idx].isCorrect = !newOptions[idx].isCorrect;
    setOptions(newOptions);
  };

  const updateOptionText = (idx, val) => {
    const newOptions = [...options];
    newOptions[idx].text = val;
    setOptions(newOptions);
  };

  const saveQuestion = () => {
    if (!qText || options.some(o => !o.text) || !options.some(o => o.isCorrect)) return;
    setQuestions([...questions, { text: qText, options: [...options] }]);
    // Reset form
    setQText('');
    setOptions([{text: '', isCorrect: false}, {text: '', isCorrect: false}, {text: '', isCorrect: false}, {text: '', isCorrect: false}]);
  };

  const deleteQuestion = (idx) => {
    setQuestions(questions.filter((_, i) => i !== idx));
  };

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto h-[calc(100vh-80px)] flex flex-col md:flex-row gap-6">

      {/* Left Panel: Overview & Saved Questions */}
      <div className="w-full md:w-1/3 flex flex-col gap-6">
        <div className="bg-gnosis-card border border-gnosis-border rounded-3xl p-6">
          <h2 className="text-xl font-bold mb-4">Quiz Details</h2>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gnosis-muted mb-2">Quiz Name</label>
            <input
              type="text"
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
              className="w-full bg-gnosis-bg border border-gnosis-border rounded-xl p-3 text-gnosis-text focus:outline-none focus:border-gnosis-purple font-medium"
            />
          </div>
          <div className="flex justify-between items-center bg-gnosis-bg p-4 rounded-xl border border-gnosis-border">
            <span className="font-bold text-gnosis-muted">Total Questions</span>
            <span className="font-black text-xl text-gnosis-purple-light">{questions.length}</span>
          </div>
        </div>

        <div className="bg-gnosis-card border border-gnosis-border rounded-3xl p-6 flex-1 overflow-y-auto min-h-[300px]">
          <h2 className="text-xl font-bold mb-4">Saved Questions</h2>
          {questions.length === 0 ? (
            <div className="text-center text-gnosis-muted py-8 text-sm">
              No questions added yet. Use the editor to add some!
            </div>
          ) : (
            <div className="space-y-3">
              {questions.map((q, idx) => (
                <div key={idx} className="bg-gnosis-bg border border-gnosis-border rounded-xl p-4 relative group">
                  <span className="text-xs font-bold text-gnosis-purple-light mb-1 block">Q{idx + 1}</span>
                  <p className="text-sm font-medium line-clamp-2 pr-6">{q.text}</p>
                  <button
                    onClick={() => deleteQuestion(idx)}
                    className="absolute top-3 right-3 text-gnosis-muted hover:text-gnosis-red opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => navigate('/battle/host/room-123')}
          disabled={questions.length === 0}
          className={`w-full py-4 font-black rounded-xl flex items-center justify-center gap-2 transition-all
            ${questions.length > 0 ? 'bg-gnosis-green hover:bg-gnosis-green/90 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-[1.02]' : 'bg-gnosis-card border border-gnosis-border text-gnosis-muted cursor-not-allowed'}
          `}
        >
          Generate Room Code <Play className="w-5 h-5" />
        </button>
      </div>

      {/* Right Panel: Editor */}
      <div className="w-full md:w-2/3 bg-gnosis-card border border-gnosis-border rounded-3xl p-6 sm:p-8 flex flex-col">
        <h2 className="text-2xl font-black mb-6">Question Editor</h2>

        <div className="mb-6">
          <label className="block text-sm font-bold text-gnosis-muted mb-2">Question Text</label>
          <textarea
            rows="3"
            value={qText}
            onChange={(e) => setQText(e.target.value)}
            placeholder="e.g., What is the time complexity of quicksort in the worst case?"
            className="w-full bg-gnosis-bg border border-gnosis-border rounded-xl p-4 text-gnosis-text focus:outline-none focus:border-gnosis-purple resize-none"
          />
        </div>

        <div className="space-y-4 mb-8 flex-1">
          <label className="block text-sm font-bold text-gnosis-muted">Answer Options (Select correct ones)</label>
          {options.map((opt, idx) => (
            <div key={idx} className={`flex items-center gap-3 bg-gnosis-bg border rounded-xl p-2 pl-4 transition-colors
              ${opt.isCorrect ? 'border-gnosis-green shadow-[0_0_10px_rgba(16,185,129,0.1)]' : 'border-gnosis-border'}
            `}>
              <span className="font-bold text-gnosis-muted w-6">{String.fromCharCode(65 + idx)}.</span>
              <input
                type="text"
                value={opt.text}
                onChange={(e) => updateOptionText(idx, e.target.value)}
                placeholder={`Option ${idx + 1}`}
                className="flex-1 bg-transparent border-none focus:outline-none text-gnosis-text"
              />
              <button
                onClick={() => toggleCorrect(idx)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors
                  ${opt.isCorrect ? 'bg-gnosis-green text-white' : 'bg-gnosis-card text-gnosis-muted hover:text-gnosis-text'}
                `}
              >
                <CheckCircle className={`w-4 h-4 ${opt.isCorrect ? 'fill-current text-white' : ''}`} />
                {opt.isCorrect ? 'Correct' : 'Mark'}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-6 border-t border-gnosis-border flex justify-end">
          <button
            onClick={saveQuestion}
            className="bg-gnosis-purple hover:bg-gnosis-purple/90 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition-transform hover:scale-[1.02]"
          >
            <Save className="w-5 h-5" /> Save Question
          </button>
        </div>

      </div>

    </div>
  );
}
