import {PluginSchema} from '../schema';
import {PluginBuilder} from './PluginBuilder';

export class Plugin<Options extends {[name: string]: unknown}>
  implements PluginBuilder
{
  #name: string;
  #options: Options | null = null;

  public constructor(name: string = '', options?: Options) {
    this.#name = name;
    this.#options = options ?? null;
  }

  setName(name: string): this {
    this.#name = name;
    return this;
  }

  /**
   * @deprecated
   */
  options(): Options;
  /**
   * @deprecated Use .setOptions() instead
   */
  options(options: Options | null): this;
  options(options?: Options | null): Options | null | this {
    if (options) {
      this.#options = options;
      return this;
    } else {
      return this.#options;
    }
  }

  setOptions(options: Options | null): this {
    this.#options = options;
    return this;
  }

  build(): PluginSchema {
    if (!this.#name) throw new Error('Plugin must have a name');
    return {
      [this.#name]: this.#options,
    };
  }
}
