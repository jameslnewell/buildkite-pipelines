import { PluginBuilder } from "../pipeline";

export interface DockerPluginOptions {
  image?: string;
  command?: string[];
  environment?: string[];

  "always-pull"?: boolean;
  "mount-checkout"?: boolean;
  "propagate-environment"?: string;
  "propagate-aws-auth-tokens"?: boolean;

  cpus?: string;
  memory?: string;
  memorySwap?: string;
  volumes?: string[];
}

export namespace DockerPlugin {
  export interface Builder extends PluginBuilder<DockerPluginOptions> {
    image(image: string): this;
    environment(environment: string[]): this;
    cpus(limit: string): this;
    memory(limit: string): this;
    memorySwap(limit: string): this;
  }
}

export class DockerPlugin {
  static builder(): DockerPlugin.Builder {
    let _image: string | undefined;
    let _environment: string[] | undefined;
    let _cpus: string | undefined;
    let _memory: string | undefined;
    let _memorySwap: string | undefined;
    return {
      image(image) {
        _image = image;
        return this;
      },

      environment(environment) {
        _environment = environment;
        return this;
      },

      cpus(limit) {
        _cpus = limit;
        return this;
      },

      memory(limit) {
        _memory = limit;
        return this;
      },

      memorySwap(limit) {
        _memorySwap = limit;
        return this;
      },

      build() {
        const object: DockerPluginOptions = {
          // 'always-pull': this.#alwaysPull,
          // environment: Object.keys(this.#environment).length ? this.#environment : undefined,
        };

        if (_image) {
          object.image = _image;
        }

        if (_environment) {
          object.environment = _environment;
        }

        if (_cpus) {
          object.cpus = _cpus;
        }

        if (_memory) {
          object.memory = _memory;
        }

        if (_memorySwap) {
          object.memorySwap = _memorySwap;
        }

        return {
          "docker#v3.11.0": object,
        };
      },
    };
  }
}
