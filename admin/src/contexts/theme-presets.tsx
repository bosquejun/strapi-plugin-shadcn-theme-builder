import slugify from '@sindresorhus/slugify';
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
  type: 'built-in' | 'custom' | 'new';
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
  discardCustomTheme: () => void;
  saveCustomTheme: (payload: Pick<PresetTheme, 'name' | 'id'>) => Promise<void>;
  deleteCustomTheme: () => Promise<void>;
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

const Context = createContext<ThemePresetsContext | null>(null);

const partialCustomThemeProps: Partial<PresetTheme> = {
  id: 'custom',
  name: 'Custom (Unsaved)',
  type: 'new',
};

export const ThemePresetsProvider = ({ children }: { children: React.ReactNode }) => {
  const [themes, setThemes] = useState<PresetTheme[]>([]);
  const [currentTheme, setCurrentTheme] = useState<PresetTheme | null>(null);
  const [activeTheme, setActiveTheme] = useState<PresetTheme | null>(null);
  const [loading, setLoading] = useState(true);
  const [mode] = useLocalStorage('STRAPI_THEME', 'dark');
  const [isDarkMode, setIsDarkMode] = useState(mode === 'dark' ? true : false);
  const { toggleNotification } = useNotification();
  const theme = useTheme();
  const { get, post, del } = useFetchClient();

  const loadThemes = useCallback(async () => {
    try {
      setLoading(true);
      const response = await get(`${BASE_PLUGIN_URL}/theme/presets`);

      const data = (response?.data || response) as PresetTheme[];

      const unsavedTheme = window.localStorage.getItem('unsaved-theme');

      if (unsavedTheme) {
        data.unshift(JSON.parse(unsavedTheme));
      }

      setThemes(data);

      const activeResponse = await get(`${BASE_PLUGIN_URL}/theme/active`);

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

  useEffect(() => {
    if (currentTheme?.type !== 'new') return;
    window.localStorage.setItem('unsaved-theme', JSON.stringify(currentTheme));
  }, [currentTheme]);

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
    // const removedCustomThemes = themes.filter((theme) => theme.id !== 'custom');
    setThemes([...themes]);
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

    debugger;
    if (!themes.find((theme) => theme.type === 'new')) {
      const newTheme = {
        ...partialCustomThemeProps,
        ...updateThemeColors,
      } as PresetTheme;
      setThemes([newTheme, ...themes]);
      setCurrentTheme(newTheme);
    } else {
      const newTheme = {
        ...currentTheme,
        ...updateThemeColors,
      } as PresetTheme;

      const index = themes.findIndex((theme) => theme.id === newTheme.id);
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

      const response = await post(`${BASE_PLUGIN_URL}/theme/activate`, { themeId: id });

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

  const discardCustomTheme = () => {
    window.localStorage.removeItem('unsaved-theme');
    const removedCustomThemes = themes.filter((theme) => theme.id !== 'custom');
    setThemes([...removedCustomThemes]);
    setCurrentTheme(activeTheme);
  };

  const saveCustomTheme = async (payload: Pick<PresetTheme, 'name' | 'id'>) => {
    if (!currentTheme) return;
    const { type, source, id, ...requestPayload } = currentTheme;
    await post(`${BASE_PLUGIN_URL}/theme/`, {
      ...requestPayload,
      name: payload.name,
      id: slugify(payload.id),
    });
    window.localStorage.removeItem('unsaved-theme');
    await loadThemes();
    toggleNotification({
      type: 'success',
      message: 'Successfully saved new theme',
    });
  };

  const deleteCustomTheme = async () => {
    if (!currentTheme) return;
    await del(`${BASE_PLUGIN_URL}/theme/${currentTheme?.id}`);
    toggleNotification({
      type: 'success',
      message: 'Successfully deleted theme',
    });
    await loadThemes();
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
    activeTheme,
    setActiveThemeById,
    discardCustomTheme,
    saveCustomTheme,
    deleteCustomTheme,
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
