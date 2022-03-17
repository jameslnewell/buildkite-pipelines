import { Constructor } from "../../Constructor"

export interface BranchesMixin {
  branches(): string[] | undefined;
  branches(branches: string[] | undefined): this;
}

export interface BranchesMixinOptions {
  branches?: string[]
}

export function mixinBranches<BaseType extends Constructor>(Base: BaseType) {
  return class extends Base implements BranchesMixin {
    #branches: string[] | undefined

    branches(): string[] | undefined;
    branches(branches: string[] | undefined): this;
    branches(branches?: string[] | undefined): string[] | undefined | this {
      if (branches) {
        this.#branches = branches
        return this
      } else {
        return this.#branches;
      }
    }

    addBranch(branch: string) {
      this.#branches?.push(branch)
      return this;
    }
  }
}

export function configureBranches(object: BranchesMixin, options: BranchesMixinOptions | undefined) {
  object.branches(options?.branches)
}

export function buildBranches(object: BranchesMixin) {
  const output: {branches?: string[]}  = {}
  if  (object.branches()) {
    output.branches  = object.branches()
  }
  return output;
}
