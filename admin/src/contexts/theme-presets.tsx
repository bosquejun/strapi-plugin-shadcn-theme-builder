import { Page, useFetchClient, useNotification } from '@strapi/strapi/admin';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useTheme } from 'styled-components';
import { ThemePreset } from '../../../types';
import { BASE_PLUGIN_URL } from '../constants';
import useLocalStorage from '../hooks/use-local-storage';
import pluginPermissions from '../permissions';
import { objectToCssVars } from '../utils/cssVars';

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
  activeTheme: PresetTheme | null;
  currentColorPalette: string[];
  setCurrentTheme: (theme: PresetTheme | null) => void;
  loading: boolean;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  updateCurrentThemeById: (id: string | null) => void;
  updateColorPalette: (colorKey: keyof ThemePreset, value: string) => void;
  setActiveThemeById: (id: string) => void;
};

export function getThemeColorPalette(theme: PresetTheme | null, isDarkMode = false): string[] {
  if (!theme) return [];
  const mode = isDarkMode ? 'dark' : 'light';
  return [
    theme?.[mode].primary,
    theme?.[mode].secondary,
    theme?.[mode].accent,
    theme?.[mode].border,
  ];
}

const Context = createContext<ThemePresetsContext>({
  themes: [],
  currentTheme: null,
  activeTheme: null,
  setCurrentTheme: () => {},
  loading: true,
  currentColorPalette: [],
  isDarkMode: false,
  toggleDarkMode: () => {},
  updateCurrentThemeById: () => {},
  updateColorPalette: () => {},
  setActiveThemeById: () => {},
});

export const ThemePresetsProvider = ({ children }: { children: React.ReactNode }) => {
  const [themes, setThemes] = useState<PresetTheme[]>([]);
  const [currentTheme, setCurrentTheme] = useState<PresetTheme | null>(null);
  const [activeTheme, setActiveTheme] = useState<PresetTheme | null>(null);
  const [loading, setLoading] = useState(true);
  const [mode] = useLocalStorage('STRAPI_THEME', 'dark');
  const [isDarkMode, setIsDarkMode] = useState(mode === 'dark' ? true : false);
  const { toggleNotification } = useNotification();
  const theme = useTheme();
  const { get } = useFetchClient();

  const loadThemes = useCallback(async () => {
    try {
      setLoading(true);
      const response = await get(`${BASE_PLUGIN_URL}/presets`);

      const data = (response?.data || response) as PresetTheme[];
      setThemes(data);

      const activeResponse = await get(`${BASE_PLUGIN_URL}/active-theme`);

      const activeThemeResponse = (activeResponse?.data || activeResponse) as {
        themeId: string;
        theme: PresetTheme;
      };

      setActiveTheme(activeThemeResponse.theme ?? data[0] ?? null);
      setCurrentTheme(activeThemeResponse.theme ?? data[0] ?? null);
    } catch (e) {
      const { message } = e as { message: string };
      toggleNotification({
        type: 'danger',
        message: `Failed to load themes. ${message}.`,
      });
      setThemes([]);
      setCurrentTheme(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadThemes();
  }, [get]);

  const currentColorPalette = useMemo(
    () => getThemeColorPalette(currentTheme, isDarkMode),
    [currentTheme, isDarkMode]
  );

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

  const setActiveThemeById = useCallback(
    async (id: string) => {
      if (currentTheme?.id === id) {
        // no need to update
        return;
      }
      const theme = themes.find((theme) => theme.id === id);
      if (!theme) {
        toggleNotification({
          type: 'danger',
          message: 'Unable to set active theme. Theme ID is not found.',
          title: 'Theme ID not found',
        });
        return;
      }

      const response = await get(`${BASE_PLUGIN_URL}/set-theme/${id}`);

      const data = (response?.data || response) as {
        theme: PresetTheme;
      };

      setActiveTheme(data.theme);
      toggleNotification({
        type: 'success',
        message: 'Successfully activated the theme.',
      });
    },
    [activeTheme]
  );

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
    activeTheme,
    setActiveThemeById,
  };

  return (
    <Context.Provider value={contextValue}>
      <Page.Protect permissions={pluginPermissions.accessOverview}>
        <div style={objectToCssVars(theme.colors as any, 'strapi')}>{children as any}</div>
      </Page.Protect>
    </Context.Provider>
  );
};

export const useThemePresets = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useThemePresets must be used within a ThemePresetsProvider');
  }
  return context;
};
