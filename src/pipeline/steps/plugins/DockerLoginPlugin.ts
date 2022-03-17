import { PluginObject } from "./PluginObject";
import { PluginBuilder } from "./PluginBuilder";

export interface DockerLoginPluginObject {
  server?: string;
  username: string;
  'password-env': string
}

export class DockerLoginPlugin implements PluginBuilder {
  #server: string | undefined;
  #username: string | undefined;
  #passwordEnv: string | undefined;
  #retries: number | undefined;

  server(): string | undefined;
  server(server: string | undefined): this;
  server(server?: string | undefined): string | undefined | this {
    if (server) {
      this.#server = server
      return this
    } else {
      return this.#server;
    }
  }

  username(): string;
  username(username: string): this;
  username(username?: string): string | this {
    if (username) {
      this.#username = username
      return this
    } else {
      if (!this.#username) {
        throw new Error('username not specified')
      }
      return this.#username;
    }
  }

  passwordEnv(): string;
  passwordEnv(passwordEnv: string): this;
  passwordEnv(passwordEnv?: string): string | this {
    if (passwordEnv) {
      this.#passwordEnv = passwordEnv
      return this
    } else {
      if (!this.#passwordEnv) {
        throw new Error('passwordEnv not specified')
      }
      return this.#passwordEnv;
    }
  }

  public build(): PluginObject<DockerLoginPluginObject> {
    return {
      'docker-login#v2.1.0': {
        server: this.server(),
        username: this.username(),
        "password-env": this.passwordEnv(),
      }
    }
  }
}