import contentAPIRoutes from './content-api';

const routes = {
  'content-api': {
    type: 'admin',
    routes: contentAPIRoutes,
  },
};

export default routes;
