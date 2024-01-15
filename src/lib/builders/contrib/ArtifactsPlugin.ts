import {PluginSchema} from '../../schema';
import {PluginBuilder} from '../PluginBuilder';

/**
 * @see https://github.com/buildkite-plugins/artifacts-buildkite-plugin
 */
export class ArtifactsPlugin implements PluginBuilder {
  static PLUGIN = 'artifacts#v1.9.2';

  #downloads: string[] = [];
  #uploads: string[] = [];
  #skipOnStatus: number[] = [];

  #options: {[name: string]: unknown} = {};

  /**
   * @deprecated Use .setCompressed() instead
   */
  compressed(file: string): this {
    return this.setCompressed(file);
  }

  setCompressed(file: string): this {
    this.#options['compressed'] = file;
    return this;
  }

  /**
   * @deprecated Use .setDownload() instead
   */
  download(file: string): this {
    return this.setDownload(file);
  }

  setDownload(glob: string): this {
    this.#downloads.push(glob);
    return this;
  }

  /**
   * @deprecated Use .setUpload() instead
   */
  upload(glob: string): this {
    return this.setUpload(glob);
  }

  setUpload(glob: string): this {
    this.#uploads.push(glob);
    return this;
  }

  /**
   * @deprecated Use .setStep() instead
   */
  step(id: string): this {
    return this.setStep(id);
  }

  setStep(id: string): this {
    this.#options['step'] = id;
    return this;
  }

  /**
   * @deprecated Use .setIgnoreMissing() instead
   */
  ignoreMissing(ignore: boolean = true): this {
    return this.setIgnoreMissing(ignore);
  }

  setIgnoreMissing(ignore: boolean): this {
    this.#options['ignore-missing'] = ignore;
    return this;
  }

  /**
   * @deprecated Use .setSkipOnStatus() instead
   */
  skipOnStatus(status: number): this {
    return this.setSkipOnStatus(status);
  }

  setSkipOnStatus(status: number): this {
    this.#skipOnStatus.push(status);
    return this;
  }

  build(): PluginSchema | Promise<PluginSchema> {
    if (this.#downloads.length) {
      this.#options['download'] = this.#downloads;
    }

    if (this.#uploads.length) {
      this.#options['upload'] = this.#uploads;
    }

    if (this.#skipOnStatus.length) {
      this.#options['skip-on-status'] = this.#skipOnStatus;
    }

    return {
      [ArtifactsPlugin.PLUGIN]: this.#options,
    };
  }
}
