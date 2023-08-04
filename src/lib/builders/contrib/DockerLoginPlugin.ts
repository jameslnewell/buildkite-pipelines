import {PluginBuilder} from '../PluginBuilder';

export interface DockerLoginPluginSchema {
  server?: string;
  username: string;
  'password-env': string;
  retries?: number;
}

export class DockerLoginPlugin implements PluginBuilder {
  #username?: string;
  #password?: string;
  #server?: string;
  #retries?: number;

  username(username: string): this {
    this.#username = username;
    return this;
  }
  passwordEnv(passwordEnv: string): this {
    this.#password = passwordEnv;
    return this;
  }
  server(server: string): this {
    this.#server = server;
    return this;
  }
  retries(retries: number): this {
    this.#retries = retries;
    return this;
  }

  build() {
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
