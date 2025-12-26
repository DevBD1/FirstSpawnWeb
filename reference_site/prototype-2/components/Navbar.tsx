import React, { useState, useEffect } from 'react';
import { Menu, X, Box, Search, User } from 'lucide-react';
import { PixelButton } from './PixelButton';
import { NAV_ITEMS } from '../constants';
import { ButtonVariant } from '../types';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-4 ${
        isScrolled 
          ? 'bg-fs-obsidian/95 backdrop-blur-md border-fs-stone py-2' 
          : 'bg-transparent border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo Section */}
          <div className="flex items-center cursor-pointer group">
            <div className="relative w-10 h-10 mr-3 transition-transform group-hover:scale-110 duration-200">
               <div className="absolute inset-0 bg-fs-diamond shadow-pixel-sm border-2 border-black"></div>
               <Box className="absolute inset-0 m-auto text-black w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-pixel text-white text-sm md:text-base leading-tight tracking-tighter">
                FIRST<span className="text-fs-diamond">SPAWN</span>
              </span>
              <span className="font-terminal text-gray-400 text-xs hidden md:block">
                Discovery Protocol
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`font-terminal text-xl uppercase tracking-wide transition-colors relative group ${
                  item.isHighlight ? 'text-fs-diamond' : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-fs-diamond transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative group">
               <input 
                 type="text" 
                 placeholder="Search servers..." 
                 className="bg-fs-stone border-2 border-black text-white px-3 py-2 pl-9 font-terminal w-48 focus:w-64 transition-all focus:outline-none focus:border-fs-diamond shadow-[2px_2px_0_0_#000]"
               />
               <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
            </div>
            
            <PixelButton variant={ButtonVariant.SECONDARY} className="!px-3 !py-2">
              <User className="w-5 h-5" />
            </PixelButton>
            
            <PixelButton>
              Join
            </PixelButton>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-fs-diamond transition-colors p-2"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-fs-obsidian border-b-4 border-fs-stone shadow-2xl animate-in slide-in-from-top-5 duration-200">
          <div className="px-4 py-6 space-y-4">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block font-terminal text-2xl text-gray-200 hover:text-fs-diamond hover:translate-x-2 transition-all border-b border-gray-800 pb-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 flex flex-col space-y-3">
               <PixelButton variant={ButtonVariant.SECONDARY} fullWidth icon={<Search size={18} />}>
                 Search
               </PixelButton>
               <PixelButton variant={ButtonVariant.PRIMARY} fullWidth>
                 Login / Register
               </PixelButton>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};