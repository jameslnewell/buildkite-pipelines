import {PluginBuilder} from '../PluginBuilder';

/**
 * @see https://github.com/buildkite-plugins/ecr-buildkite-plugin
 */
export class ECRPlugin implements PluginBuilder {
  static PLUGIN = 'ecr#v2.7.0';

  #accounts: string[] = [];
  #options: {[name: string]: unknown} = {};

  login(login: boolean = true): this {
    this.#options['login'] = login;
    return this;
  }

  account(id: string): this {
    this.#accounts.push(id);
    return this;
  }

  region(region: string): this {
    this.#options['region'] = region;
    return this;
  }

  retries(retries: number): this {
    this.#options['retries'] = retries;
    return this;
  }

  build() {
    const object: Record<string, unknown> = {
      ...this.#options,
    };

    if (this.#accounts.length) {
      object['account-ids'] = this.#accounts;
    }

    return {
      [ECRPlugin.PLUGIN]: object,
    };
  }
}
