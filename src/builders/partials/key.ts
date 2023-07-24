
export interface KeyBuilder {
  key(key: string): this;
}

export class KeyHelper {
  #key?: string

  key(key: string): void {
    this.#key = key
  }

  build() {
    return this.#key ? {key: this.#key} : {}
  }
}
