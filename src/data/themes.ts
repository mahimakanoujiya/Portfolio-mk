/**
 * Theme configuration and preset palettes for Mahima Kanoujiya Portfolio
 */

export interface ThemeColors {
  id: string;
  name: string;
  bgPrimary: string;
  bgSurface: string;
  bgSurfaceElevated: string;
  primary: string;
  secondary: string;
  accent: string;
  lavender: string;
  textPrimary: string;
  textSecondary: string;
  borderSubtle: string;
  borderActive: string;
  glowPrimary: string;
  glowSecondary: string;
}

export const THEME_PRESETS: Record<string, ThemeColors> = {
  'cyber-nebula': {
    id: 'cyber-nebula',
    name: 'Cyber Nebula (Default)',
    bgPrimary: '#070817',
    bgSurface: '#0c1026',
    bgSurfaceElevated: '#131838',
    primary: '#925CFF', // Electric violet (accent/buttons)
    secondary: '#55E6FF', // Icy cyan (accents/labels/details)
    accent: '#D8C49A', // Champagne gold
    lavender: '#C4B5FD', // Soft lavender
    textPrimary: '#F5F5FF',
    textSecondary: '#CCD0EB',
    borderSubtle: 'rgba(85, 230, 255, 0.14)',
    borderActive: 'rgba(85, 230, 255, 0.45)',
    glowPrimary: 'rgba(85, 230, 255, 0.18)',
    glowSecondary: 'rgba(146, 92, 255, 0.18)',
  },
  'emerald-dimension': {
    id: 'emerald-dimension',
    name: 'Emerald Dimension',
    bgPrimary: '#04130E',
    bgSurface: '#0B221B',
    bgSurfaceElevated: '#113329',
    primary: '#10B981', // Emerald
    secondary: '#34D399', // Mint / seafoam
    accent: '#F59E0B', // Amber
    lavender: '#A7F3D0', // Soft mint
    textPrimary: '#F0FDF4',
    textSecondary: '#94A3B8',
    borderSubtle: 'rgba(16, 185, 129, 0.2)',
    borderActive: 'rgba(52, 211, 153, 0.45)',
    glowPrimary: 'rgba(16, 185, 129, 0.28)',
    glowSecondary: 'rgba(52, 211, 153, 0.25)',
  },
  'cosmic-rose': {
    id: 'cosmic-rose',
    name: 'Cosmic Rose',
    bgPrimary: '#140810',
    bgSurface: '#220F1D',
    bgSurfaceElevated: '#31162a',
    primary: '#EC4899', // Pink / Rose
    secondary: '#F43F5E', // Coral rose
    accent: '#FBBF24', // Warm amber
    lavender: '#FBCFE8', // Soft pink
    textPrimary: '#FFF1F2',
    textSecondary: '#A8A29E',
    borderSubtle: 'rgba(236, 72, 153, 0.2)',
    borderActive: 'rgba(244, 63, 94, 0.45)',
    glowPrimary: 'rgba(236, 72, 153, 0.28)',
    glowSecondary: 'rgba(244, 63, 94, 0.25)',
  },
};

const THEME_STORAGE_KEY = 'mk_portfolio_theme_data';

export function applyThemeToDOM(theme: ThemeColors) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.style.setProperty('--bg-primary', theme.bgPrimary);
  root.style.setProperty('--bg-surface', theme.bgSurface);
  root.style.setProperty('--bg-surface-elevated', theme.bgSurfaceElevated);
  root.style.setProperty('--color-primary', theme.primary);
  root.style.setProperty('--color-secondary', theme.secondary);
  root.style.setProperty('--color-accent', theme.accent);
  root.style.setProperty('--color-lavender', theme.lavender);
  root.style.setProperty('--text-primary', theme.textPrimary);
  root.style.setProperty('--text-secondary', theme.textSecondary);
  root.style.setProperty('--border-subtle', theme.borderSubtle);
  root.style.setProperty('--border-active', theme.borderActive);
  root.style.setProperty('--glow-primary', theme.glowPrimary);
  root.style.setProperty('--glow-secondary', theme.glowSecondary);
}

export function saveTheme(theme: ThemeColors) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
  } catch (e) {
    console.warn('Unable to persist theme to localStorage', e);
  }
}

export function loadSavedTheme(): ThemeColors {
  if (typeof window === 'undefined') return THEME_PRESETS['cyber-nebula'];
  try {
    const raw = localStorage.getItem(THEME_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.primary && parsed.bgPrimary) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Unable to parse saved theme', e);
  }
  return THEME_PRESETS['cyber-nebula'];
}
