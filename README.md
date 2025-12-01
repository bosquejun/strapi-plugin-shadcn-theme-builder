# shadcn-theme-builder

Strapi plugin to generate Shadcn UI themes
# strapi-plugin-shadcn-theme-builder



``` typescript

const loadPluginCSS = () => {
	const pluginName = "shadcn-theme-builder"; // name of the plugin folder

	const cssId = `${pluginName}-styles`;

	// Only add if not already present
	if (!document.getElementById(cssId)) {
		const link = document.createElement("link");
		link.id = cssId;
		link.rel = "stylesheet";
		link.type = "text/css";

		// Get the base URL for the admin panel
		// Safely access window and its properties
		const w = window as any;
		const baseUrl = w?.strapi?.backendURL || "";
		const pluginPath = `/admin/src/plugins/${pluginName}/dist/style.css`;
		link.href = `${baseUrl}${pluginPath}`;

		document.head.appendChild(link);
		console.log(`[${pluginName}] Loaded CSS from ${link.href}`);
	}
};
```