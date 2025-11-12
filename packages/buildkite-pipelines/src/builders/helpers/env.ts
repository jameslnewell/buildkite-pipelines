import {} from '../../schema';

export interface EnvironmentBuilder {
  getEnv(): Readonly<Record<string, unknown>>;
  addEnv(name: string, value: unknown): this;
}

export class EnvironmentHelper {
  #env: Record<string, unknown> = {};

  getEnv(): Readonly<Record<string, unknown>> {
    return Object.freeze(this.#env);
  }

  addEnv(name: string, value: unknown): void {
    this.#env[name] = value;
  }

  build() {
    return Object.entries(this.#env).length ? {env: this.#env} : {};
  }
}
