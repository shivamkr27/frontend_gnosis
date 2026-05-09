import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check, X } from 'lucide-react';

export function QuizReview() {
  const { levelId } = useParams();
  const navigate = useNavigate();

  const mockReviews = [
    {
      q: "What is the time complexity of pushing to a Stack?",
      userAnswer: "O(1)",
      correctAnswer: "O(1)",
      isCorrect: true
    },
    {
      q: "Which data structure uses LIFO?",
      userAnswer: "Queue",
      correctAnswer: "Stack",
      isCorrect: false
    }
  ];

  return (
    <div className="p-4 sm:p-8 max-w-3xl mx-auto pb-24 md:pb-8">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate(`/lesson/${levelId}/complete`)}
          className="flex items-center text-sm text-gnosis-muted hover:text-gnosis-text"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Results
        </button>
        <h1 className="text-2xl font-bold">Quiz Review</h1>
      </div>

      <div className="space-y-6">
        {mockReviews.map((item, idx) => (
          <div key={idx} className={`p-6 rounded-2xl border ${item.isCorrect ? 'bg-gnosis-green/5 border-gnosis-green/20' : 'bg-gnosis-red/5 border-gnosis-red/20'}`}>
            <h3 className="text-lg font-bold mb-4">{item.q}</h3>

            <div className="space-y-3">
              <div className={`flex items-center justify-between p-3 rounded-xl border ${item.isCorrect ? 'bg-gnosis-green/10 border-gnosis-green text-gnosis-green' : 'bg-gnosis-red/10 border-gnosis-red text-gnosis-red'}`}>
                <span className="font-medium">Your Answer: {item.userAnswer}</span>
                {item.isCorrect ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
              </div>

              {!item.isCorrect && (
                <div className="flex items-center justify-between p-3 rounded-xl border bg-gnosis-green/10 border-gnosis-green text-gnosis-green">
                  <span className="font-medium">Correct Answer: {item.correctAnswer}</span>
                  <Check className="w-5 h-5" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
