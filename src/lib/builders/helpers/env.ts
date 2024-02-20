import {} from '../../schema';

export interface EnvironmentBuilder {
  addEnv(name: string, value: unknown): this;
}

export class EnvironmentHelper {
  #env: Record<string, unknown> = {};

  addEnv(name: string, value: unknown): void {
    this.#env[name] = value;
  }

  build() {
    return Object.entries(this.#env).length ? {env: this.#env} : {};
  }
}
