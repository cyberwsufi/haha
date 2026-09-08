export type ThemeId =
  | 'neon-protocol'
  | 'panel-mode'
  | 'main-character'
  | 'the-collective'
  | 'starfield-os'
  | 'deadpixel';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  tagline: string;
  description: string;
  preview: {
    bgColor: string;
    accentColor: string;
    textColor: string;
  };
}

export const THEMES: ThemeConfig[] = [
  {
    id: 'neon-protocol',
    name: 'Neon Protocol',
    tagline: 'Cyberpunk',
    description: 'Dark voids. Neon edges. Digital rebellion.',
    preview: { bgColor: '#0a0b10', accentColor: '#00ffcc', textColor: '#f3f4f6' },
  },
  {
    id: 'panel-mode',
    name: 'Panel Mode',
    tagline: 'Comic / Anime',
    description: 'Bold strokes. Pop color. Action frames.',
    preview: { bgColor: '#fffdf7', accentColor: '#ff3366', textColor: '#111827' },
  },
  {
    id: 'main-character',
    name: 'Main Character Energy',
    tagline: 'Portfolio',
    description: 'Warm noir. Gold accents. Architectural precision.',
    preview: { bgColor: '#0c0a09', accentColor: '#d4af37', textColor: '#fafaf9' },
  },
  {
    id: 'the-collective',
    name: 'The Collective',
    tagline: 'Committee / Club',
    description: 'Parchment warmth. Collegiate navy. Structured elegance.',
    preview: { bgColor: '#f8f6f0', accentColor: '#1e3a8a', textColor: '#0f172a' },
  },
  {
    id: 'starfield-os',
    name: 'Starfield OS',
    tagline: 'Constellation',
    description: 'Deep cosmic voids. Nebula purples. Starlight accents.',
    preview: { bgColor: '#030712', accentColor: '#8b5cf6', textColor: '#f8fafc' },
  },
  {
    id: 'deadpixel',
    name: 'Deadpixel',
    tagline: 'Retro 8-bit',
    description: 'CRT glow. Phosphor green. Pixel-perfect blocks.',
    preview: { bgColor: '#18181b', accentColor: '#22c55e', textColor: '#4ade80' },
  },
];
