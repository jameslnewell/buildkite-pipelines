
export type PluginOptionsConstraint = Record<string, any>;

export interface PluginObject<PluginOptions extends PluginOptionsConstraint = {}> {
  [name: string]: null | PluginOptions
}
