export interface AppTheme {
  id: string;
  name: string;
  primaryGradient: string;
  secondaryGradient: string;
  background: string;
  cardBg: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  success: string;
  error: string;
  glassBorder: string;
}

export const themes: Record<string, AppTheme> = {
  ocean: {
    id: 'ocean',
    name: 'Ocean Blue',
    primaryGradient: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
    secondaryGradient: 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)',
    background: '#0f172a',
    cardBg: 'rgba(255, 255, 255, 0.1)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.6)',
    accent: '#38bdf8',
    success: '#4ade80',
    error: '#f87171',
    glassBorder: 'rgba(255, 255, 255, 0.1)',
  },
  purple: {
    id: 'purple',
    name: 'Purple Gradient',
    primaryGradient: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
    secondaryGradient: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)',
    background: '#1e1b4b',
    cardBg: 'rgba(255, 255, 255, 0.08)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.5)',
    accent: '#a78bfa',
    success: '#34d399',
    error: '#fb7185',
    glassBorder: 'rgba(255, 255, 255, 0.1)',
  },
  sunset: {
    id: 'sunset',
    name: 'Sunset Orange',
    primaryGradient: 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)',
    secondaryGradient: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)',
    background: '#450a0a',
    cardBg: 'rgba(255, 255, 255, 0.1)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.6)',
    accent: '#fb923c',
    success: '#fbbf24',
    error: '#ef4444',
    glassBorder: 'rgba(255, 255, 255, 0.15)',
  },
  dark: {
    id: 'dark',
    name: 'Deep Dark',
    primaryGradient: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    secondaryGradient: 'linear-gradient(135deg, #334155 0%, #1e293b 100%)',
    background: '#020617',
    cardBg: 'rgba(255, 255, 255, 0.05)',
    textPrimary: '#f8fafc',
    textSecondary: '#94a3b8',
    accent: '#64748b',
    success: '#22c55e',
    error: '#ef4444',
    glassBorder: 'rgba(255, 255, 255, 0.05)',
  }
};
