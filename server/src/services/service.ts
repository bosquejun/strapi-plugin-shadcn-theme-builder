import type { Core } from '@strapi/strapi';
import presetThemes from '../preset-themes';
import { ThemeRegistryInput, themeRegistryInput } from '../schema/theme';

const service = ({ strapi }: { strapi: Core.Strapi }) => ({
  getWelcomeMessage() {
    return 'Welcome to Strapi 🚀';
  },

  getPresetThemes() {
    const presets = Object.values(presetThemes) as ThemeRegistryInput[];

    const themes: ThemeRegistryInput[] = presets.filter((registry) => {
      const result = themeRegistryInput.safeParse(registry);

      if (result.success) return true;
      else {
        console.warn(`Theme ${registry.id} has invalid value.`);
        console.error('Invalid preset theme:', result.error.format());
      }
    });

    return themes;
  },

  async getActiveTheme(useDefault = false) {
    try {
      // let result = await strapi.documents(`plugin::shadcn-theme-builder.active-theme`).findOne({
      //   documentId: 'active-theme',
      // });
      let result = await strapi.db.query('plugin::shadcn-theme-builder.active-theme').findOne({
        where: {
          documentId: 'active-theme',
        },
      });

      if (!result && useDefault) {
        result = {
          documentId: 'active-theme',
          id: 0,
          themeId: presetThemes.defaultTheme.id,
          theme: presetThemes.defaultTheme,
        };
      }

      return result || null;
    } catch (error) {
      strapi.log.error('Error fetching active theme:', error);
      return null;
    }
  },

  async setActiveThemeById(id: string) {
    try {
      const presetTheme = Object.values(presetThemes).find((registry) => registry.id === id);

      if (!presetTheme) throw new Error('id not found on presets');

      const activeTheme = await this.getActiveTheme();

      let result;

      if (!activeTheme) {
        result = await strapi.db.query(`plugin::shadcn-theme-builder.active-theme`).create({
          data: {
            documentId: 'active-theme',
            themeId: id,
            theme: presetTheme,
          },
        });
      } else {
        result = await strapi.db.query(`plugin::shadcn-theme-builder.active-theme`).update({
          where: {
            documentId: 'active-theme',
          },
          data: {
            themeId: presetTheme.id,
            theme: presetTheme,
          },
        });
      }

      return result;
    } catch (error) {
      strapi.log.error(error);
      throw error;
    }
  },
});

export default service;
