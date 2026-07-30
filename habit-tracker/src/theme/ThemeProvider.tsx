import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppTheme, themes } from './colors';

interface ThemeContextType {
  theme: AppTheme;
  setTheme: (themeId: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<AppTheme>(themes.ocean);

  useEffect(() => {
    const savedThemeId = localStorage.getItem('app_theme');
    if (savedThemeId && themes[savedThemeId]) {
      setThemeState(themes[savedThemeId]);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary-gradient', theme.primaryGradient);
    root.style.setProperty('--secondary-gradient', theme.secondaryGradient);
    root.style.setProperty('--background-color', theme.background);
    root.style.setProperty('--card-bg', theme.cardBg);
    root.style.setProperty('--text-primary', theme.textPrimary);
    root.style.setProperty('--text-secondary', theme.textSecondary);
    root.style.setProperty('--accent-color', theme.accent);
    root.style.setProperty('--success-color', theme.success);
    root.style.setProperty('--error-color', theme.error);
    root.style.setProperty('--glass-border', theme.glassBorder);
    
    localStorage.setItem('app_theme', theme.id);
  }, [theme]);

  const setTheme = (themeId: string) => {
    if (themes[themeId]) {
      setThemeState(themes[themeId]);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useAppTheme must be used within a ThemeProvider');
  }
  return context;
};
