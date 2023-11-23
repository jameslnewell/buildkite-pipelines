import {PluginSchema} from '../../schema';
import {PluginBuilder} from '../PluginBuilder';

/**
 * @see https://github.com/buildkite-plugins/ecr-buildkite-plugin
 */
export class ECRPlugin implements PluginBuilder {
  static PLUGIN = 'ecr#v2.7.0';

  #accounts: string[] = [];
  #options: {[name: string]: unknown} = {};

  /**
   * @deprecated Use .setLogin() instead
   */
  login(login: boolean = true): this {
    return this.setLogin(login);
  }

  setLogin(login: boolean): this {
    this.#options['login'] = login;
    return this;
  }

  /**
   * @deprecated Use .setAccount() instead
   */
  account(id: string): this {
    return this.setAccount(id);
  }

  setAccount(id: string): this {
    this.#accounts.push(id);
    return this;
  }

  /**
   * @deprecated Use .setRegion() instead
   */
  region(region: string): this {
    return this.setRegion(region);
  }

  setRegion(region: string): this {
    this.#options['region'] = region;
    return this;
  }

  /**
   * @deprecated Use .setRetries() instead
   */
  retries(retries: number): this {
    return this.setRetries(retries);
  }

  setRetries(retries: number): this {
    this.#options['retries'] = retries;
    return this;
  }

  setAssumeRole(assumeRole: string, durationSeconds?: number): this {
    this.#options['assume_role'] = {
      role_arn: assumeRole,
      ...(durationSeconds !== undefined
        ? {duration_seconds: durationSeconds}
        : {}),
    };
    return this;
  }

  build(): PluginSchema | Promise<PluginSchema> {
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
