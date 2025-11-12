import {PluginSchema} from '../../schema';
import {PluginBuilder} from '../PluginBuilder';

/**
 * @see https://github.com/seek-oss/docker-ecr-cache-buildkite-plugin
 */
export class DockerECRCachePlugin implements PluginBuilder {
  static PLUGIN = 'seek-oss/docker-ecr-cache#v2.2.0';

  #cacheOn: string[] = [];
  #secrets: string[] = [];
  #buildArgs: string[] = [];
  #options: {[name: string]: unknown} = {};

  /**
   * @deprecated Use .addCacheOn() instead
   */
  cacheOn(glob: string): this {
    return this.addCacheOn(glob);
  }

  addCacheOn(glob: string): this {
    this.#cacheOn.push(glob);
    return this;
  }

  /**
   * @deprecated Use .setDockerfile() instead
   */
  dockerfile(file: string): this {
    return this.setDockerfile(file);
  }

  setDockerfile(file: string): this {
    this.#options['dockerfile'] = file;
    return this;
  }

  /**
   * @deprecated Use .setTarget() instead
   */
  target(target: string): this {
    return this.setTarget(target);
  }

  setTarget(target: string): this {
    this.#options['target'] = target;
    return this;
  }

  /**
   * @deprecated Use .setSecret() instead
   */
  secret(secret: string): this {
    return this.setSecret(secret);
  }

  setSecret(secret: string): this {
    this.#secrets.push(secret);
    return this;
  }

  /**
   * @deprecated Use .addBuildArg() instead
   */
  buildArg(arg: string): this {
    return this.addBuildArg(arg);
  }

  addBuildArg(arg: string): this {
    this.#buildArgs.push(arg);
    return this;
  }

  /**
   * @deprecated Use .setMaxAgeDays() instead
   */
  maxAgeDay(days: number): this {
    return this.setMaxAgeDays(days);
  }

  setMaxAgeDays(days: number): this {
    this.#options['max-age-days'] = days;
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
   * @deprecated Use .setECRName() instead
   */
  ecrName(name: string): this {
    return this.setECRName(name);
  }

  setECRName(name: string): this {
    this.#options['ecr-name'] = name;
    return this;
  }

  build(): PluginSchema {
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
