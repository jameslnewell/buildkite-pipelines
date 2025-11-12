export interface BranchFilterBuilder {
  getBranches(): ReadonlyArray<string>;
  /**
   * @deprecated Use .addBranch() instead
   */
  branch(pattern: string): this;
  addBranch(pattern: string): this;
}

export class BranchFilterHelper {
  #branches: string[] = [];

  getBranches(): ReadonlyArray<string> {
    return this.#branches;
  }

  addBranch(pattern: string): void {
    this.#branches.push(pattern);
  }

  build() {
    return this.#branches.length > 0 ? {branches: this.#branches} : {};
  }
}
