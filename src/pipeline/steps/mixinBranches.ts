import { Constructor } from "../../Constructor"

export interface BranchesMixin {
  branches: string[] | undefined
}

export interface BranchesMixinOptions {
  branches?: string[]
}

export function mixinBranches<BaseType extends Constructor>(Base: BaseType) {
  return class extends Base implements BranchesMixin {
    #branches: string[] | undefined

    get branches() {
      return this.#branches
    }

    set branches(branches: string[]  | undefined) {
      this.#branches = branches
    }
  }
}

export function configureBranches(object: BranchesMixin, options: BranchesMixinOptions | undefined) {
  object.branches = options?.branches
}

export function buildBranches(object: BranchesMixin) {
  const output: {branches?: string[]}  = {}
  if  (object.branches) {
    output.branches  = object.branches
  }
  return output;
}
