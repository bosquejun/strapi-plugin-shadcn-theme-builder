import {
  Badge,
  Button,
  Combobox,
  ComboboxOption,
  Flex,
  IconButton,
  IconButtonGroup,
  Typography,
} from '@strapi/design-system';
import { ArrowLeft, ArrowRight } from '@strapi/icons';
import { useMemo } from 'react';
import { getThemeColorPalette, useThemePresets } from '../contexts/theme-presets';
import { ColorPalette } from './color-palette';

export function ColorPresetsSelection() {
  const {
    themes,
    currentTheme,
    currentColorPalette,
    updateCurrentThemeById,
    loading,
    activeTheme,
    setActiveThemeById,
  } = useThemePresets();

  const navigationProps = useMemo(() => {
    const currentIndex = themes.findIndex((theme) => theme.id === currentTheme?.id);
    return {
      isFirst: currentIndex === 0,
      isLast: currentIndex === themes.length - 1,
      previousTheme: themes[currentIndex - 1] || null,
      nextTheme: themes[currentIndex + 1] || null,
    };
  }, [themes, currentTheme]);

  const handlePreviousTheme = () => {
    if (navigationProps.previousTheme) {
      updateCurrentThemeById(navigationProps.previousTheme.id);
    }
  };

  const handleNextTheme = () => {
    if (navigationProps.nextTheme) {
      updateCurrentThemeById(navigationProps.nextTheme.id);
    }
  };

  return (
    <>
      <Flex grow={1} width="100%" minWidth="40rem">
        <Combobox
          allowCustomValue
          loading={loading}
          loadingMessage="Loading presets..."
          autocomplete="none"
          value={currentTheme?.id}
          textValue={currentTheme?.name}
          onChange={(id: string | null) => {
            updateCurrentThemeById(id);
          }}
          placeholder={loading ? 'Loading presets...' : 'Select a theme'}
          startIcon={<ColorPalette colors={currentColorPalette} />}
          className="w-full"
        >
          {themes.map((theme) => (
            <ComboboxOption value={theme.id} key={theme.id}>
              <Flex justifyContent="space-between" alignItems="center" width="100%">
                <Flex gap={1}>
                  <ColorPalette colors={getThemeColorPalette(theme)} label={theme.name} />
                  {theme.id === activeTheme?.id && (
                    <Badge size="S" textColor="success500">
                      Active
                    </Badge>
                  )}
                </Flex>
                {theme.id !== 'custom' && <Typography variant="pi">by {theme.source}</Typography>}
              </Flex>
            </ComboboxOption>
          ))}
        </Combobox>
      </Flex>
      <Flex gap={2} flex="none">
        <IconButtonGroup>
          <IconButton
            variant="secondary"
            size="L"
            onClick={handlePreviousTheme}
            disabled={navigationProps.isFirst}
          >
            <ArrowLeft />
          </IconButton>
          <IconButton
            variant="secondary"
            size="L"
            onClick={handleNextTheme}
            disabled={navigationProps.isLast}
          >
            <ArrowRight />
          </IconButton>
        </IconButtonGroup>
        <Button
          size="L"
          variant="secondary"
          onClick={() => {
            if (!currentTheme?.id) return;
            setActiveThemeById(currentTheme?.id!);
          }}
          disabled={currentTheme?.id === activeTheme?.id}
        >
          Set Active Theme
        </Button>
      </Flex>
    </>
  );
}
