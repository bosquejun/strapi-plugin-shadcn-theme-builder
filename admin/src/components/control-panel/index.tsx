import slugify from '@sindresorhus/slugify';
import {
  Button,
  Dialog,
  Divider,
  Field,
  Flex,
  IconButton,
  IconButtonGroup,
  ScrollArea,
  Tabs,
  Typography,
} from '@strapi/design-system';
import { Pencil, Trash } from '@strapi/icons';
import { useState } from 'react';
import { useThemePresets } from '../../contexts/theme-presets';
import { ColorsControlAccordion } from './colors-control-accordion';

export function ControlPanel() {
  const [field, setField] = useState<{ id: string; name: string }>({
    name: '',
    id: '',
  });
  const {
    currentTheme,
    updateColorPalette,
    isDarkMode,
    discardCustomTheme,
    saveCustomTheme,
    deleteCustomTheme,
  } = useThemePresets();

  const targetMode = isDarkMode ? 'dark' : 'light';

  return (
    <Flex direction="column" gap={2} width="100%" alignItems="flex-start">
      <Flex gap={2} alignItems="center" justifyContent="space-between" width="100%">
        <Typography>Control Panel</Typography>
        <Flex gap={1}>
          {currentTheme?.type === 'custom' && (
            <IconButtonGroup>
              <IconButton label="Edit">
                <Pencil />
              </IconButton>
              <Dialog.Root>
                <Dialog.Trigger>
                  <IconButton label="Delete" variant="danger">
                    <Trash />
                  </IconButton>
                </Dialog.Trigger>
                <Dialog.Content>
                  <Dialog.Header>Confirmation</Dialog.Header>
                  <Dialog.Body>
                    <Field.Root width="100%">
                      <Field.Label>
                        Are you sure you want to delete {currentTheme.name}?
                      </Field.Label>
                    </Field.Root>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.Cancel>
                      <Button fullWidth variant="tertiary">
                        Cancel
                      </Button>
                    </Dialog.Cancel>
                    <Dialog.Action onClick={deleteCustomTheme}>
                      <Button fullWidth variant="danger-light">
                        Confirm
                      </Button>
                    </Dialog.Action>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog.Root>
            </IconButtonGroup>
          )}

          {currentTheme?.type === 'new' && (
            <Button variant="danger-light" onClick={discardCustomTheme}>
              Discard Changes
            </Button>
          )}
          <Dialog.Root>
            <Dialog.Trigger>
              <Button variant="secondary" disabled={currentTheme?.type !== 'new'}>
                Save Custom Theme
              </Button>
            </Dialog.Trigger>
            <Dialog.Content>
              <Dialog.Header>Save new theme</Dialog.Header>
              <Dialog.Body>
                <Field.Root width="100%" required>
                  <Field.Label>Theme name</Field.Label>
                  <Field.Input
                    type="text"
                    placeholder="Awesome Theme"
                    onChange={(e: any) => {
                      setField({
                        id: slugify(e.target.value),
                        name: e.target.value,
                      });
                    }}
                  />
                </Field.Root>
                <Field.Root width="100%">
                  <Field.Label>Slug</Field.Label>
                  <Field.Input
                    type="text"
                    value={field.id}
                    pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
                    oninput="this.value = this.value.replace(/\s+/g, '-')"
                    onChange={(e: any) => {
                      // const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
                      const slug = e.target.value;
                      // if (!slugRegex.test(slug)) return;
                      setField({
                        ...field,
                        id: slug,
                      });
                    }}
                  />
                </Field.Root>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.Cancel>
                  <Button fullWidth variant="tertiary">
                    Cancel
                  </Button>
                </Dialog.Cancel>
                <Dialog.Action
                  onClick={() => {
                    saveCustomTheme(field);
                  }}
                >
                  <Button fullWidth variant="danger-light">
                    Save
                  </Button>
                </Dialog.Action>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Root>
        </Flex>
      </Flex>
      <Divider width="100%" />
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
