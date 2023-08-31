import {PluginSchema} from '../../schema';
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

  /**
   * @deprecated Use .setImage() instead
   */
  image(image: string) {
    return this.setImage(image);
  }

  setImage(image: string) {
    this.#options['image'] = image;
    return this;
  }

  alwaysPull(alwaysPull: boolean = true): this {
    this.#options['always-pull'] = alwaysPull;
    return this;
  }

  /**
   * @deprecated Use .addCommand() instead
   */
  command(command: string): this {
    return this.addCommand(command);
  }

  addCommand(command: string): this {
    this.#commands.push(command);
    return this;
  }

  debug(debug: boolean = true): this {
    this.#options['debug'] = debug;
    return this;
  }

  /**
   * @deprecated Use .addCommand() instead
   */
  entrypoint(entrypoint: string): this {
    return this.setEntrypoint(entrypoint);
  }

  setEntrypoint(entrypoint: string): this {
    this.#options['entrypoint'] = entrypoint;
    return this;
  }

  /**
   * @deprecated Use .addEnvironment() instead
   */
  environment(environment: string): this {
    return this.addEnvironment(environment);
  }

  addEnvironment(environment: string): this {
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

  /**
   * @deprecated Use .setPlatform() instead
   */
  platform(platform: string): this {
    return this.setPlatform(platform);
  }

  setPlatform(platform: string): this {
    this.#options['platform'] = platform;
    return this;
  }

  /**
   * @deprecated Use .setPlatform() instead
   */
  shell(cmd: string, args: string[] = []): this {
    return this.setShell(cmd, args);
  }

  setShell(cmd: string, args: string[] = []): this {
    this.#options['shell'] = [cmd, ...args];
    return this;
  }

  /**
   * @deprecated Use .setUser() instead
   */
  user(user: string): this {
    return this.setUser(user);
  }

  setUser(user: string): this {
    this.#options['user'] = user;
    return this;
  }

  /**
   * @deprecated Use .setUserNamespace() instead
   */
  userns(namespace: string): this {
    return this.setUserns(namespace);
  }

  setUserns(namespace: string): this {
    this.#options['userns'] = namespace;
    return this;
  }

  /**
   * @deprecated Use .addVolume() instead
   */
  volume(volume: string): this {
    return this.addVolume(volume);
  }

  addVolume(volume: string): this {
    this.#volumes.push(volume);
    return this;
  }

  /**
   * @deprecated Use .setWorkdir() instead
   */
  workdir(workdir: string): this {
    return this.setWorkdir(workdir);
  }

  setWorkdir(workdir: string): this {
    this.#options['workdir'] = workdir;
    return this;
  }

  /**
   * @deprecated Use .setCPUs() instead
   */
  cpus(cpus: string): this {
    return this.setCPUs(cpus);
  }

  setCPUs(cpus: string): this {
    this.#options['cpus'] = cpus;
    return this;
  }

  /**
   * @deprecated Use .setMemory() instead
   */
  memory(memory: string): this {
    return this.setMemory(memory);
  }

  setMemory(memory: string): this {
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

  build(): PluginSchema | Promise<PluginSchema> {
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
