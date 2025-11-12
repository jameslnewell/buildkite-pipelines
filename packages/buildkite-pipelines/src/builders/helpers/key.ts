export interface KeyBuilder {
  getKey(): string | undefined;
  /**
   * @deprecated Use .setKey() instead
   */
  key(key: string): this;
  setKey(key: string): this;
}

export class KeyHelper {
  #key?: string;

  getKey(): string | undefined {
    return this.#key;
  }

  setKey(key: string): void {
    this.#key = key;
  }

  build() {
    return this.#key ? {key: this.#key} : {};
  }
}
