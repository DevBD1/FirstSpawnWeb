
import React from 'react';
import { Server, GameType } from '../types';
import PixelButton from './PixelButton';

interface ServerCardProps {
  server: Server;
  onViewDetails: (server: Server) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

const ServerCard: React.FC<ServerCardProps> = ({ server, onViewDetails, isFavorite, onToggleFavorite }) => {
  return (
    <div className="pixel-border-dark p-4 flex flex-col gap-4 group hover:scale-[1.02] transition-transform">
      <div className="relative h-40 overflow-hidden border-2 border-black">
        <img 
          src={server.thumbnail} 
          alt={server.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-2 left-2 bg-black/80 px-2 py-1 text-xs pixel-font flex items-center gap-1">
          {server.game === GameType.MINECRAFT ? '⛏️ MC' : '⚔️ HY'}
          <span className="text-[10px] text-gray-400">v{server.version}</span>
        </div>
        {server.verified && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 text-[8px] pixel-font border-2 border-black">
            VERIFIED
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <h3 className="pixel-font text-sm text-blue-400 truncate">{server.name}</h3>
          <button 
            onClick={() => onToggleFavorite(server.id)}
            className={`text-xl ${isFavorite ? 'text-red-500' : 'text-gray-600'} hover:scale-110 transition-transform`}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>
        
        <p className="text-sm text-gray-300 line-clamp-2">{server.description}</p>
        
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="bg-black/50 p-2 border border-white/10 text-center">
            <div className="text-[10px] text-gray-500 uppercase">Uptime</div>
            <div className={`text-lg font-bold ${server.uptime > 99 ? 'text-green-400' : 'text-yellow-400'}`}>
              {server.uptime}%
            </div>
          </div>
          <div className="bg-black/50 p-2 border border-white/10 text-center">
            <div className="text-[10px] text-gray-500 uppercase">Ping</div>
            <div className={`text-lg font-bold ${server.ping < 50 ? 'text-green-400' : 'text-yellow-400'}`}>
              {server.ping}ms
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-auto pt-2 border-t border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-sm text-gray-400">{server.playersOnline}/{server.maxPlayers}</span>
        </div>
        <PixelButton onClick={() => onViewDetails(server)}>
          JOIN
        </PixelButton>
      </div>
    </div>
  );
};

export default ServerCard;
