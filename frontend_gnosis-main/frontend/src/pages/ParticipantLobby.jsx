import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { Users, Copy } from "lucide-react";

export default function ParticipantLobby() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [players, setPlayers] = useState([
    { id: 1, name: "You", status: "ready" },
    { id: 2, name: "AlexD", status: "ready" },
    { id: 3, name: "CodeNinja", status: "joining" },
  ]);

  return (
    <Layout>
      <div className="p-4 md:p-8 max-w-4xl mx-auto flex flex-col items-center min-h-[80vh] justify-center">
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-soft border border-surface-variant text-center w-full max-w-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 pointer-events-none jaali-bg mix-blend-multiply" />

          <div className="relative z-10">
            <h2 className="text-xl font-bold text-on-surface-variant mb-2 uppercase tracking-widest">
              Room Code
            </h2>
            <div className="flex items-center justify-center gap-4 mb-10">
              <span className="text-6xl md:text-7xl font-bold text-primary tracking-widest bg-primary-fixed px-6 py-2 rounded-2xl border-4 border-primary/20">
                {code}
              </span>
            </div>

            <div className="inline-block px-6 py-3 rounded-full bg-surface border-2 border-surface-variant text-inverse-surface font-bold text-lg mb-12 animate-pulse shadow-sm">
              Waiting for Host to start...
            </div>

            <div className="text-left">
              <h3 className="font-bold text-lg text-inverse-surface mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-secondary" /> Participants (
                {players.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {players.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-3 p-3 bg-surface rounded-xl border border-surface-variant"
                  >
                    <div className="relative">
                      <div className="w-8 h-8 bg-tertiary-container rounded-full flex items-center justify-center text-white font-bold text-xs">
                        {p.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div
                        className={`absolute -bottom-1 -right-1 w-3 h-3 border-2 border-surface rounded-full ${p.status === "ready" ? "bg-green-500" : "bg-orange-400 animate-pulse"}`}
                      ></div>
                    </div>
                    <span className="font-bold text-sm truncate">{p.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Host only button simulation */}
            <div className="mt-12 pt-8 border-t border-surface-variant">
              <button
                onClick={() => navigate(`/lesson/room-${code}`)}
                className="w-full py-4 bg-primary text-white font-bold text-lg rounded-xl hover:bg-primary-container shadow-soft"
              >
                Start Game (Host Only)
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
