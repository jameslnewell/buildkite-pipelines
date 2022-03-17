import { PluginObject } from "./PluginObject";
import { PluginBuilder } from "./PluginBuilder";

export interface DockerPluginOptions {
  alwaysPull?: boolean;
  environment?: Record<string, string>;
  command?: string[];
  image?: string;
  mountCheckout?: boolean;
  propagateEnvironment?: string;
  propagateAwsAuthTokens?: boolean;
  volumes?: string[];
}

export class DockerPlugin implements PluginBuilder {
  #alwaysPull?: boolean;
  #environment: Record<string, string> = {};
  #command?: string[];
  #image?: string;
  #mountCheckout?: boolean;
  #propagateEnvironment?: string;
  #propagateAwsAuthTokens?: boolean;
  #volumes?: string[];

  image(): string | undefined;
  image(image: string | undefined): this;
  image(image?: string | undefined): string | undefined | this {
    if (image) {
      this.#image = image
      return this
    } else {
      return this.#image;
    }
  }

  public build(): PluginObject {
    return {
      'docker#v3.11.0': {
        'always-pull': this.#alwaysPull,
        environment: Object.keys(this.#environment).length ? this.#environment : undefined,
        image: this.#image
      }
    }
  }
}