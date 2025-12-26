import React from 'react';

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

export const PixelButton: React.FC<PixelButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "font-pixel text-xl uppercase px-6 py-2 border-4 border-black transition-all active:translate-y-1 active:shadow-none focus:outline-none";
  
  const variants = {
    primary: "bg-retro-green text-black shadow-pixel hover:bg-green-400",
    secondary: "bg-retro-metal text-black shadow-pixel hover:bg-slate-300",
    danger: "bg-retro-accent text-white shadow-pixel hover:bg-red-500",
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export const PixelCard: React.FC<{ children: React.ReactNode; className?: string; title?: string }> = ({ children, className = '', title }) => {
  return (
    <div className={`relative bg-retro-bg border-4 border-black p-1 shadow-pixel-lg ${className}`}>
      {/* Decorative corners */}
      <div className="absolute -top-1 -left-1 w-2 h-2 bg-retro-light z-10"></div>
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-retro-light z-10"></div>
      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-retro-light z-10"></div>
      <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-retro-light z-10"></div>
      
      {/* Inner border container */}
      <div className="border-2 border-retro-metal h-full w-full bg-retro-bg p-4 flex flex-col">
        {title && (
            <div className="mb-4 text-center border-b-2 border-retro-metal pb-2">
                <h2 className="font-pixel text-2xl text-retro-green tracking-widest animate-pulse">{title}</h2>
            </div>
        )}
        {children}
      </div>
    </div>
  );
};

export const RetroOverlay: React.FC = () => (
    <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-overlay" 
         style={{ backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 2px, 3px 100%' }}>
    </div>
);
