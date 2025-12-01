import type { Core } from '@strapi/strapi';
import middlewares from './middlewares';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  strapi.server.use(middlewares.csp);
};

export default register;
