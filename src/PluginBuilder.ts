import { PluginObject } from "./CommandStepObject";

export interface PluginBuilder {
  build(): PluginObject
}