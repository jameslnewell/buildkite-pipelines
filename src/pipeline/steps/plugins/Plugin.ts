import { PluginObject, PluginOptionsConstraint } from "./PluginObject";
import { PluginBuilder } from "./PluginBuilder";

export class Plugin<Options extends PluginOptionsConstraint> implements PluginBuilder {
  #name: string;
  #options: Options | null = null; 

  public constructor(name: string, options?: Options) {
    this.#name = name;
    this.#options = options ?? null;
  }

  options(): Options;
  options(options: Options | null): this
  options(options?: Options | null): Options | null | this {
    if (options) {
      this.#options = options
      return this
    } else {
      return this.#options;
    }
  }

  build(): PluginObject<Options> {
    return {
      [this.#name]: this.#options ?? null
    }
  }
}