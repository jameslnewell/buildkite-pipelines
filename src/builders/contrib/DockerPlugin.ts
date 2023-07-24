import { PluginBuilder } from "../PluginBuilder";

export class DockerPlugin implements PluginBuilder {
  #image: string | undefined;
  #environment: string[] | undefined;
  #cpus: string | undefined;
  #memory: string | undefined;
  #memorySwap: string | undefined;
  
  image(image: string) {
    this.#image = image;
    return this;
  }

  // environment(environment) {
  //   this.#environment = environment;
  //   return this;
  // }

  cpus(limit: string) {
    this.#cpus = limit;
    return this;
  }

  memory(limit: string) {
    this.#memory = limit;
    return this;
  }

  memorySwap(limit: string) {
    this.#memorySwap = limit;
    return this;
  }

  build() {
    const object: {  
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
    } = {
    };

    if (this.#image) {
      object.image = this.#image;
    }

    if (this.#environment) {
      object.environment = this.#environment;
    }

    if (this.#cpus) {
      object.cpus = this.#cpus;
    }

    if (this.#memory) {
      object.memory = this.#memory;
    }

    if (this.#memorySwap) {
      object.memorySwap = this.#memorySwap;
    }

    return {
      "dockerthis.#v3.11.0": object,
    };
  }
}
