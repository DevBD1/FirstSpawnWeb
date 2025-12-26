
import React from 'react';

interface PixelLoaderProps {
  progress: number;
}

const PixelLoader: React.FC<PixelLoaderProps> = ({ progress }) => {
  const displayProgress = Math.min(Math.floor(progress), 100);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#00ff41 1px, transparent 1px), linear-gradient(90deg, #00ff41 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 w-full max-w-md px-8 text-center">
        {/* Animated Pixel Sprite Placeholder (CSS based) */}
        <div className="mb-12 relative h-16 flex justify-center">
          <div className="w-12 h-12 bg-[#00ff41] animate-bounce relative">
            <div className="absolute top-2 left-2 w-2 h-2 bg-black"></div>
            <div className="absolute top-2 right-2 w-2 h-2 bg-black"></div>
            <div className="absolute bottom-2 left-2 w-8 h-2 bg-black"></div>
          </div>
        </div>

        <h2 className="text-xl md:text-2xl mb-4 font-['Press_Start_2P'] uppercase tracking-widest animate-pulse">
          Initializing...
        </h2>

        {/* Custom Progress Bar */}
        <div className="w-full h-8 border-4 border-[#00ff41] p-1 bg-black mb-4">
          <div 
            className="h-full bg-[#00ff41] transition-all duration-300 ease-out"
            style={{ width: `${displayProgress}%` }}
          />
        </div>

        <div className="flex justify-between font-mono text-lg font-bold">
          <span>MEM_CHK_0x{displayProgress.toString(16).toUpperCase()}</span>
          <span>{displayProgress}%</span>
        </div>

        <div className="mt-12 text-left font-mono text-xs opacity-60">
          <p className="mb-1">> Booting PixelKernel v4.2.0...</p>
          <p className="mb-1">> Loading UI Assets: {displayProgress > 30 ? 'OK' : '...'}</p>
          <p className="mb-1">> Establishing Secure Handshake: {displayProgress > 60 ? 'OK' : '...'}</p>
          <p className="mb-1">> Injecting Pixel Shaders: {displayProgress > 90 ? 'OK' : '...'}</p>
        </div>
      </div>
    </div>
  );
};

export default PixelLoader;
