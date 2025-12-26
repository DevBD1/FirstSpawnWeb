export interface NavItem {
  label: string;
  href: string;
  isHighlight?: boolean;
}

export interface SocialLink {
  platform: string;
  href: string;
  iconName: 'twitter' | 'discord' | 'github' | 'youtube';
}

export enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  OUTLINE = 'outline',
  GHOST = 'ghost'
}

export enum GameType {
  MINECRAFT = 'Minecraft',
  HYTALE = 'Hytale'
}