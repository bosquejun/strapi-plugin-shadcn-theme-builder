import type { Core } from '@strapi/strapi';
import registerGraphql from './graphql/register';
import middlewares from './middlewares';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  strapi.server.use(middlewares.csp);

  registerGraphql(strapi);
};

export default register;
