
import React from 'react';

interface PixelButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
}

const PixelButton: React.FC<PixelButtonProps> = ({ children, onClick, className = '', variant = 'primary' }) => {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-500 text-white',
    secondary: 'bg-gray-700 hover:bg-gray-600 text-white',
    danger: 'bg-red-600 hover:bg-red-500 text-white',
    success: 'bg-green-600 hover:bg-green-500 text-white',
  };

  return (
    <button 
      onClick={onClick}
      className={`pixel-btn pixel-font text-[10px] uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all duration-75 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default PixelButton;
