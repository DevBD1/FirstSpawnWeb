
export enum GameType {
  MINECRAFT = 'MINECRAFT',
  HYTALE = 'HYTALE'
}

export interface Server {
  id: string;
  name: string;
  game: GameType;
  ip: string;
  port: number;
  version: string;
  description: string;
  tags: string[];
  playersOnline: number;
  maxPlayers: number;
  uptime: number; // percentage
  ping: number; // ms
  performanceScore: number; // 0-100
  verified: boolean;
  thumbnail: string;
  votes: number;
}

export interface User {
  id: string;
  username: string;
  favorites: string[];
  isOwner: boolean;
}

export interface AnalyticsData {
  timestamp: string;
  players: number;
  ping: number;
}
