import {PluginSchema} from '../../schema';
import {PluginBuilder} from '../PluginBuilder';

interface DownloadInput {
  from: string;
  to: string;
}

interface UploadInput {
  from: string;
  to: string;
  step?: string | undefined;
  build?: string | undefined;
}

/**
 * @see https://github.com/buildkite-plugins/artifacts-buildkite-plugin
 */
export class ArtifactsPlugin implements PluginBuilder {
  static PLUGIN = 'artifacts#v1.9.4';

  #downloads: (string | DownloadInput)[] = [];
  #uploads: (string | UploadInput)[] = [];
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
   * @deprecated Use .addDownload() instead
   */
  download(file: string | DownloadInput): this {
    return this.addDownload(file);
  }

  /**
   * @deprecated Use .addDownload() instead
   */
  setDownload(glob: string | DownloadInput): this {
    this.addDownload(glob);
    return this;
  }

  addDownload(glob: string | DownloadInput): this {
    this.#downloads.push(glob);
    return this;
  }

  /**
   * @deprecated Use .addUpload() instead
   */
  upload(glob: string | UploadInput): this {
    return this.addUpload(glob);
  }

  /**
   * @deprecated Use .addUpload() instead
   */
  setUpload(glob: string | UploadInput): this {
    this.addUpload(glob);
    return this;
  }

  addUpload(glob: string | UploadInput): this {
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

  build(): PluginSchema {
    if (this.#downloads.length) {
      this.#options['download'] =
        this.#downloads.length === 1 ? this.#downloads[0] : this.#downloads;
    }

    if (this.#uploads.length) {
      this.#options['upload'] =
        this.#uploads.length === 1 ? this.#uploads[0] : this.#uploads;
    }

    if (this.#skipOnStatus.length) {
      this.#options['skip-on-status'] = this.#skipOnStatus;
    }

    return {
      [ArtifactsPlugin.PLUGIN]: this.#options,
    };
  }
}
