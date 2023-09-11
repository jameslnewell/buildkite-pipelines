import {PluginSchema} from '../../schema';
import {PluginBuilder} from '../PluginBuilder';

/**
 * @see https://github.com/seek-oss/aws-sm-buildkite-plugin
 */

export class SecretsManagerPlugin implements PluginBuilder {
  static PLUGIN = 'seek-oss/aws-sm#v2.3.1';

  #options: {[name: string]: unknown} = {};
  #envs: Record<string, string | {}> = {};
  #files: {}[] = [];

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
   * @deprecated Use .addEnv() instead
   */
  env(name: string, secretId: string, jsonKey?: string): this {
    return this.addEnv(name, secretId, jsonKey);
  }

  addEnv(name: string, secretId: string, jsonKey?: string): this {
    this.#envs[name] = jsonKey
      ? {
          'secret-id': secretId,
          'json-key': jsonKey,
        }
      : secretId;
    return this;
  }

  /**
   * @deprecated Use .addFile() instead
   */
  file(name: string, secretId: string): this {
    return this.addFile(name, secretId);
  }

  addFile(name: string, secretId: string): this {
    this.#files.push({
      path: name,
      'secret-id': secretId,
    });
    return this;
  }

  build(): PluginSchema | Promise<PluginSchema> {
    const object: Record<string, unknown> = {
      ...this.#options,
    };

    if (Object.keys(this.#envs).length) {
      object['env'] = this.#envs;
    }

    if (this.#files.length) {
      object['file'] = this.#files;
    }

    return {
      [SecretsManagerPlugin.PLUGIN]: object,
    };
  }
}
