import {PluginSchema} from '../schema/index.js';

export interface PluginBuilder {
  build(): PluginSchema | Promise<PluginSchema>;
}
