import { Field, TextInput } from '@strapi/design-system';
import { useCallback, useId, useMemo, type ChangeEvent } from 'react';
import ColorPickerInput from './color-picker-input';

type ColorPickerFieldProps = {
  name: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  hint?: string;
  error?: string;
};

export function ColorPickerField({
  name,
  value,
  onChange,
  label,
  placeholder,
  disabled,
  required,
  hint,
  error,
}: ColorPickerFieldProps) {
  const displayValue = useMemo(() => value ?? '', [value]);
  const id = useId();

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value ?? '';
      const trimmed = raw.trim();
      if (trimmed === '') {
        onChange('');
        return;
      }
      const withoutHash = trimmed.startsWith('#') ? trimmed.slice(1) : trimmed;
      const hexOnly = withoutHash.replace(/[^0-9a-fA-F]/g, '');
      const six = hexOnly.slice(0, 6);
      const normalized = `#${six}`.toUpperCase();
      onChange(normalized);
    },
    [onChange]
  );

  const handleColorChange = useCallback(
    (hex: string) => {
      onChange(hex.toUpperCase());
    },
    [onChange]
  );

  return (
    <Field.Root id={id} error={error} hint={hint} width="100%">
      {label && <Field.Label>{label}</Field.Label>}
      <TextInput
        name={name}
        value={displayValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        hint={hint}
        error={error}
        startAction={
          <ColorPickerInput
            value={displayValue}
            onChange={handleColorChange}
            disabled={disabled}
            aria-label={label ? `${label} color` : 'Color picker'}
          />
        }
      />
      <Field.Error />
      <Field.Hint />
    </Field.Root>
  );
}

export default ColorPickerField;
