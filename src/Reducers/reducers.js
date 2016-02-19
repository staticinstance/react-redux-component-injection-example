import { combineReducers } from "redux";
import { REGISTER_PLUGIN, UNREGISTER_PLUGIN, UPDATE_PLUGIN } from "../Actions/actions";


function pluginStore(state = [], action) {
  switch(action.type) {
    case REGISTER_PLUGIN:
      action.plugin.cmp = eval(Babel.transform(action.plugin.src, {presets: ['react', 'es2015']}).code)
      return [
        ...state,
        action.plugin
      ]
    case UPDATE_PLUGIN:
      action.plugin.cmp = eval(Babel.transform(action.plugin.src, {presets: ['react', 'es2015']}).code)
      const updateIdx = state.map(function(x) {return x.id; }).indexOf(action.plugin.id);
      return [
        ...state.slice(0, updateIdx),
        action.plugin,
        ...state.slice(updateIdx + 1)
      ]
    case UNREGISTER_PLUGIN:
      const idx = state.indexOf(action.plugin)
      return [
        ...state.slice(0, idx),
        ...state.slice(idx + 1)
      ]
    default:
      return state;
  }
}

const pluginApp = combineReducers({ pluginStore });

export default pluginApp;
