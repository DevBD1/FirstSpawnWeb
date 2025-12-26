import React, { useState, useEffect, useCallback } from 'react';
import { PixelCard, PixelButton, RetroOverlay } from './components/PixelComponents';
import { ScrewMechanic } from './components/ScrewMechanic';
import { verifyHumanityWithWit } from './services/gemini';
import { CaptchaState } from './types';

// Icons
const RefreshIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
    <path d="M16 21h5v-5" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default function App() {
  const [rotation, setRotation] = useState(50);
  const [targetRotation, setTargetRotation] = useState(0);
  const [captchaState, setCaptchaState] = useState<CaptchaState>(CaptchaState.IDLE);
  const [statusMessage, setStatusMessage] = useState<string>("ALIGN THE NUT");
  const [attempts, setAttempts] = useState(0);

  // Initialize random target
  const resetCaptcha = useCallback(() => {
    // Target between 100 and 600 degrees to ensure it's "on the screw" well
    const newTarget = Math.floor(Math.random() * 500) + 100;
    
    // Start the user far away from the target
    let startPos = Math.floor(Math.random() * 500) + 100;
    while (Math.abs(startPos - newTarget) < 100) {
        startPos = Math.floor(Math.random() * 500) + 100;
    }

    setTargetRotation(newTarget);
    setRotation(startPos);
    setCaptchaState(CaptchaState.IDLE);
    setStatusMessage("ALIGN THE NUT");
  }, []);

  useEffect(() => {
    resetCaptcha();
  }, [resetCaptcha]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (captchaState === CaptchaState.VERIFYING || captchaState === CaptchaState.SUCCESS) return;
    setRotation(Number(e.target.value));
  };

  const handleVerify = async () => {
    if (captchaState !== CaptchaState.IDLE) return;
    
    setCaptchaState(CaptchaState.VERIFYING);
    setStatusMessage("ANALYZING...");

    const delta = Math.abs(rotation - targetRotation);
    const tolerance = 15; // Degrees tolerance
    const isSuccess = delta <= tolerance;

    // Artificial delay for tension
    await new Promise(resolve => setTimeout(resolve, 800));

    // Get witty message from Gemini
    const message = await verifyHumanityWithWit(isSuccess, delta);

    setStatusMessage(message);
    setCaptchaState(isSuccess ? CaptchaState.SUCCESS : CaptchaState.FAILURE);
    
    if (!isSuccess) {
        setAttempts(p => p + 1);
    }
  };

  return (
    <div className="min-h-screen bg-retro-bg flex flex-col items-center justify-center p-4 font-pixel text-retro-light selection:bg-retro-accent selection:text-white">
      <RetroOverlay />
      
      <div className="max-w-xl w-full flex flex-col gap-8 z-10">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-5xl text-retro-green drop-shadow-[4px_4px_0_rgba(0,0,0,1)] uppercase tracking-widest">
            Pixel Gate
          </h1>
          <p className="text-retro-metal text-xl uppercase tracking-wider">
            Prove your humanity, organic.
          </p>
        </div>

        {/* Game Card */}
        <PixelCard title={captchaState === CaptchaState.SUCCESS ? "ACCESS GRANTED" : "SECURITY CHECK"}>
          
          <div className="flex flex-col gap-6">
            
            {/* Instruction / Status Display */}
            <div className={`
                p-4 border-2 border-black text-center text-2xl uppercase transition-colors duration-300
                ${captchaState === CaptchaState.IDLE ? 'bg-retro-bg text-retro-metal' : ''}
                ${captchaState === CaptchaState.VERIFYING ? 'bg-yellow-900 text-yellow-200 animate-pulse' : ''}
                ${captchaState === CaptchaState.SUCCESS ? 'bg-green-900 text-green-400' : ''}
                ${captchaState === CaptchaState.FAILURE ? 'bg-red-900 text-red-400' : ''}
            `}>
              {statusMessage}
            </div>

            {/* Main Visual */}
            <div className="bg-black/20 p-4 rounded border-2 border-black/50 inner-shadow">
                <ScrewMechanic 
                    rotation={rotation} 
                    targetRotation={targetRotation} 
                    showTarget={captchaState !== CaptchaState.SUCCESS}
                />
            </div>

            {/* Controls */}
            <div className="space-y-4">
                 <div className="flex justify-between text-retro-metal text-lg uppercase">
                    <span>Rotate</span>
                    <span>{Math.round(rotation)}°</span>
                 </div>
                 
                 <input 
                    type="range" 
                    min="0" 
                    max="720" 
                    value={rotation} 
                    onChange={handleSliderChange}
                    className="w-full"
                    disabled={captchaState === CaptchaState.SUCCESS || captchaState === CaptchaState.VERIFYING}
                 />
                 
                 <div className="flex justify-between text-xs text-retro-metal/50 uppercase font-sans">
                    <span>L</span>
                    <span>R</span>
                 </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4 border-t-2 border-retro-metal/20">
                <PixelButton 
                    variant="secondary" 
                    onClick={resetCaptcha}
                    disabled={captchaState === CaptchaState.VERIFYING}
                    className="flex items-center gap-2"
                    title="Reset Puzzle"
                >
                    <RefreshIcon />
                </PixelButton>

                <PixelButton 
                    variant={captchaState === CaptchaState.FAILURE ? "danger" : "primary"}
                    className="flex-1 flex items-center justify-center gap-2"
                    onClick={captchaState === CaptchaState.FAILURE ? resetCaptcha : handleVerify}
                    disabled={captchaState === CaptchaState.VERIFYING || captchaState === CaptchaState.SUCCESS}
                >
                    {captchaState === CaptchaState.VERIFYING ? "PROCESSING..." : 
                     captchaState === CaptchaState.FAILURE ? "RETRY" : 
                     captchaState === CaptchaState.SUCCESS ? "CLEARED" : "VERIFY"}
                    
                    {captchaState === CaptchaState.SUCCESS && <CheckIcon />}
                    {captchaState === CaptchaState.FAILURE && <XIcon />}
                </PixelButton>
            </div>

          </div>
        </PixelCard>

        {/* Footer info */}
        <div className="text-center text-retro-metal/40 text-sm font-sans">
            POWERED BY GEMINI 3 FLASH PREVIEW
            <br/>
            Attempts: {attempts}
        </div>

      </div>
    </div>
  );
}
