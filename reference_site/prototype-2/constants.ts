import { NavItem, SocialLink } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Discover', href: '#discover' },
  { label: 'Rankings', href: '#rankings' },
  { label: 'Analytics', href: '#analytics' },
  { label: 'For Owners', href: '#owners', isHighlight: true },
];

export const FOOTER_LINKS = {
  platform: [
    { label: 'About FirstSpawn', href: '#' },
    { label: 'Trust & Verification', href: '#' },
    { label: 'Server Badges', href: '#' },
    { label: 'API Status', href: '#' },
  ],
  legal: [
    { label: 'Terms of Service', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'Acceptable Use', href: '#' },
  ],
  resources: [
    { label: 'Help Center', href: '#' },
    { label: 'Developer API', href: '#' },
    { label: 'Community Guidelines', href: '#' },
    { label: 'Partner Program', href: '#' },
  ]
};

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'Discord', href: '#', iconName: 'discord' },
  { platform: 'Twitter', href: '#', iconName: 'twitter' },
  { platform: 'GitHub', href: '#', iconName: 'github' },
];