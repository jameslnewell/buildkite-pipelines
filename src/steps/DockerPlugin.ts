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
  #environment: Record<string, string>;
  #command?: string[];
  #image?: string;
  #mountCheckout?: boolean;
  #propagateEnvironment?: string;
  #propagateAwsAuthTokens?: boolean;
  #volumes?: string[];

  public constructor(options: DockerPluginOptions) {
    this.#alwaysPull = options.alwaysPull;
    this.#environment = options.environment ?? {};
    this.#command = options.command;
    this.#image = options.image;
    this.#mountCheckout = options.mountCheckout;
    this.#propagateEnvironment = options.propagateEnvironment;
    this.#propagateAwsAuthTokens = options.propagateAwsAuthTokens;
    this.#volumes = options.volumes;
  }

  public get image(): string | undefined {
    return this.#image
  }

  public set image(image: string | undefined) {
    this.#image = image
  }

  public build(): PluginObject {
    return {
      'docker#v3.10.0': {
        'always-pull': this.#alwaysPull,
        environment: Object.keys(this.#environment).length ? this.#environment : undefined,
        image: this.#image
      }
    }
  }
}