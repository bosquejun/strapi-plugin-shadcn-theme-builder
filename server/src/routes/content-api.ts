export default [
  {
    method: 'GET',
    path: '/presets',
    handler: 'controller.presets',
    config: {
      policies: ['isAuthenticated'],
    },
  },
  {
    method: 'GET',
    path: '/active-theme',
    handler: 'controller.getActiveTheme',
    config: {
      policies: ['isAuthenticated'],
      // auth: false,
    },
  },
  {
    method: 'GET',
    path: '/set-theme/:themeId',
    handler: 'controller.setActiveThemeById',
    config: {
      policies: ['isAuthenticated'],
      // auth: false,
    },
  },
];
