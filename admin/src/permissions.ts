import { PLUGIN_ID } from './constants';

const pluginPermissions = {
  accessOverview: [{ action: `plugin::${PLUGIN_ID}.overview.access`, subject: null }],
  accessSidebar: [{ action: `plugin::${PLUGIN_ID}.sidebar.access`, subject: null }],
};

export default pluginPermissions;
