
export interface EnvBuilder {
  env(key: Record<string, string | number>): this;
  addEnv(key: string, value: string | number): this;
}

export class EnvHelper {
  #env?: Record<string, string | number>

  env(env: Record<string, string | number>): void {
    this.#env = env
  }
  addEnv(key: string, value: string | number): void {
    if (!this.#env) {
      this.#env = {}
    }
    this.#env[key] = value
  }

  build() {
    return this.#env ? {env: this.#env} : {}
  }
}
