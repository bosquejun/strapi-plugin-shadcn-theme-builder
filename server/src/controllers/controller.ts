import slugify from '@sindresorhus/slugify';
import type { Core } from '@strapi/strapi';
import { PLUGIN_ID } from '../constants';
import { createThemeRegistryInput, CreateThemeRegistryInput } from '../schema/theme';

const controller = ({ strapi }: { strapi: Core.Strapi }) => ({
  async getPresetThemes(ctx) {
    const presets = await strapi.plugin(PLUGIN_ID).service('service').getPresetThemes();
    ctx.body = presets;
  },
  async getActiveTheme(ctx) {
    try {
      const activeTheme = await strapi.plugin(PLUGIN_ID).service('service').getActiveTheme(true);

      ctx.body = activeTheme;
    } catch (error) {
      ctx.throw(500, error);
    }
  },
  async activate(ctx) {
    try {
      const { themeId } = ctx.request.body;

      if (!themeId || typeof themeId !== 'string') {
        ctx.throw(401, 'Theme ID is either invalid or not provided.');
        return;
      }

      const theme = await strapi.plugin(PLUGIN_ID).service('service').setActiveThemeById(themeId);

      ctx.body = theme;
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  async create(ctx) {
    const payload = ctx.request.body;

    const validatedBody = createThemeRegistryInput.safeParse(payload);

    if (validatedBody.error) {
      ctx.throw(401, validatedBody.error.message);
      return;
    }

    const slugId =
      payload?.id ||
      slugify(payload.name, {
        lowercase: true,
      });

    const sanitizedPayload: CreateThemeRegistryInput = {
      ...validatedBody.data,
      id: slugId,
    };

    const newTheme = await strapi
      .plugin(PLUGIN_ID)
      .service('service')
      .createTheme(sanitizedPayload);

    ctx.body = newTheme;
  },

  async getThemes(ctx) {
    const themes = await strapi.plugin(PLUGIN_ID).service('service').getCustomThemes();
    ctx.body = themes;
  },

  async delete(ctx) {
    const { themeId } = ctx.request.params;

    if (!themeId || typeof themeId !== 'string') {
      ctx.throw(404, 'Theme ID not found');
      return;
    }

    await strapi.plugin(PLUGIN_ID).service('service').deleteCustomTheme(themeId);

    ctx.body = {
      message: 'successfully deleted theme',
    };
  },
});

export default controller;
