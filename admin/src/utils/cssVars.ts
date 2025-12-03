import { ThemePreset } from '../../../types';

/**
 * Converts an object to CSS custom properties (variables)
 * @param obj - Object with key-value pairs
 * @param prefix - Optional prefix for variable names (default: '')
 * @returns Style object with CSS variables
 */
export function objectToCssVars<T extends ThemePreset>(
  obj: T,
  prefix: string = ''
): Record<string, string | number> {
  return Object.entries(obj).reduce(
    (acc, [key, value]) => {
      // Convert camelCase to kebab-case
      const kebabKey = camelToKebab(key);
      const varName = prefix ? `--${prefix}-${kebabKey}` : `--${kebabKey}`;
      acc[varName] = value;
      return acc;
    },
    {} as Record<string, string | number>
  );
}

/**
 * Converts a camelCase string to kebab-case
 * Example: "primaryForeground" -> "primary-foreground"
 */
function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Converts a theme object to CSS custom properties format
 * @param theme - The theme object to convert
 * @param selector - The CSS selector (default: ":root")
 * @returns CSS string with custom properties
 */
export function themeToCssFileVariables(theme: ThemePreset, selector: string = ':root'): string {
  const cssVars = Object.entries(theme)
    .map(([key, value]) => {
      const kebabKey = camelToKebab(key);
      return `  --${kebabKey}: ${value};`;
    })
    .join('\n');

  return `${selector} {\n${cssVars}\n}`;
}

/**
 * Converts a theme object to CSS custom properties and injects into document
 * @param theme - The theme object to convert
 * @param selector - The CSS selector (default: ":root")
 * @param styleId - ID for the style tag (default: "theme-variables")
 */
export function injectThemeCssFileVariables(
  theme: ThemePreset,
  selector: string = ':root',
  styleId: string = 'theme-variables'
): void {
  const css = themeToCssFileVariables(theme, selector);

  // Remove existing style tag if it exists
  const existingStyle = document.getElementById(styleId);
  if (existingStyle) {
    existingStyle.remove();
  }

  // Create and inject new style tag
  const styleTag = document.createElement('style');
  styleTag.id = styleId;
  styleTag.textContent = css;
  document.head.appendChild(styleTag);
}

/**
 * Converts light and dark themes to CSS with data-theme selector
 * @param lightTheme - Light theme object
 * @param darkTheme - Dark theme object
 * @returns CSS string with both themes
 */
export function themesToCssFileWithModeSelector(
  lightTheme: ThemePreset,
  darkTheme: ThemePreset
): string {
  const lightCss = themeToCssFileVariables(lightTheme, ':root, [data-theme="light"]');
  const darkCss = themeToCssFileVariables(darkTheme, '[data-theme="dark"]');

  return `${lightCss}\n\n${darkCss}`;
}

/**
 * Example usage with light/dark mode media query
 * @param lightTheme - Light theme object
 * @param darkTheme - Dark theme object
 * @returns CSS string with media query support
 */
export function themesToCssFileWithMediaQuery(
  lightTheme: ThemePreset,
  darkTheme: ThemePreset
): string {
  const lightCss = themeToCssFileVariables(lightTheme, ':root');
  const darkCss = themeToCssFileVariables(darkTheme, ':root');

  return `${lightCss}\n\n@media (prefers-color-scheme: dark) {\n${darkCss
    .split('\n')
    .map((line) => (line ? `  ${line}` : ''))
    .join('\n')}\n}`;
}
