export interface SkipBuilder {
  skip(skip?: boolean | string): void;
}

export class SkipHelper {
  #skip?: boolean | string;

  skip(skip?: boolean | string): void {
    this.#skip = skip;
  }

  build(): {skip?: boolean | string} {
    return this.#skip !== undefined ? {skip: this.#skip} : {};
  }
}
