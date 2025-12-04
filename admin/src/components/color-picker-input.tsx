import { Box, Button, Flex, Popover } from '@strapi/design-system';

import { formatHex } from 'culori';
import { useMemo } from 'react';
import { HexColorPicker } from 'react-colorful';

type ColorPickerInputProps = {
  value: string;
  onChange: (hex: string) => void;
  disabled?: boolean;
  label?: string;
  'aria-label'?: string;
};

export function ColorPickerInput({
  value,
  onChange,
  disabled = false,
  label,
  'aria-label': ariaLabel,
}: ColorPickerInputProps) {
  const hexString = useMemo(() => {
    return formatHex(value);
  }, [value]);

  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button
          variant="ghost"
          aria-label={ariaLabel || label || 'Open color picker'}
          disabled={disabled}
          paddingLeft={0}
          paddingRight={0}
        >
          <Flex gap={2} alignItems="center">
            <Box
              hasRadius
              background="neutral0"
              borderColor="neutral200"
              style={{
                width: 28,
                height: 28,
                boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.08)',
                overflow: 'hidden',
              }}
            >
              <Box
                style={{
                  width: '100%',
                  height: '100%',
                  background: hexString,
                }}
              />
            </Box>
          </Flex>
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        <Box padding={3}>
          <HexColorPicker color={hexString} onChange={(h) => onChange(h.toUpperCase())} />
        </Box>
      </Popover.Content>
    </Popover.Root>
  );
}

export default ColorPickerInput;
