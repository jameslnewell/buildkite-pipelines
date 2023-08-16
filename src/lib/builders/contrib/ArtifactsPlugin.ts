import { PluginSchema } from "../../schema";
import { PluginBuilder } from "../PluginBuilder";

/**
 * @see https://github.com/buildkite-plugins/artifacts-buildkite-plugin
 */
export class ArtifactsPlugin implements PluginBuilder {
  static PLUGIN = 'artifacts#v1.9.0';

  #downloads: string[] = []
  #uploads: string[] = []
  #skipOnStatus: number[] = []

  #options: {[name: string]: unknown} = {};

  download(glob: string): this {
    this.#downloads.push(glob)
    return this
  }

  upload(glob: string): this {
    this.#uploads.push(glob)
    return this;
  }

  step(id: string): this {
    this.#options['step'] = id
    return this
  }

  compressed(file: string): this {
    this.#options['compressed'] = file
    return this
  }

  ignoreMissing(ignore: boolean = true): this {
    this.#options['ignore-missing'] = ignore
    return this
  }

  skipOnStatus(status: number): this {
    this.#skipOnStatus.push(status)
    return this;
  }

  build() {

    if (this.#downloads.length) {
      this.#options['download'] = this.#downloads
    }

    if (this.#uploads.length) {
      this.#options['upload'] = this.#uploads
    }

    if (this.#skipOnStatus.length) {
      this.#options['skip-on-status'] = this.#skipOnStatus
    }

    return {
      [ArtifactsPlugin.PLUGIN]: this.#options
    }
  }
}