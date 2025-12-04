export default [
  {
    method: 'GET',
    path: '/theme/presets',
    handler: 'controller.getPresetThemes',
    config: {
      policies: ['isAuthenticated'],
    },
  },
  {
    method: 'GET',
    path: '/theme/active',
    handler: 'controller.getActiveTheme',
    config: {
      policies: ['isAuthenticated'],
    },
  },
  {
    method: 'POST',
    path: '/theme/activate',
    handler: 'controller.activate',
    config: {
      policies: ['isAuthenticated'],
    },
  },
  {
    method: 'POST',
    path: '/theme',
    handler: 'controller.create',
    config: {
      policies: ['isAuthenticated'],
    },
  },
  {
    method: 'DELETE',
    path: '/theme/:themeId',
    handler: 'controller.delete',
    config: {
      policies: ['isAuthenticated'],
    },
  },
];
