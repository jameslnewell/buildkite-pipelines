import { PluginObject, PluginOptionsConstraint } from "./PluginObject";

export interface PluginBuilder<
  PluginOptions extends PluginOptionsConstraint = {}
> {
  build(): PluginObject<PluginOptions>;
}
