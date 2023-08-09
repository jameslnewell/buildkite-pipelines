import {PluginBuilder} from '../PluginBuilder';

/**
 * @see https://github.com/buildkite-plugins/docker-buildkite-plugin
 */
export class DockerPlugin implements PluginBuilder {
  static PLUGIN = 'docker#v5.8.0';

  #options: {[name: string]: unknown} = {};
  #commands: string[] = [];
  #envvars: string[] = [];
  #volumes: string[] = [];

  image(image: string) {
    this.#options['image'] = image;
    return this;
  }

  alwaysPull(alwaysPull: boolean = true): this {
    this.#options['always-pull'] = alwaysPull;
    return this;
  }

  command(command: string): this {
    this.#commands.push(command);
    return this;
  }

  debug(debug: boolean = true): this {
    this.#options['debug'] = debug;
    return this;
  }

  entrypoint(entrypoint: string): this {
    this.#options['entrypoint'] = entrypoint;
    return this;
  }

  environment(environment: string): this {
    this.#envvars.push(environment);
    return this;
  }

  propagateEnvironment(propagate: boolean = true): this {
    this.#options['propagate-environment'] = propagate;
    return this;
  }

  propagateAWSAauthTokens(propagate: boolean = true): this {
    this.#options['propagate-aws-auth-tokens'] = propagate;
    return this;
  }

  mountCheckout(mount: boolean = true): this {
    this.#options['mount-checkout'] = mount;
    return this;
  }

  mountBuildkiteAgent(mount: boolean = true): this {
    this.#options['mount-buildkite-agent'] = mount;
    return this;
  }

  mountSSHAgent(mount: boolean = true): this {
    this.#options['mount-ssh-agent'] = mount;
    return this;
  }

  platform(platform: string): this {
    this.#options['platform'] = platform;
    return this;
  }

  shell(cmd: string, args: string[] = []): this {
    this.#options['shell'] = [cmd, ...args];
    return this;
  }

  user(user: string): this {
    this.#options['user'] = user;
    return this;
  }

  userns(namespace: string): this {
    this.#options['userns'] = namespace;
    return this;
  }

  volume(volume: string): this {
    this.#volumes.push(volume);
    return this;
  }

  workdir(workdir: string): this {
    this.#options['workdir'] = workdir;
    return this;
  }

  cpus(cpus: string): this {
    this.#options['cpus'] = cpus;
    return this;
  }

  memory(memory: string): this {
    this.#options['memory'] = memory;
    return this;
  }

  memorySwap(memory: string): this {
    this.#options['memory-swap'] = memory;
    return this;
  }

  memorySwapiness(swappiness: string): this {
    this.#options['memory-swapiness'] = swappiness;
    return this;
  }

  build() {
    const object: Record<string, unknown> = {
      ...this.#options,
    };

    if (this.#commands.length) {
      object['command'] = this.#commands;
    }

    if (this.#envvars.length) {
      object['environment'] = this.#envvars;
    }

    if (this.#volumes.length) {
      object['volumes'] = this.#volumes;
    }

    return {
      [DockerPlugin.PLUGIN]: object,
    };
  }
}
