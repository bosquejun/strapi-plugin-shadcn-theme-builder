import type { Core } from '@strapi/strapi';
import { PLUGIN_ID, PLUGIN_SYSTEM_NAME } from '../constants';
import presetThemes from '../preset-themes';
import { CreateThemeRegistryInput, ThemeRegistryInput, themeRegistryInput } from '../schema/theme';

const ACTIVE_THEME = 'active-theme';

const service = ({ strapi }: { strapi: Core.Strapi }) => ({
  getWelcomeMessage() {
    return 'Welcome to Strapi 🚀';
  },

  async getPresetThemes() {
    const presets = Object.values(presetThemes) as ThemeRegistryInput[];

    const themes: ThemeRegistryInput[] = presets.filter((registry) => {
      const result = themeRegistryInput.safeParse(registry);

      if (result.success) return true;
      else {
        console.warn(`Theme ${registry.id} has invalid value.`);
        console.error('Invalid preset theme:', result.error.format());
      }
    });

    const customThemes = await this.getCustomThemes();

    if (customThemes.length) {
      return [
        ...themes,
        ...customThemes.map((c) => ({
          id: c.themeId,
          name: c.name,
          ...c.theme,
          source: c.source,
          type: c.type || 'custom',
        })),
      ];
    }

    return themes;
  },

  async getActiveTheme(useDefault = false) {
    try {
      let result = await strapi.db.query(`${PLUGIN_SYSTEM_NAME}.${ACTIVE_THEME}`).findOne({
        where: {
          documentId: ACTIVE_THEME,
        },
      });

      if (!result && useDefault) {
        result = {
          documentId: ACTIVE_THEME,
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
      const themes = await this.getPresetThemes();
      const presetTheme = themes.find((registry) => registry.id === id);

      if (!presetTheme) throw new Error('id not found on presets');

      const activeTheme = await this.getActiveTheme();

      let result;

      if (!activeTheme) {
        result = await strapi.db.query(`${PLUGIN_SYSTEM_NAME}.${ACTIVE_THEME}`).create({
          data: {
            documentId: ACTIVE_THEME,
            themeId: id,
            theme: presetTheme,
          },
        });
      } else {
        result = await strapi.db.query(`${PLUGIN_SYSTEM_NAME}.${ACTIVE_THEME}`).update({
          where: {
            documentId: ACTIVE_THEME,
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

  async createTheme(data: CreateThemeRegistryInput) {
    try {
      const [_, count] = await strapi.db.query(`${PLUGIN_SYSTEM_NAME}.theme`).findWithCount({
        where: {
          themeId: {
            $startsWith: data.id,
          },
        },
      });

      if (count > 0 && data.id) {
        data.id = `${data.id}-${count}`;
      }

      const completeData = {
        type: 'custom',
        source: PLUGIN_ID,
        themeId: data.id,
        theme: {
          dark: data.dark,
          light: data.light,
        },
        name: data.name,
      };
      const result = await strapi.db.query(`${PLUGIN_SYSTEM_NAME}.theme`).create({
        data: completeData,
      });

      await this.setActiveThemeById(result.themeId);

      return {
        id: result.themeId,
        name: result.name,
        source: result.source,
        type: result.type,
        ...result.theme,
      };
    } catch (error) {
      strapi.log.error(error);
      throw error;
    }
  },

  async getCustomThemes() {
    try {
      const result = await strapi.db.query(`${PLUGIN_SYSTEM_NAME}.theme`).findMany();

      return result;
    } catch (error) {
      strapi.log.error(error);
      throw error;
    }
  },

  async deleteCustomTheme(id: string) {
    await strapi.db.query(`${PLUGIN_SYSTEM_NAME}.theme`).delete({
      where: {
        themeId: id,
      },
    });

    await this.setActiveThemeById('default');
  },
});

export default service;
