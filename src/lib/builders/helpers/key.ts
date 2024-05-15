export interface KeyBuilder {
  /**
   * @deprecated Use .setKey() instead
   */
  key(key: string): this;
  setKey(key: string): this;
}

export class KeyHelper {
  #key?: string;

  setKey(key: string | undefined): void {
    this.#key = key;
  }

  build() {
    return this.#key ? {key: this.#key} : {};
  }
}
