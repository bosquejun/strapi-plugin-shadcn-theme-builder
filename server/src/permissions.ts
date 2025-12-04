import { PLUGIN_ID } from './constants';

const permissions = [
  {
    section: 'plugins',
    displayName: 'Access the overview page',
    uid: 'overview.access',
    pluginName: PLUGIN_ID,
  },
  {
    section: 'plugins',
    displayName: 'Access the content manager sidebar',
    uid: 'sidebar.access',
    pluginName: PLUGIN_ID,
  },
  {
    section: 'plugins',
    displayName: 'Read Theme',
    uid: 'theme.read',
    pluginName: PLUGIN_ID,
    subCategory: 'theme builder',
  },
  {
    section: 'plugins',
    displayName: 'Create Theme',
    uid: 'theme.create',
    pluginName: PLUGIN_ID,
    subCategory: 'theme builder',
  },
  {
    section: 'plugins',
    displayName: 'Update Theme',
    uid: 'theme.update',
    pluginName: PLUGIN_ID,
    subCategory: 'theme builder',
  },
  {
    section: 'plugins',
    displayName: 'Delete Theme',
    uid: 'theme.delete',
    pluginName: PLUGIN_ID,
    subCategory: 'theme builder',
  },
];

export default permissions;
