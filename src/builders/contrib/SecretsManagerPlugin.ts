import { PluginBuilder } from "../PluginBuilder";

export interface SecretsManagerPluginSchema {
  env?: Record<
    string,
    | string
    | {
        "secret-id": string;
        "json-key": string;
      }
  >;
}

type Env = Record<
  string,
  | string
  | {
      secretId: string;
      jsonKey: string;
    }
>;

function maptoObjectEnv(env: Env): SecretsManagerPluginSchema["env"] {
  if (!env) {
    return undefined;
  }
  const objectEnv: NonNullable<SecretsManagerPluginSchema["env"]> = {};
  for (const key in env) {
    const value = env[key];
    if (typeof value === "string") {
      objectEnv[key] = value;
    } else {
      objectEnv[key] = {
        "secret-id": value.secretId,
        "json-key": value.jsonKey,
      };
    }
  }
  return objectEnv;
}

export class SecretsManagerPlugin implements PluginBuilder {
  #env: Env | undefined;

  env(env: Env): this {
    this.#env = env;
    return this;
  }

  build() {
    return {
      "seek-oss/aws-sm#v2.3.1": {
        env: this.#env && maptoObjectEnv(this.#env),
      },
    };
  }

}

// TODO:
// SecretsManagerPlugin.builder()
//   .addEnv(SecretsManagerPlugin.EnvBuilder.builder()
//      .secretId('')
//      .jsonKey('')
//   )