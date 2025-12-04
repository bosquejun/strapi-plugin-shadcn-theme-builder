import type { Core } from '@strapi/strapi';
import permissions from './permissions';

const bootstrap = ({ strapi }: { strapi: Core.Strapi }) => {
  // Register permission actions.
  strapi.admin.services.permission.actionProvider.registerMany(permissions);
};

export default bootstrap;
