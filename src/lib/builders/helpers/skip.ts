export interface SkipBuilder {
  /**
   * @deprecated Use .setSkip() instead
   */
  setSkip(skip?: boolean | string): void;
  setSkip(skip?: boolean | string): void;
}

export class SkipHelper {
  #skip?: boolean | string;

  setSkip(skip?: boolean | string): void {
    this.#skip = skip;
  }

  build(): {skip?: boolean | string} {
    return this.#skip !== undefined ? {skip: this.#skip} : {};
  }
}
