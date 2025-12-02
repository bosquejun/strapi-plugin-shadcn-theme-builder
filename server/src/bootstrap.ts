import type { Core } from '@strapi/strapi';

const bootstrap = ({ strapi }: { strapi: Core.Strapi }) => {
  // Register permission actions.
  const actions = [
    {
      section: 'plugins',
      displayName: 'Access the overview page',
      uid: 'overview.access',
      pluginName: 'shadcn-theme-builder',
    },
    {
      section: 'plugins',
      displayName: 'Access the content manager sidebar',
      uid: 'sidebar.access',
      pluginName: 'shadcn-theme-builder',
    },
  ];

  strapi.admin.services.permission.actionProvider.registerMany(actions);
};

export default bootstrap;
