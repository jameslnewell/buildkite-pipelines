
export interface ConcurrencyBuilder {
  concurrency(jobs: number, group: string): this;
}

export class ConcurrencyHelper {
  #concurrency?: number
  #concurrency_group?: string

  concurrency(jobs?: number, group?: string): void {
    this.#concurrency = jobs
    this.#concurrency_group = group
  }

  build() {
    return {
      ...(this.#concurrency ? {concurrency: this.#concurrency} : {}),
      ...(this.#concurrency_group ? {concurrency_group: this.#concurrency_group} : {}),
    }
  }
}
