import { ThemePresetInput, ThemeRegistryInput } from '../schema/theme';

export const DEFAULT_FONT_SANS =
  "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'";

export const DEFAULT_FONT_SERIF = 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif';

export const DEFAULT_FONT_MONO =
  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';

const strapiLightTheme: ThemePresetInput = {
  background: '#ffffff',
  foreground: '#212134',
  card: '#ffffff',
  cardForeground: '#212134',
  popover: '#ffffff',
  popoverForeground: '#212134',
  primary: '#4945ff',
  primaryForeground: '#ffffff',
  secondary: '#eaeaef',
  secondaryForeground: '#32324d',
  muted: '#eaeaef',
  mutedForeground: '#666687',
  accent: '#f6f6f9',
  accentForeground: '#4945ff',
  destructive: '#ee5e52',
  destructiveForeground: '#ffffff',
  border: '#eaeaef',
  input: '#eaeaef',
  ring: '#4945ff',
  radius: '0.25rem',
  sidebar: '#f6f6f9',
  sidebarForeground: '#32324d',
  sidebarPrimary: '#4945ff',
  sidebarPrimaryForeground: '#ffffff',
  sidebarAccent: '#eaeaef',
  sidebarAccentForeground: '#4945ff',
  sidebarBorder: '#eaeaef',
  sidebarRing: '#4945ff',
  fontSans: 'Inter, sans-serif',
  fontSerif: 'Source Serif 4, serif',
  fontMono: 'JetBrains Mono, monospace',
  chart1: '#4945ff',
  chart2: '#66b7f1',
  chart3: '#5cb176',
  chart4: '#f29d41',
  chart5: '#ac73e6',
};

const strapiDarkTheme: ThemePresetInput = {
  background: '#212134',
  foreground: '#ffffff',
  card: '#181826',
  cardForeground: '#ffffff',
  popover: '#32324d',
  popoverForeground: '#ffffff',
  primary: '#7b79ff',
  primaryForeground: '#ffffff',
  secondary: '#32324d',
  secondaryForeground: '#c0c0cf',
  muted: '#181826',
  mutedForeground: '#a5a5ba',
  accent: '#4a4a6a',
  accentForeground: '#7b79ff',
  destructive: '#ee5e52',
  destructiveForeground: '#ffffff',
  border: '#4a4a6a',
  input: '#4a4a6a',
  ring: '#7b79ff',
  radius: '0.25rem',
  sidebar: '#181826',
  sidebarForeground: '#c0c0cf',
  sidebarPrimary: '#7b79ff',
  sidebarPrimaryForeground: '#ffffff',
  sidebarAccent: '#4a4a6a',
  sidebarAccentForeground: '#7b79ff',
  sidebarBorder: '#4a4a6a',
  sidebarRing: '#7b79ff',
  fontSans: 'Inter, sans-serif',
  fontSerif: 'Source Serif 4, serif',
  fontMono: 'JetBrains Mono, monospace',
  chart1: '#7b79ff',
  chart2: '#66b7f1',
  chart3: '#5cb176',
  chart4: '#f29d41',
  chart5: '#ac73e6',
};

const defaultTheme: ThemeRegistryInput = {
  light: strapiLightTheme,
  dark: strapiDarkTheme,
  name: 'Default',
  id: 'default',
  source: 'shadcn-theme-builder',
  type: 'built-in',
};

export default defaultTheme;
