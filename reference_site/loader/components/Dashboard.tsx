
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { GameLore } from '../types';

const Dashboard: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [lore, setLore] = useState<GameLore | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateLore = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate a detailed retro RPG game lore based on this theme: ${prompt}`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              worldName: { type: Type.STRING },
              description: { type: Type.STRING },
              characterClasses: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              mainQuest: { type: Type.STRING }
            },
            required: ["title", "worldName", "description", "characterClasses", "mainQuest"]
          }
        }
      });

      const data = JSON.parse(response.text || '{}');
      setLore(data);
    } catch (err) {
      console.error(err);
      setError("Failed to interface with GameMaster AI. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:py-20 animate-[fadeIn_1s_ease-out]">
      <header className="mb-12 border-b-4 border-[#00ff41] pb-6 flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-5xl font-['Press_Start_2P'] text-[#00ff41] mb-2 tracking-tighter">PIXEL_PORTAL</h1>
          <p className="text-xl opacity-80">v1.0.42_STABLE - Welcome back, Player One.</p>
        </div>
        <div className="text-right font-mono text-sm">
          <p>LOC: 127.0.0.1</p>
          <p>NET: CONNECTED</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Terminal */}
        <section className="lg:col-span-1 space-y-6">
          <div className="bg-[#111] border-2 border-[#00ff41] p-6 shadow-[8px_8px_0px_#00ff41]">
            <h3 className="text-lg font-['Press_Start_2P'] mb-4">QUEST_GENERATOR</h3>
            <p className="mb-4 text-sm opacity-70">Input a theme to generate high-fidelity game lore via the Gemini Neural Engine.</p>
            <textarea
              className="w-full bg-black border-2 border-[#00ff41] p-4 text-[#00ff41] font-mono focus:outline-none focus:ring-2 focus:ring-[#00ff41] resize-none h-32 mb-4"
              placeholder="e.g., A cybernetic jungle inhabited by robotic dinosaurs..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button
              onClick={generateLore}
              disabled={loading}
              className="w-full py-3 bg-[#00ff41] text-black font-['Press_Start_2P'] text-sm hover:bg-white transition-colors disabled:opacity-50 active:translate-y-1"
            >
              {loading ? 'CALCULATING...' : 'EXECUTE'}
            </button>
          </div>

          {error && (
            <div className="bg-red-900 border-2 border-red-500 p-4 text-white font-mono text-sm">
              <span className="font-bold">[ERROR]</span> {error}
            </div>
          )}
        </section>

        {/* Display Output */}
        <section className="lg:col-span-2">
          {lore ? (
            <div className="bg-[#111] border-4 border-[#00ff41] p-8 relative overflow-hidden">
              {/* Background Decor */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
                 <svg viewBox="0 0 100 100" className="fill-current text-[#00ff41]">
                   <rect x="10" y="10" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="5"/>
                   <rect x="30" y="30" width="40" height="40" fill="currentColor"/>
                 </svg>
              </div>

              <div className="mb-8">
                <span className="text-xs bg-[#00ff41] text-black px-2 py-1 font-bold mb-2 inline-block">TITLE_FOUND</span>
                <h2 className="text-3xl md:text-4xl font-['Press_Start_2P'] mb-2">{lore.title}</h2>
                <h4 className="text-xl text-[#00ff41] opacity-90 italic">World: {lore.worldName}</h4>
              </div>

              <div className="space-y-6 font-mono text-lg leading-relaxed">
                <div>
                  <h5 className="font-['Press_Start_2P'] text-xs text-[#00ff41] mb-2 uppercase tracking-widest">Description</h5>
                  <p>{lore.description}</p>
                </div>

                <div>
                  <h5 className="font-['Press_Start_2P'] text-xs text-[#00ff41] mb-2 uppercase tracking-widest">Classes</h5>
                  <div className="flex flex-wrap gap-2">
                    {lore.characterClasses.map((cls, idx) => (
                      <span key={idx} className="border border-[#00ff41] px-3 py-1 text-sm">
                        {cls}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-black/50 p-6 border-l-4 border-[#00ff41]">
                  <h5 className="font-['Press_Start_2P'] text-xs text-[#00ff41] mb-2 uppercase tracking-widest">The Main Quest</h5>
                  <p className="text-white italic">"{lore.mainQuest}"</p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#00ff41]/30 flex justify-between items-center text-xs opacity-50 font-mono">
                <span>TIMESTAMP: {new Date().toLocaleTimeString()}</span>
                <span>ID: LORE_{Math.floor(Math.random()*10000)}</span>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] border-4 border-dashed border-[#00ff41]/30 flex flex-col items-center justify-center text-center p-12 opacity-40">
              <div className="w-24 h-24 mb-6 border-4 border-[#00ff41] flex items-center justify-center animate-spin-slow">
                 <span className="text-4xl font-bold">?</span>
              </div>
              <h3 className="text-2xl font-['Press_Start_2P'] mb-4">Awaiting Input...</h3>
              <p className="font-mono">The database is currently empty. Provide a seed to begin generation.</p>
            </div>
          )}
        </section>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
