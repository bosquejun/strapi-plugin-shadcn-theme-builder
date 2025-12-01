import type { Core } from '@strapi/strapi';

const bootstrap = ({ strapi }: { strapi: Core.Strapi }) => {
  // Modify global CSP to allow external images for this plugin
  try {
    const middlewares = strapi.config.get('middlewares') as any;

    const securityMiddleware = middlewares?.find(
      (middleware) => typeof middleware === 'object' && middleware.name === 'strapi::security'
    );

    if (securityMiddleware?.config?.contentSecurityPolicy?.directives) {
      const imgSrc = securityMiddleware.config.contentSecurityPolicy.directives['img-src'];

      const externalSources = [
        'https://github.com',
        'https://avatars.githubusercontent.com',
        '*.githubusercontent.com',
        'https://images.unsplash.com',
      ];

      // Add sources if not already present
      externalSources.forEach((source) => {
        if (!imgSrc.includes(source)) {
          imgSrc.push(source);
        }
      });

      strapi.log.info('External image sources added to CSP by your-plugin');
    }
  } catch (error) {
    strapi.log.error('Failed to modify CSP:', error);
  }
};

export default bootstrap;
