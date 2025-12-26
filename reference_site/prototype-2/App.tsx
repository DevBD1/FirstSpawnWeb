import React from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PixelButton } from './components/PixelButton';
import { ButtonVariant } from './types';
import { Zap, Shield, BarChart3, ChevronRight } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#0d0d0d] selection:bg-fs-diamond selection:text-black">
      <Navbar />

      <main className="flex-grow pt-24 pb-12">
        {/* Hero Section Placeholder to visualize context */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-8 z-10">
              <div className="inline-flex items-center space-x-2 bg-fs-stone/50 border border-gray-700 px-3 py-1 rounded-sm">
                 <span className="w-2 h-2 bg-fs-grass animate-pulse"></span>
                 <span className="font-terminal text-fs-grass uppercase text-lg">Live: 1,204 Verified Servers</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-pixel text-white leading-tight">
                Play Real. <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-fs-diamond to-blue-600">
                  Not Pay-to-Win.
                </span>
              </h1>
              
              <p className="text-xl text-gray-400 font-terminal max-w-lg leading-relaxed">
                The only discovery platform that bans fake votes. 
                Find Minecraft & Hytale servers ranked by technical performance and genuine community love.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <PixelButton className="text-lg py-4">
                   Find a Server
                </PixelButton>
                <PixelButton variant={ButtonVariant.SECONDARY} className="text-lg py-4">
                   View Rankings
                </PixelButton>
              </div>
            </div>

            {/* Visual Abstract Decoration */}
            <div className="relative hidden lg:block h-96">
               <div className="absolute top-10 right-10 w-64 h-64 bg-fs-diamond/10 border-4 border-fs-diamond shadow-pixel rotate-3"></div>
               <div className="absolute top-20 right-28 w-64 h-64 bg-fs-stone border-4 border-black shadow-pixel -rotate-2 flex items-center justify-center">
                  <div className="text-center">
                     <div className="font-pixel text-4xl text-fs-gold mb-2">99.9%</div>
                     <div className="font-terminal text-gray-400 text-xl">Uptime Guarantee</div>
                  </div>
               </div>
            </div>

          </div>
        </section>

        {/* Feature Grid Placeholder */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <FeatureCard 
               icon={<Zap className="text-fs-gold" />}
               title="Performance First"
               desc="We ping every server every 60 seconds. If it lags, it drops. No exceptions."
             />
             <FeatureCard 
               icon={<Shield className="text-fs-diamond" />}
               title="No Bot Votes"
               desc="Our proprietary anti-fraud system ensures every vote comes from a real player."
             />
             <FeatureCard 
               icon={<BarChart3 className="text-fs-redstone" />}
               title="Deep Analytics"
               desc="Owners get player retention charts, not just a visitor counter."
             />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

// Helper component for the placeholder content
const FeatureCard: React.FC<{icon: React.ReactNode, title: string, desc: string}> = ({ icon, title, desc }) => (
  <div className="bg-[#151515] border-2 border-[#222] p-6 hover:border-fs-diamond transition-colors group cursor-default">
    <div className="w-12 h-12 bg-[#222] flex items-center justify-center mb-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform border border-black shadow-[4px_4px_0_0_#000]">
      {icon}
    </div>
    <h3 className="font-pixel text-lg text-white mb-2">{title}</h3>
    <p className="font-terminal text-xl text-gray-500">{desc}</p>
    <div className="mt-4 flex items-center text-fs-diamond opacity-0 group-hover:opacity-100 transition-opacity">
      <span className="font-terminal text-lg mr-2">Learn more</span>
      <ChevronRight size={16} />
    </div>
  </div>
);

export default App;