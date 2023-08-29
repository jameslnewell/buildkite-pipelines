export interface BranchesBuilder {
  /**
   * @deprecated Use .addBranch() instead
   */
  branch(branch: string): this;
  addBranch(branch: string): this;
}

export class BranchesHelper {
  #branches: string[] = [];

  addBranch(branch: string): void {
    this.#branches.push(branch);
  }

  build() {
    return this.#branches.length > 0 ? {branches: this.#branches} : {};
  }
}
