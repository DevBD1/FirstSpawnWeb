import React from 'react';
import { ButtonVariant } from '../types';

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const PixelButton: React.FC<PixelButtonProps> = ({ 
  children, 
  variant = ButtonVariant.PRIMARY, 
  fullWidth = false,
  className = '',
  icon,
  ...props 
}) => {
  
  const baseStyles = "relative inline-flex items-center justify-center font-terminal text-xl uppercase tracking-wider transition-all duration-100 ease-in-out border-2 select-none group active:translate-y-1 active:translate-x-1 active:shadow-pixel-active";
  
  const variants = {
    [ButtonVariant.PRIMARY]: "bg-fs-diamond border-black text-black shadow-pixel hover:bg-[#4dd0e1]",
    [ButtonVariant.SECONDARY]: "bg-fs-stone border-black text-white shadow-pixel hover:bg-[#3d3d3d]",
    [ButtonVariant.OUTLINE]: "bg-transparent border-fs-diamond text-fs-diamond shadow-pixel hover:bg-fs-diamond/10",
    [ButtonVariant.GHOST]: "bg-transparent border-transparent text-gray-400 hover:text-white shadow-none active:translate-y-0 active:translate-x-0"
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className} px-6 py-2`}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};