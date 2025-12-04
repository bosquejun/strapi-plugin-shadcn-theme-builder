const themeRoutes = () => {
  return [
    {
      method: 'GET',
      path: '/theme/presets',
      handler: 'controller.getPresetThemes',
      config: {
        scope: ['controller.getPresetThemes'],
      },
    },
    {
      method: 'GET',
      path: '/theme/active',
      handler: 'controller.getActiveTheme',
      config: {
        scope: ['controller.getActiveTheme'],
      },
    },
    {
      method: 'POST',
      path: '/theme/activate',
      handler: 'controller.activate',
      config: {
        scope: ['controller.activate'],
      },
    },
    {
      method: 'GET',
      path: '/theme',
      handler: 'controller.getThemes',
      config: {
        scope: ['controller.getThemes'],
      },
    },
  ];
};

export default themeRoutes;
