import {PluginSchema} from '../schema/index.js';
import {PluginBuilder} from './PluginBuilder.js';

export function isPluginBuilder(
  plugin: PluginSchema | PluginBuilder,
): plugin is PluginBuilder {
  return !!plugin && typeof (plugin as any).build == 'function';
}
