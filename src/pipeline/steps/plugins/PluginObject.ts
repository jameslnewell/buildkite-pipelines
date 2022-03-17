
export interface PluginObject<PluginOptions extends Record<string, any> = {}> {
  [name: string]: null | PluginOptions
}
