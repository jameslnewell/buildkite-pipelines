import { PluginObject, PluginOptionsObject } from ".";
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