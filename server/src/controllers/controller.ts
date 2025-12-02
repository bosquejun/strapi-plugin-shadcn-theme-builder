import type { Core } from '@strapi/strapi';

const controller = ({ strapi }: { strapi: Core.Strapi }) => ({
  index(ctx) {
    ctx.body = strapi.plugin('shadcn-theme-builder').service('service').getWelcomeMessage();
  },

  async presets(ctx) {
    const presets = strapi.plugin('shadcn-theme-builder').service('service').getPresetThemes();
    ctx.body = presets;
  },
});

export default controller;
