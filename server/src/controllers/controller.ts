import type { Core } from '@strapi/strapi';

const controller = ({ strapi }: { strapi: Core.Strapi }) => ({
  async presets(ctx) {
    const presets = strapi.plugin('shadcn-theme-builder').service('service').getPresetThemes();
    ctx.body = presets;
  },
  async getActiveTheme(ctx) {
    try {
      const activeTheme = await strapi
        .plugin('shadcn-theme-builder')
        .service('service')
        .getActiveTheme(true);

      ctx.body = activeTheme;
    } catch (error) {
      ctx.throw(500, error);
    }
  },
  async setActiveThemeById(ctx) {
    try {
      const { themeId } = ctx.request.params;

      const theme = await strapi
        .plugin('shadcn-theme-builder')
        .service('service')
        .setActiveThemeById(themeId);

      ctx.body = theme;
    } catch (error) {
      ctx.throw(500, error);
    }
  },
});

export default controller;
