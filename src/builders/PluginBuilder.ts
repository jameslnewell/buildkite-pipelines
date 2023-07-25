import { PluginSchema } from "../schema";

export interface PluginBuilder {
  build(): PluginSchema;
}
