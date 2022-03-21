import { PluginBuilder } from "../pipeline";

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

function maptoObjectEnv(env: Env): SecretsManagerPluginObject['env'] {
  if (!env) {
    return undefined;
  }
  const objectEnv: NonNullable<SecretsManagerPluginObject['env']> = {}
  for (const key in env) {
    const value = env[key]
    if (typeof value === 'string') {
      objectEnv[key] = value
    } else {
      objectEnv[key] = {
        "secret-id": value.secretId,
        "json-key": value.jsonKey,
      }
    }
  }
  return objectEnv
}

interface Builder extends PluginBuilder<SecretsManagerPluginObject> {
  env(env: Env): Builder
}

export class SecretsManagerPlugin {
  static builder(): Builder {
    let _env: Env | undefined;
    return {
      
      env(env) {
        _env = env
        return this;
      },
  
      build() {
        return {
          'seek-oss/aws-sm#v2.3.1': {
            env: _env && maptoObjectEnv(_env)
          }
        }
      }
    }
  }
}

// TODO:
// SecretsManagerPlugin.builder()
//   .addEnv(SecretsManagerPlugin.EnvBuilder.builder()
//      .secretId('')
//      .jsonKey('')
//   )