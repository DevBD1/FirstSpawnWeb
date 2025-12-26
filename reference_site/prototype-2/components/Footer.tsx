import React from 'react';
import { FOOTER_LINKS, SOCIAL_LINKS } from '../constants';
import { PixelButton } from './PixelButton';
import { ButtonVariant } from '../types';
import { ShieldCheck, Activity, Database, Heart, Twitter, Github, Youtube, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-fs-obsidian border-t-8 border-fs-stone relative overflow-hidden">
      {/* Decorative Pixel Grid Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        
        {/* Top Section: CTA & Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 border-b-4 border-gray-800 pb-12">
           <div>
             <h2 className="font-pixel text-xl md:text-2xl text-white mb-4 leading-relaxed">
               Ready to find your <br/><span className="text-fs-diamond">Forever Server?</span>
             </h2>
             <p className="font-terminal text-xl text-gray-400 max-w-md mb-6">
               Stop wasting time on pay-to-win billboards. Discover communities backed by verified uptime and real player retention.
             </p>
             <div className="flex flex-wrap gap-4">
               <PixelButton>Get Started</PixelButton>
               <PixelButton variant={ButtonVariant.OUTLINE}>For Server Owners</PixelButton>
             </div>
           </div>
           
           <div className="flex flex-col justify-center items-start md:items-end space-y-4">
              <div className="bg-[#1a1a1a] p-4 border-2 border-gray-700 shadow-pixel w-full max-w-sm">
                <div className="flex items-center space-x-3 mb-2">
                   <ShieldCheck className="text-fs-grass" />
                   <span className="font-pixel text-xs text-fs-grass">SYSTEM VERIFIED</span>
                </div>
                <div className="space-y-2 font-terminal text-lg text-gray-300">
                   <div className="flex justify-between">
                     <span>Fake Votes Blocked</span>
                     <span className="text-white">100%</span>
                   </div>
                   <div className="flex justify-between">
                     <span>Uptime Verified</span>
                     <span className="text-white">Real-time</span>
                   </div>
                   <div className="flex justify-between">
                     <span>Bot Filters</span>
                     <span className="text-fs-diamond">Active</span>
                   </div>
                </div>
              </div>
           </div>
        </div>

        {/* Main Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          
          <div className="col-span-2 lg:col-span-2">
             <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-fs-diamond border-2 border-black mr-3 shadow-pixel-sm"></div>
                <span className="font-pixel text-white">FIRSTSPAWN</span>
             </div>
             <p className="font-terminal text-lg text-gray-500 mb-6 max-w-xs">
               The infrastructure for reliable voxel multiplayer discovery. We prioritize performance data over paid placements.
             </p>
             <div className="flex space-x-4">
                {SOCIAL_LINKS.map(link => {
                  let Icon = MessageCircle; // Discord fallback
                  if (link.iconName === 'twitter') Icon = Twitter;
                  if (link.iconName === 'github') Icon = Github;
                  if (link.iconName === 'youtube') Icon = Youtube;

                  return (
                    <a 
                      key={link.platform}
                      href={link.href}
                      className="text-gray-400 hover:text-fs-diamond transition-transform hover:-translate-y-1"
                      aria-label={link.platform}
                    >
                      <Icon size={24} />
                    </a>
                  )
                })}
             </div>
          </div>

          <div>
            <h3 className="font-pixel text-xs text-white mb-6 uppercase">Platform</h3>
            <ul className="space-y-3 font-terminal text-xl">
              {FOOTER_LINKS.platform.map(link => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-500 hover:text-fs-diamond transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-pixel text-xs text-white mb-6 uppercase">Resources</h3>
            <ul className="space-y-3 font-terminal text-xl">
              {FOOTER_LINKS.resources.map(link => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-500 hover:text-fs-diamond transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-pixel text-xs text-white mb-6 uppercase">Legal</h3>
            <ul className="space-y-3 font-terminal text-xl">
              {FOOTER_LINKS.legal.map(link => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-500 hover:text-fs-diamond transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t-4 border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-600 font-terminal text-lg">
           <p>© {new Date().getFullYear()} FirstSpawn. Not affiliated with Mojang or Hypixel Studios.</p>
           <div className="flex space-x-6 mt-4 md:mt-0">
              <div className="flex items-center space-x-2">
                <Activity size={16} />
                <span>Systems Normal</span>
              </div>
              <div className="flex items-center space-x-2">
                <Database size={16} />
                <span>v2.4.0</span>
              </div>
              <div className="flex items-center space-x-2 text-fs-redstone">
                 <Heart size={16} fill="currentColor" />
                 <span>Crafted with care</span>
              </div>
           </div>
        </div>
      </div>
    </footer>
  );
};