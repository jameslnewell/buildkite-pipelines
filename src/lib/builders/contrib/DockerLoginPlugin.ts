import {PluginSchema} from '../../schema';
import {PluginBuilder} from '../PluginBuilder';

export interface DockerLoginPluginSchema {
  server?: string;
  username: string;
  'password-env': string;
  retries?: number;
}

/**
 * @see https://github.com/buildkite-plugins/docker-login-buildkite-plugin
 */
export class DockerLoginPlugin implements PluginBuilder {
  static PLUGIN = 'docker-login#v3.0.0';

  #username?: string;
  #password?: string;
  #server?: string;
  #retries?: number;

  /**
   * @deprecated Use .setUsername() instead
   */
  username(username: string): this {
    return this.setUsername(username);
  }

  setUsername(username: string): this {
    this.#username = username;
    return this;
  }

  /**
   * @deprecated Use .setUsername() instead
   */
  passwordEnv(passwordEnv: string): this {
    return this.setPasswordEnv(passwordEnv);
  }

  setPasswordEnv(passwordEnv: string): this {
    this.#password = passwordEnv;
    return this;
  }

  /**
   * @deprecated Use .setServer() instead
   */
  server(server: string): this {
    return this.setServer(server);
  }

  setServer(server: string): this {
    this.#server = server;
    return this;
  }

  /**
   * @deprecated Use .setRetries() instead
   */
  retries(retries: number): this {
    return this.setRetries(retries);
  }

  setRetries(retries: number): this {
    this.#retries = retries;
    return this;
  }

  build(): PluginSchema {
    return {
      'docker-login#v2.1.0': {
        username: this.#username,
        'password-env': this.#password,
        server: this.#server,
        retries: this.#retries,
      },
    };
  }
}
