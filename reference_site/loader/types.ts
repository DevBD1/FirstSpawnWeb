
export interface GameLore {
  title: string;
  worldName: string;
  description: string;
  characterClasses: string[];
  mainQuest: string;
}

export enum AppState {
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  PORTAL = 'PORTAL'
}
