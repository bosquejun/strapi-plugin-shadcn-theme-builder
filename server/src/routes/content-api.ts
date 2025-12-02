export default [
  {
    method: 'GET',
    path: '/',
    handler: 'controller.index',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/presets',
    handler: 'controller.presets',
    config: {
      policies: ['isAuthenticated'],
    },
  },
];
