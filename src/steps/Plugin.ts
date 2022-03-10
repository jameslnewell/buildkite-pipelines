import { PluginObject, PluginOptionsObject } from "./PluginObject";
import { PluginBuilder } from "./PluginBuilder";

export class Plugin implements PluginBuilder {
  #name: string;
  #options?: PluginOptionsObject;

  public constructor(name: string, options?: Record<string, unknown>) {
    this.#name = name;
    this.#options = options;
  }

  build(): PluginObject {
    return {
      [this.#name]: this.#options ?? null
    }
  }
}