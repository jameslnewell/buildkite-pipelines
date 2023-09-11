export interface SkipBuilder {
  /**
   * @deprecated Use .setSkip() instead
   */
  skip(skip: boolean | string): void;
  setSkip(skip: boolean | string | undefined): void;
}

export class SkipHelper {
  #skip: boolean | string | undefined;

  setSkip(skip?: boolean | string | undefined): void {
    this.#skip = skip;
  }

  build(): {skip?: boolean | string} {
    return this.#skip !== undefined ? {skip: this.#skip} : {};
  }
}
