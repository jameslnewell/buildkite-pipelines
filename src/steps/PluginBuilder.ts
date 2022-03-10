import { PluginObject } from "./PluginObject";

export interface PluginBuilder {
  build(): PluginObject
}