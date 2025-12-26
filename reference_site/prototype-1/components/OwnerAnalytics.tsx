
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { AnalyticsData } from '../types';

const mockData: AnalyticsData[] = Array.from({ length: 24 }).map((_, i) => ({
  timestamp: `${i}:00`,
  players: Math.floor(Math.random() * 500) + 100,
  ping: Math.floor(Math.random() * 20) + 15
}));

const OwnerAnalytics: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="pixel-border-dark p-4 bg-blue-900/20">
          <div className="text-[10px] pixel-font text-blue-400 mb-1">Total Conversions</div>
          <div className="text-3xl font-bold">1,284</div>
          <div className="text-xs text-green-400">+12% from last week</div>
        </div>
        <div className="pixel-border-dark p-4 bg-purple-900/20">
          <div className="text-[10px] pixel-font text-purple-400 mb-1">Engagement Rate</div>
          <div className="text-3xl font-bold">78.4%</div>
          <div className="text-xs text-green-400">+5.2% from last week</div>
        </div>
        <div className="pixel-border-dark p-4 bg-yellow-900/20">
          <div className="text-[10px] pixel-font text-yellow-400 mb-1">Trust Score</div>
          <div className="text-3xl font-bold">99.2</div>
          <div className="text-xs text-gray-400 italic">Technically verified</div>
        </div>
      </div>

      <div className="pixel-border-dark p-6 bg-black/40">
        <h3 className="pixel-font text-lg mb-6 border-b border-white/10 pb-2">Player Retention (24h)</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockData}>
              <defs>
                <linearGradient id="colorPlayers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="timestamp" stroke="#666" fontSize={12} tickLine={false} />
              <YAxis stroke="#666" fontSize={12} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111', border: '1px solid #444', borderRadius: '4px' }}
                itemStyle={{ color: '#3b82f6' }}
              />
              <Area type="monotone" dataKey="players" stroke="#3b82f6" fillOpacity={1} fill="url(#colorPlayers)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="pixel-border-dark p-6 bg-black/40">
        <h3 className="pixel-font text-lg mb-6 border-b border-white/10 pb-2">Network Stability (Avg Ping)</h3>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="timestamp" stroke="#666" fontSize={12} tickLine={false} />
              <YAxis stroke="#666" fontSize={12} tickLine={false} domain={[0, 50]} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111', border: '1px solid #444', borderRadius: '4px' }}
                itemStyle={{ color: '#ef4444' }}
              />
              <Line type="stepAfter" dataKey="ping" stroke="#ef4444" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default OwnerAnalytics;
