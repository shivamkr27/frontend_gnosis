import React from 'react';
import { useParams } from 'react-router-dom';
import { Loader2, Users } from 'lucide-react';

export function ParticipantWaiting() {
  const { roomId } = useParams();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <Loader2 className="w-16 h-16 text-gnosis-purple animate-spin mx-auto mb-6" />
        <h2 className="text-2xl font-bold mb-2">Waiting for Host...</h2>
        <p className="text-gnosis-muted">The game will start as soon as the host is ready.</p>
      </div>

      <div className="w-full max-w-md bg-gnosis-card border border-gnosis-border rounded-3xl p-6">
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gnosis-border">
          <span className="font-bold flex items-center gap-2"><Users className="w-5 h-5"/> Players in room</span>
          <span className="text-gnosis-purple-light font-bold">4</span>
        </div>

        <div className="space-y-3">
          {['HostUser (Host)', 'You', 'Player3', 'Player4'].map((p, idx) => (
            <div key={idx} className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-gnosis-bg border border-gnosis-border flex items-center justify-center text-xs font-bold">
                 {p.charAt(0)}
               </div>
               <span className={idx === 1 ? 'font-bold text-gnosis-purple-light' : 'text-gnosis-text'}>{p}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
