export interface SkipBuilder {
  skip(skip: boolean | string): void;
}

export class SkipHelper {
  #skip?: boolean;

  skip(skip: boolean): void {
    this.#skip = skip;
  }

  build(): {skip?: boolean | string} {
    return this.#skip !== undefined ? {skip: this.#skip} : {};
  }
}
