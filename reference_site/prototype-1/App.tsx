
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { MOCK_SERVERS } from './data/mockServers';
import { Server, GameType, User } from './types';
import ServerCard from './components/ServerCard';
import PixelButton from './components/PixelButton';
import OwnerAnalytics from './components/OwnerAnalytics';
import { getAIAssistantResponse } from './services/gemini';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'discover' | 'favorites' | 'owner'>('discover');
  const [searchQuery, setSearchQuery] = useState('');
  const [aiInput, setAiInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);

  // Filter logic
  const filteredServers = useMemo(() => {
    let list = MOCK_SERVERS;
    if (activeTab === 'favorites') {
      list = list.filter(s => favorites.includes(s.id));
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(s => 
        s.name.toLowerCase().includes(q) || 
        s.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [activeTab, searchQuery, favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const handleAiAsk = async () => {
    if (!aiInput.trim()) return;
    setIsAiLoading(true);
    const response = await getAIAssistantResponse(aiInput, MOCK_SERVERS);
    setAiResponse(response);
    setIsAiLoading(false);
  };

  return (
    <div className="min-h-screen pb-20 overflow-x-hidden">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#1a1a1a]/90 backdrop-blur-sm border-b-4 border-black px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 pixel-border border-2 flex items-center justify-center text-white pixel-font text-xl">
              F
            </div>
            <div>
              <h1 className="pixel-font text-xl tracking-tighter text-white">FIRSTSPAWN</h1>
              <p className="text-[10px] pixel-font text-gray-500 uppercase">Verified Discovery Node</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <PixelButton 
              variant={activeTab === 'discover' ? 'primary' : 'secondary'} 
              onClick={() => setActiveTab('discover')}
            >
              DISCOVER
            </PixelButton>
            <PixelButton 
              variant={activeTab === 'favorites' ? 'primary' : 'secondary'} 
              onClick={() => setActiveTab('favorites')}
            >
              MY LOOT ({favorites.length})
            </PixelButton>
            <PixelButton 
              variant={activeTab === 'owner' ? 'success' : 'secondary'} 
              onClick={() => setActiveTab('owner')}
            >
              CONSOLE
            </PixelButton>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 mt-8">
        {activeTab === 'owner' ? (
          <div className="space-y-8">
            <header className="flex justify-between items-end border-b-4 border-black pb-4">
              <div>
                <h2 className="pixel-font text-2xl text-green-400">SERVER CONSOLE</h2>
                <p className="text-gray-400">Managing "SkyPixel Skyblock" • Node: US-EAST-1</p>
              </div>
              <PixelButton variant="primary">DEPLOY UPDATE</PixelButton>
            </header>
            <OwnerAnalytics />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar / AI Assistant */}
            <aside className="lg:col-span-1 space-y-6">
              <div className="pixel-border-dark p-4 bg-blue-900/10">
                <h3 className="pixel-font text-xs text-blue-400 mb-4">AI QUEST ASSISTANT</h3>
                <div className="bg-black/60 p-3 h-48 overflow-y-auto mb-4 border border-white/10 text-sm leading-relaxed scrollbar-thin">
                  {isAiLoading ? (
                    <div className="flex items-center gap-2 text-blue-400 italic">
                      <span className="animate-bounce">...</span> Casting scry...
                    </div>
                  ) : (
                    aiResponse || "Greetings, adventurer. Tell me what kind of world you seek. RPG? Vanilla? Survival?"
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <input 
                    type="text"
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    placeholder="Describe your vibe..."
                    className="w-full bg-black border-2 border-gray-800 p-2 text-white pixel-font text-[10px] focus:border-blue-500 outline-none"
                    onKeyDown={(e) => e.key === 'Enter' && handleAiAsk()}
                  />
                  <PixelButton onClick={handleAiAsk} variant="primary" className="w-full">
                    SCRY
                  </PixelButton>
                </div>
              </div>

              <div className="pixel-border-dark p-4">
                <h3 className="pixel-font text-xs text-yellow-500 mb-4">QUICK FILTERS</h3>
                <div className="flex flex-wrap gap-2">
                  {['Survival', 'RPG', 'PvP', 'Creative', 'Tech', 'Economy'].map(tag => (
                    <button 
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="px-2 py-1 bg-gray-800 text-[10px] pixel-font hover:bg-gray-700 transition-colors border border-black"
                    >
                      {tag}
                    </button>
                  ))}
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="px-2 py-1 bg-red-900/50 text-[10px] pixel-font border border-black"
                  >
                    RESET
                  </button>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <section className="lg:col-span-3 space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-black/40 p-4 pixel-border-dark">
                <div className="flex items-center gap-2 flex-1 w-full">
                  <span className="text-xl">🔍</span>
                  <input 
                    type="text"
                    placeholder="Search by name, version, or tags..."
                    className="bg-transparent border-b-2 border-gray-700 flex-1 py-2 outline-none focus:border-blue-500 pixel-font text-xs transition-colors"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-4 text-[10px] pixel-font text-gray-500 whitespace-nowrap">
                  SORT BY: 
                  <select className="bg-black text-white border-2 border-gray-800 p-1">
                    <option>MOST VOTES</option>
                    <option>NEWEST</option>
                    <option>LOWEST PING</option>
                  </select>
                </div>
              </div>

              {filteredServers.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-600 pixel-border-dark border-dashed">
                  <div className="text-4xl mb-4">💀</div>
                  <p className="pixel-font">No servers found in this realm...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                  {filteredServers.map(server => (
                    <ServerCard 
                      key={server.id} 
                      server={server} 
                      onViewDetails={setSelectedServer}
                      isFavorite={favorites.includes(server.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </main>

      {/* Modal for Server Details */}
      {selectedServer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSelectedServer(null)} />
          <div className="relative w-full max-w-2xl pixel-border-dark bg-[#1a1a1a] p-6 animate-in zoom-in duration-200">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="pixel-font text-2xl text-blue-400">{selectedServer.name}</h2>
                <div className="flex gap-2 mt-2">
                  {selectedServer.tags.map(t => (
                    <span key={t} className="bg-blue-900/30 text-[10px] px-2 py-0.5 border border-blue-500/30">{t}</span>
                  ))}
                </div>
              </div>
              <button 
                onClick={() => setSelectedServer(null)}
                className="text-2xl hover:rotate-90 transition-transform"
              >
                ❌
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <img src={selectedServer.thumbnail} alt="" className="w-full aspect-video object-cover pixel-border border-2" />
              <div className="space-y-4">
                <div className="bg-black/50 p-3 border-2 border-black">
                  <div className="text-[10px] pixel-font text-gray-500 mb-2">SERVER ADDRESS</div>
                  <div className="flex items-center justify-between gap-2">
                    <code className="text-yellow-500 font-mono text-lg">{selectedServer.ip}</code>
                    <PixelButton className="!py-1 !px-2 !text-[8px]" onClick={() => navigator.clipboard.writeText(selectedServer.ip)}>COPY</PixelButton>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-green-900/20 p-2 border border-green-500/30">
                    <div className="text-[8px] pixel-font text-green-500">VERSION</div>
                    <div className="text-sm">{selectedServer.version}</div>
                  </div>
                  <div className="bg-purple-900/20 p-2 border border-purple-500/30">
                    <div className="text-[8px] pixel-font text-purple-500">TPS SCORE</div>
                    <div className="text-sm">{selectedServer.performanceScore}/100</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-white/10 pt-4">
              <h4 className="pixel-font text-xs mb-2">Description</h4>
              <p className="text-gray-400 text-sm">{selectedServer.description}</p>
            </div>

            <div className="mt-8 flex gap-4">
              <PixelButton variant="primary" className="flex-1 !py-4">VOTE NOW</PixelButton>
              <PixelButton variant="success" className="flex-1 !py-4" onClick={() => window.open(`https://www.google.com/search?q=${selectedServer.name}+server`, '_blank')}>WEBSITE</PixelButton>
            </div>
          </div>
        </div>
      )}

      {/* Footer Branding */}
      <footer className="mt-20 py-8 border-t-4 border-black bg-[#111] text-center">
        <div className="pixel-font text-xs text-gray-600">
          © 2024 FIRSTSPAWN VERIFIED DISCOVERY PROTOCOL
        </div>
        <div className="mt-4 flex justify-center gap-4 text-gray-500 text-sm">
          <a href="#" className="hover:text-blue-500 transition-colors">API</a>
          <a href="#" className="hover:text-blue-500 transition-colors">LEGAL</a>
          <a href="#" className="hover:text-blue-500 transition-colors">TRUST BADGE</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
