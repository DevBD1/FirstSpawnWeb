
import React, { useState, useEffect } from 'react';
import PixelLoader from './components/PixelLoader';
import Dashboard from './components/Dashboard';
import { AppState } from './types';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.LOADING);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (appState === AppState.LOADING) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setAppState(AppState.LOADED), 800);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 200);
      return () => clearInterval(interval);
    }
  }, [appState]);

  const handleEnter = () => {
    setAppState(AppState.PORTAL);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#00ff41] selection:bg-[#00ff41] selection:text-black">
      {appState === AppState.LOADING && (
        <PixelLoader progress={progress} />
      )}
      
      {appState === AppState.LOADED && (
        <div className="h-screen flex flex-col items-center justify-center animate-pulse">
          <h1 className="text-4xl md:text-6xl mb-8 font-['Press_Start_2P'] text-center px-4 leading-relaxed">
            SYSTEM READY
          </h1>
          <button 
            onClick={handleEnter}
            className="px-8 py-4 border-4 border-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-all duration-300 font-['Press_Start_2P'] text-xl active:scale-95"
          >
            PRESS START
          </button>
        </div>
      )}

      {appState === AppState.PORTAL && (
        <Dashboard />
      )}
    </div>
  );
};

export default App;
