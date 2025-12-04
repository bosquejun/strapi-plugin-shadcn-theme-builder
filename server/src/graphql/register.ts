import { Core } from '@strapi/strapi';
import { PLUGIN_SYSTEM_NAME } from '../constants';
import {
  themeColorsSchema,
  themeFontsSchema,
  themePresetSchema,
  themeRegistryInput,
  themeRegistrySchema,
} from '../schema/theme';
import { validateWithZod, zodToNexusObjectType } from '../utils/zod-graphql';

export default function registerGraphql(strapi: Core.Strapi) {
  const extensionService = strapi.plugin('graphql').service('extension');

  extensionService.use(({ nexus }) => {
    return {
      types: [
        // Generate main type from Zod schema
        zodToNexusObjectType(nexus, 'ShadcnThemeColorSchema', themeColorsSchema),
        zodToNexusObjectType(nexus, 'ShadcnThemeFontSchema', themeFontsSchema),
        zodToNexusObjectType(nexus, 'ShadcnThemePresetSchema', themePresetSchema),
        zodToNexusObjectType(nexus, 'ShadcnThemeRegistryInput', themeRegistryInput),
        zodToNexusObjectType(nexus, 'ShadcnThemeSchema', themeRegistrySchema),

        // ==================== QUERIES ====================

        nexus.extendType({
          type: 'Query',
          definition(t) {
            t.field('activeTheme', {
              type: 'ShadcnThemeSchema',
              async resolve(_parent) {
                const result = await strapi
                  .service(`${PLUGIN_SYSTEM_NAME}.service`)
                  .getActiveTheme(true);

                return validateWithZod(themeRegistrySchema, result, 'active shadcn theme');
              },
            });
          },
        }),
      ],

      // Configure resolvers with proper permission scope
      resolversConfig: {
        'Query.activeTheme': {
          auth: {
            scope: [`${PLUGIN_SYSTEM_NAME}.controller.getActiveTheme`],
          },
        },
        'Query.shadcnThemeBuilderThemes': {
          auth: {
            scope: [`${PLUGIN_SYSTEM_NAME}.controller.getThemes`],
          },
        },
      },
    };
  });
}
