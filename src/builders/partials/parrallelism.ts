
export interface ParallelismBuilder {
  parallelism(parallelism: number): this;
}

export class ParallelismHelper {
  #parallelism?: number

  parallelism(parallelism: number): void {
    this.#parallelism = parallelism
  }

  build() {
    return this.#parallelism ? {parallelism: this.#parallelism} : {}
  }
}
