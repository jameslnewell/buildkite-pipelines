import {PluginSchema} from '../schema';
import {PluginBuilder} from './PluginBuilder';

export class Plugin<Options extends {[name: string]: unknown}>
  implements PluginBuilder
{
  #name: string;
  #options: Options | null = null;

  public constructor(name: string, options?: Options) {
    this.#name = name;
    this.#options = options ?? null;
  }

  options(): Options;
  options(options: Options | null): this;
  options(options?: Options | null): Options | null | this {
    if (options) {
      this.#options = options;
      return this;
    } else {
      return this.#options;
    }
  }

  build(): PluginSchema {
    return {
      [this.#name]: this.#options ?? null,
    };
  }
}
