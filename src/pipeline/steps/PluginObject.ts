export interface PluginOptionsObject extends Record<string, unknown> {}

export interface PluginObject {
  [name: string]: PluginOptionsObject | null
}
