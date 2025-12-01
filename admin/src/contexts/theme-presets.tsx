import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ThemePreset } from '../../../types';

export type PresetTheme = {
  light: ThemePreset;
  dark: ThemePreset;
  name: string;
  id: string;
  source: string;
};

type ThemePresetsContext = {
  themes: PresetTheme[];
  currentTheme: PresetTheme | null;
  currentColorPalette: string[];
  setCurrentTheme: (theme: PresetTheme | null) => void;
  loading: boolean;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  updateCurrentThemeById: (id: string | null) => void;
  updateColorPalette: (colorKey: keyof ThemePreset, value: string) => void;
};

export function getThemeColorPalette(theme: PresetTheme | null): string[] {
  if (!theme) return [];
  return [theme.light.primary, theme.light.secondary, theme.light.accent, theme.light.border];
}

const Context = createContext<ThemePresetsContext>({
  themes: [],
  currentTheme: null,
  setCurrentTheme: () => {},
  loading: true,
  currentColorPalette: [],
  isDarkMode: false,
  toggleDarkMode: () => {},
  updateCurrentThemeById: () => {},
  updateColorPalette: () => {},
});

export const ThemePresetsProvider = ({ children }: { children: React.ReactNode }) => {
  const [themes, setThemes] = useState<PresetTheme[]>([]);
  const [currentTheme, setCurrentTheme] = useState<PresetTheme | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const loadThemes = async () => {
      setLoading(true);
      const importedThemes = await import('../preset-themes');
      const _themes = Object.values(importedThemes) as PresetTheme[];
      setThemes(_themes);
      setCurrentTheme(_themes[0]);
      setLoading(false);
    };

    loadThemes();
  }, []);

  const currentColorPalette = useMemo(() => getThemeColorPalette(currentTheme), [currentTheme]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const updateCurrentThemeById = (id: string | null) => {
    const theme = themes.find((theme) => theme.id === id);
    if (theme) {
      setCurrentTheme(theme);
    }
    const removedCustomThemes = themes.filter((theme) => theme.id !== 'custom');
    setThemes([...removedCustomThemes]);
  };

  const updateColorPalette = (colorKey: keyof ThemePreset, value: string) => {
    const updateThemeColors: Partial<PresetTheme> = {
      light: {
        ...((currentTheme?.light || {}) as ThemePreset),
        ...(!isDarkMode ? { [colorKey]: value } : {}),
      },
      dark: {
        ...((currentTheme?.dark || {}) as ThemePreset),
        ...(isDarkMode ? { [colorKey]: value } : {}),
      },
    };
    if (!themes.find((theme) => theme.id === 'custom') && currentTheme?.id !== 'custom') {
      const newTheme = {
        id: 'custom',
        name: 'Custom (Unsaved)',
        ...updateThemeColors,
      } as PresetTheme;
      setThemes([newTheme, ...themes]);
      setCurrentTheme(newTheme);
    } else if (currentTheme?.id === 'custom') {
      const newTheme = {
        ...currentTheme,
        ...updateThemeColors,
      } as PresetTheme;

      const index = themes.findIndex((theme) => theme.id === 'custom');
      if (index !== -1) {
        themes[index] = newTheme;
        setThemes([...themes]);
      } else {
        setThemes([newTheme, ...themes]);
      }

      setCurrentTheme(newTheme);
    }
  };

  const contextValue: ThemePresetsContext = {
    themes,
    currentTheme,
    setCurrentTheme,
    loading,
    currentColorPalette,
    isDarkMode,
    toggleDarkMode,
    updateCurrentThemeById,
    updateColorPalette,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export const useThemePresets = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useThemePresets must be used within a ThemePresetsProvider');
  }
  return context;
};
