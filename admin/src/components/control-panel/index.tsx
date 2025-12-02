import { Flex, ScrollArea, Tabs } from '@strapi/design-system';
import { useThemePresets } from '../../contexts/theme-presets';
import { ColorPresetsSelection } from '../color-presets-selection';
import { ColorsControlAccordion } from './colors-control-accordion';

export function ControlPanel() {
  const { currentTheme, updateColorPalette, isDarkMode } = useThemePresets();

  const targetMode = isDarkMode ? 'dark' : 'light';

  return (
    <Flex direction="column" gap={2} width="100%" alignItems="flex-start">
      <Flex gap={2} alignItems="center" width="100%">
        <ColorPresetsSelection />
      </Flex>
      <Flex gap={2} alignItems="center" width="100%">
        <Tabs.Root variant="simple" defaultValue="colors">
          <Tabs.List aria-label="Controls Tabs">
            <Tabs.Trigger value="colors">Colors</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="colors" width="100%" style={{ height: '69dvh', overflowY: 'auto' }}>
            <ScrollArea id="control-panel-scroll-area">
              <Flex paddingTop={4} gap={2} direction="column" width="100%">
                <ColorsControlAccordion
                  onColorChange={updateColorPalette}
                  title="Primary Colors"
                  defaultExpanded
                  targetColors={{
                    primary: {
                      label: 'Primary',
                      value: currentTheme?.[targetMode].primary || null,
                    },
                    primaryForeground: {
                      label: 'Primary Foreground',
                      value: currentTheme?.[targetMode].primaryForeground || null,
                    },
                  }}
                />

                <ColorsControlAccordion
                  title="Secondary Colors"
                  onColorChange={updateColorPalette}
                  defaultExpanded
                  targetColors={{
                    secondary: {
                      label: 'Secondary',
                      value: currentTheme?.[targetMode].secondary || null,
                    },
                    secondaryForeground: {
                      label: 'Secondary Foreground',
                      value: currentTheme?.[targetMode].secondaryForeground || null,
                    },
                  }}
                />

                <ColorsControlAccordion
                  title="Accent Colors"
                  onColorChange={updateColorPalette}
                  targetColors={{
                    accent: {
                      label: 'Accent',
                      value: currentTheme?.[targetMode].accent || null,
                    },
                    accentForeground: {
                      label: 'Accent Foreground',
                      value: currentTheme?.[targetMode].accentForeground || null,
                    },
                  }}
                />

                <ColorsControlAccordion
                  title="Base Colors"
                  onColorChange={updateColorPalette}
                  targetColors={{
                    background: {
                      label: 'Background',
                      value: currentTheme?.[targetMode].background || null,
                    },
                    foreground: {
                      label: 'Foreground',
                      value: currentTheme?.[targetMode].foreground || null,
                    },
                  }}
                />

                <ColorsControlAccordion
                  title="Card Colors"
                  onColorChange={updateColorPalette}
                  targetColors={{
                    card: {
                      label: 'Card Background',
                      value: currentTheme?.[targetMode].card || null,
                    },
                    cardForeground: {
                      label: 'Card Foreground',
                      value: currentTheme?.[targetMode].cardForeground || null,
                    },
                  }}
                />

                <ColorsControlAccordion
                  title="Popover Colors"
                  onColorChange={updateColorPalette}
                  targetColors={{
                    popover: {
                      label: 'Popover Background',
                      value: currentTheme?.[targetMode].popover || null,
                    },
                    popoverForeground: {
                      label: 'Popover Foreground',
                      value: currentTheme?.[targetMode].popoverForeground || null,
                    },
                  }}
                />

                <ColorsControlAccordion
                  title="Muted Colors"
                  onColorChange={updateColorPalette}
                  targetColors={{
                    muted: {
                      label: 'Muted',
                      value: currentTheme?.[targetMode].muted || null,
                    },
                    mutedForeground: {
                      label: 'Muted Foreground',
                      value: currentTheme?.[targetMode].mutedForeground || null,
                    },
                  }}
                />

                <ColorsControlAccordion
                  title="Destructive Colors"
                  onColorChange={updateColorPalette}
                  targetColors={{
                    destructive: {
                      label: 'Destructive',
                      value: currentTheme?.[targetMode].destructive || null,
                    },
                    destructiveForeground: {
                      label: 'Destructive Foreground',
                      value: currentTheme?.[targetMode].destructiveForeground || null,
                    },
                  }}
                />

                <ColorsControlAccordion
                  title="Border & Input Colors"
                  onColorChange={updateColorPalette}
                  targetColors={{
                    border: {
                      label: 'Border',
                      value: currentTheme?.[targetMode].border || null,
                    },
                    input: {
                      label: 'Input',
                      value: currentTheme?.[targetMode].input || null,
                    },
                    ring: {
                      label: 'Ring',
                      value: currentTheme?.[targetMode].ring || null,
                    },
                  }}
                />
              </Flex>
            </ScrollArea>
          </Tabs.Content>
        </Tabs.Root>
      </Flex>
    </Flex>
  );
}
