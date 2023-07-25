import { PluginSchema } from "../schema";
import { PluginBuilder } from "./PluginBuilder";

export function isPluginBuilder(plugin: PluginSchema | PluginBuilder): plugin is PluginBuilder {
  return !!plugin && typeof (plugin as any).build == "function";
}
