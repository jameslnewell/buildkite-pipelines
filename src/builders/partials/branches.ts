
export interface BranchesBuilder {
  branch(branch: string): this
}

export class BranchesHelper {
  #branches: string[] = []

  branch(branch: string): void {
    this.#branches.push(branch)
  }

  build() {
    return this.#branches.length > 0 ? {branches: this.#branches} : {}
  }
}
