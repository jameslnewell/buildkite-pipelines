import { PluginBuilder } from "../pipeline";

export interface DockerPluginOptions {
  alwaysPull?: boolean;
  environment?: string[];
  command?: string[];
  image?: string;
  mountCheckout?: boolean;
  propagateEnvironment?: string;
  propagateAwsAuthTokens?: boolean;
  volumes?: string[];
}

interface Builder extends PluginBuilder<DockerPluginOptions> {
  image(image: string): this
  environment(environment: string[]): this
}

export class DockerPlugin {
  static builder(): Builder {
    let _image: string | undefined;
    let _environment: string[] | undefined;
    return {
      
      image(image) {
        _image = image
        return this;
      },

      environment(environment) {
        _environment = environment
        return this;
      },
  
      build() {
        return {
          'docker#v3.11.0': {
            // 'always-pull': this.#alwaysPull,
            // environment: Object.keys(this.#environment).length ? this.#environment : undefined,
            image: _image,
            environment: _environment
          }
        }
      }
    }
  }
}
