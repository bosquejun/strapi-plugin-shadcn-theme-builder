import type { Core } from '@strapi/strapi';
import presetThemes from '../preset-themes';

const service = ({ strapi }: { strapi: Core.Strapi }) => ({
  getWelcomeMessage() {
    return 'Welcome to Strapi 🚀';
  },

  getPresetThemes() {
    const themes = Object.values(presetThemes);
    return themes;
  },
});

export default service;
