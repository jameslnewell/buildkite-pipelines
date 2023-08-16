import {PluginBuilder} from '../PluginBuilder';

/**
 * @see https://github.com/seek-oss/docker-ecr-cache-buildkite-plugin
 */
export class DockerECRCachePlugin implements PluginBuilder {
  static PLUGIN = 'seek-oss/docker-ecr-cache#v2.0.0';

  #cacheOn: string[] = [];
  #secrets: string[] = [];
  #buildArgs: string[] = [];
  #options: {[name: string]: unknown} = {};

  cacheOn(glob: string): this {
    this.#cacheOn.push(glob);
    return this;
  }

  dockerfile(file: string): this {
    this.#options['dockerfile'] = file;
    return this;
  }

  target(target: string): this {
    this.#options['target'] = target;
    return this;
  }

  secret(secret: string): this {
    this.#secrets.push(secret);
    return this;
  }

  buildArg(arg: string): this {
    this.#buildArgs.push(arg);
    return this;
  }

  maxAgeDay(days: number): this {
    this.#options['max-age-days'] = days;
    return this;
  }

  region(region: string): this {
    this.#options['region'] = region;
    return this;
  }

  ecrName(name: string): this {
    this.#options['ecr-name'] = name;
    return this;
  }

  build() {
    if (this.#cacheOn.length) {
      this.#options['cache-on'] = this.#cacheOn;
    }

    if (this.#secrets.length) {
      this.#options['secrets'] = this.#secrets;
    }

    if (this.#buildArgs.length) {
      this.#options['build-args'] = this.#buildArgs;
    }

    return {
      [DockerECRCachePlugin.PLUGIN]: this.#options,
    };
  }
}
