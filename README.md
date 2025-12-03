# shadcn-theme-builder

Shadcn Theme Builder for Strapi is a plugin that brings a visual, real-time customization experience to your Strapi admin panel. Inspired by TweakCN, it allows you to easily generate, edit, and manage Shadcn UI themes without touching code.

# strapi-plugin-shadcn-theme-builder

```typescript
const loadPluginCSS = () => {
  const pluginName = 'shadcn-theme-builder'; // name of the plugin folder

  const cssId = `${pluginName}-styles`;

  // Only add if not already present
  if (!document.getElementById(cssId)) {
    const link = document.createElement('link');
    link.id = cssId;
    link.rel = 'stylesheet';
    link.type = 'text/css';

    // Get the base URL for the admin panel
    // Safely access window and its properties
    const w = window as any;
    const baseUrl = w?.strapi?.backendURL || '';
    const pluginPath = `/admin/src/plugins/${pluginName}/dist/style.css`;
    link.href = `${baseUrl}${pluginPath}`;

    document.head.appendChild(link);
    console.log(`[${pluginName}] Loaded CSS from ${link.href}`);
  }
};
```
