import { PluginObject } from "./PluginObject";
import { PluginBuilder } from "./PluginBuilder";

export interface SecretsManagerPluginObject {
  env?: Record<
    string, 
    string | {
      'secret-id': string;
      'json-key': string
    }
  >
}

type Env = Record<
  string, 
  string | {
    secretId: string;
    jsonKey: string
  }
>

export interface SecretsManagerPluginOptions {
}

export class SecretsManagerPlugin implements PluginBuilder {
  #env: Env | undefined;

  env(): Env | undefined;
  env(env: Env | undefined): this;
  env(env?: Env | undefined): Env | undefined | this {
    if (env) {
      this.#env = env
      return this
    } else {
      return this.#env;
    }
  }

  private toEnv(): SecretsManagerPluginObject['env'] {
    if (!this.#env) {
      return undefined;
    }
    const env: NonNullable<SecretsManagerPluginObject['env']> = {}
    for (const key in this.#env) {
      const value = this.#env[key]
      if (typeof value === 'string') {
        env[key] = value
      } else {
        env[key] = {
          "secret-id": value.secretId,
          "json-key": value.jsonKey,
        }
      }
    }
    return env
  }

  public build(): PluginObject<SecretsManagerPluginObject> {
    return {
      'seek-oss/aws-sm#v2.3.1': {
        env: this.toEnv()
      }
    }
  }
}