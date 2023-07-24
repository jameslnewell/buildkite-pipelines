import { PluginBuilder } from "../../steps/plugins/PluginBuilder";

export interface DockerLoginPluginSchema {
  server?: string;
  username: string;
  "password-env": string;
  retries?: number;
}

export namespace DockerLoginPlugin {
  export interface UsernameBuilder {
    username(username: string): PasswordBuilder;
  }

  export interface PasswordBuilder {
    passwordEnv(passwordEnv: string): Builder;
  }

  export interface Builder extends PluginBuilder<DockerLoginPluginSchema> {
    server(server: string): Builder;
    retries(number: number): Builder;
  }
}

export class DockerLoginPlugin {
  static builder(): DockerLoginPlugin.UsernameBuilder {
    let _username: string;
    let _password: string;
    let _server: string | undefined;
    let _retries: number | undefined;
    return {
      username(username) {
        _username = username;
        return {
          passwordEnv(password) {
            _password = password;
            return {
              server(server) {
                _server = server;
                return this;
              },
              retries(retries) {
                _retries = retries;
                return this;
              },
              build() {
                return {
                  "docker-login#v2.1.0": {
                    username: _username,
                    "password-env": _password,
                    server: _server,
                    retries: _retries,
                  },
                };
              },
            };
          },
        };
      },
    };
  }
}
