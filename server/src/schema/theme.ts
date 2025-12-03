import { z } from 'zod';

// Regex patterns for different color formats
const hexColorRegex = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/;
const rgbRegex = /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*[\d.]+\s*)?\)$/;
const hslRegex = /^hsla?\(\s*[\d.]+\s*,\s*[\d.]+%\s*,\s*[\d.]+%\s*(,\s*[\d.]+\s*)?\)$/;
const oklchRegex = /^oklch\(\s*[\d.]+%?\s+[\d.]+%?\s+[\d.]+%?\s*(\/\s*[\d.]+%?\s*)?\)$/;
const okLabRegex = /^oklab\(\s*[\d.]+%?\s+[\d.]+%?\s+[\d.]+%?\s*(\/\s*[\d.]+%?\s*)?\)$/;
const lchRegex = /^lch\(\s*[\d.]+%?\s+[\d.]+%?\s+[\d.]+%?\s*(\/\s*[\d.]+%?\s*)?\)$/;
const labRegex = /^lab\(\s*[\d.]+%?\s+[\d.]+%?\s+[\d.]+%?\s*(\/\s*[\d.]+%?\s*)?\)$/;
const cssVarRegex = /^var\(--[\w-]+\)$/;
const hslCssRegex = /^\d+\s+[\d.]+%\s+[\d.]+%$/; // For Tailwind HSL format: "0 0% 100%"

// Regex to validate rem values (e.g., "0.25rem", "1rem", "2.5rem")
const remValueRegex = /^\d+(\.\d+)?rem$/;

// Schema for color (supports multiple formats)
const colorSchema = z
  .string()
  .refine(
    (value) => {
      return (
        hexColorRegex.test(value) ||
        rgbRegex.test(value) ||
        hslRegex.test(value) ||
        hslCssRegex.test(value) ||
        oklchRegex.test(value) ||
        okLabRegex.test(value) ||
        lchRegex.test(value) ||
        labRegex.test(value) ||
        cssVarRegex.test(value)
      );
    },
    {
      message:
        'Must be a valid color format (hex, rgb, hsl, oklch, oklab, lch, lab, or CSS variable)',
    }
  )
  .describe('Color value in any supported format');

// Schema for rem size
const remSizeSchema = z
  .string()
  .regex(remValueRegex, 'Must be a valid rem value (e.g., 0.25rem, 1rem)')
  .describe('Size in rem units');

// Schema for font family string
const fontFamilySchema = z
  .string()
  .min(1, 'Font family cannot be empty')
  .describe('Font family string (e.g., "Inter, sans-serif")');

// ThemeColors schema
export const themeColorsSchema = z.object({
  primary: colorSchema,
  primaryForeground: colorSchema,
  secondary: colorSchema,
  secondaryForeground: colorSchema,
  accent: colorSchema,
  accentForeground: colorSchema,
  background: colorSchema,
  foreground: colorSchema,
  card: colorSchema,
  cardForeground: colorSchema,
  popover: colorSchema,
  popoverForeground: colorSchema,
  muted: colorSchema,
  mutedForeground: colorSchema,
  border: colorSchema,
  input: colorSchema,
  ring: colorSchema,
  destructive: colorSchema,
  destructiveForeground: colorSchema,
  sidebar: colorSchema,
  sidebarForeground: colorSchema,
  sidebarPrimary: colorSchema,
  sidebarPrimaryForeground: colorSchema,
  sidebarAccent: colorSchema,
  sidebarAccentForeground: colorSchema,
  sidebarBorder: colorSchema,
  sidebarRing: colorSchema,
  chart1: colorSchema,
  chart2: colorSchema,
  chart3: colorSchema,
  chart4: colorSchema,
  chart5: colorSchema,
});

// ThemeFonts schema
export const themeFontsSchema = z.object({
  fontSans: fontFamilySchema.optional(),
  fontSerif: fontFamilySchema.optional(),
  fontMono: fontFamilySchema.optional(),
});

// ThemePreset schema (combines colors, fonts, and radius)
export const themePresetSchema = themeColorsSchema.merge(themeFontsSchema).extend({
  radius: remSizeSchema.optional(),
});

// PresetTheme schema (combines light and dark themes with metadata)
export const themeRegistryInput = z.object({
  light: themePresetSchema,
  dark: themePresetSchema,
  name: z.string().min(1, 'Theme name is required'),
  id: z.string().min(1, 'Theme id is required'),
  source: z.string().min(1, 'Theme source is required'),
});

// Type inference from schemas
export type ThemeColorsInput = z.infer<typeof themeColorsSchema>;
export type ThemeFontsInput = z.infer<typeof themeFontsSchema>;
export type ThemePresetInput = z.infer<typeof themePresetSchema>;
export type ThemeRegistryInput = z.infer<typeof themeRegistryInput>;
