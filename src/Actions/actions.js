export const REGISTER_PLUGIN = "TOGGLE_PLUGIN";
export const UNREGISTER_PLUGIN = "UNREGISTER_PLUGIN";
export const FETCH_PLUGINS = "FETCH_PLUGINS";
export const UPDATE_PLUGIN = "UPDATE_PLUGIN";

export function registerPlugin(plugin) {
  return { type: REGISTER_PLUGIN, plugin }
}

export function updatePlugin(plugin) {
  return { type: UPDATE_PLUGIN, plugin }
}

export function unregisterPlugin(plugin) {
  return { type: UNREGISTER_PLUGIN, plugin }
}

export function fetchPlugins(plugin) {
  return { type: FETCH_PLUGINS, plugin }
}

