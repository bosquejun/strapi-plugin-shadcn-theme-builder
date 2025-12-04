import { createContentApiRoutesFactory } from '@strapi/utils';
import themeRoutes from './theme';

const createContentApiRoutes = createContentApiRoutesFactory(() => {
  return [...themeRoutes()];
});

export default createContentApiRoutes;
