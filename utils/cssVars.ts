/**
 * Converts an object to CSS custom properties (variables)
 * @param obj - Object with key-value pairs
 * @param prefix - Optional prefix for variable names (default: '')
 * @returns Style object with CSS variables
 */
function objectToCssVars<T extends Record<string, string | number>>(
  obj: T,
  prefix: string = ''
): Record<string, string | number> {
  return Object.entries(obj).reduce(
    (acc, [key, value]) => {
      // Convert camelCase to kebab-case
      const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      const varName = prefix ? `--${prefix}-${kebabKey}` : `--${kebabKey}`;
      acc[varName] = value;
      return acc;
    },
    {} as Record<string, string | number>
  );
}
