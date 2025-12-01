import { Accordion, Box, Flex } from '@strapi/design-system';
import { ThemePreset } from '../../../../types';
import ColorPickerField from '../color-picker-field';

type ColorsControlAccordionProps = {
  title: string;
  targetColors: Partial<
    Record<
      keyof ThemePreset,
      {
        label: string;
        value: string | null;
      }
    >
  >;
  onColorChange?: (colorKey: keyof ThemePreset, value: string) => void;
  defaultExpanded?: boolean;
};

export function ColorsControlAccordion({
  title,
  targetColors,
  onColorChange,
  defaultExpanded = false,
}: ColorsControlAccordionProps) {
  return (
    <Box width="100%">
      <Accordion.Root width="100%" defaultValue={defaultExpanded ? 'color-accordion' : undefined}>
        <Accordion.Item value="color-accordion">
          <Accordion.Header>
            <Accordion.Trigger>{title}</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            <Flex
              direction="column"
              alignItems="flex-start"
              gap={2}
              padding={4}
              background="neutral100"
              width="100%"
            >
              {Object.keys(targetColors).map((colorKey) => {
                const targetColor = targetColors[colorKey as keyof ThemePreset];
                return (
                  <ColorPickerField
                    key={colorKey}
                    name={colorKey}
                    label={targetColor?.label}
                    value={targetColor?.value || ''}
                    onChange={(value) => onColorChange?.(colorKey as keyof ThemePreset, value)}
                  />
                );
              })}
            </Flex>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </Box>
  );
}
