
export interface BranchesMixinMethods {
  branches(branches: string[]): this;
  addBranch(branch: string): this
}

export interface BranchesMixinBuilder extends BranchesMixinMethods {
  build(): {branches?: string[]} 
}

export class BranchesMixin {
  static builder(): BranchesMixinBuilder {
    let _branches: string[] | undefined
    return {
      branches(branches) {
        _branches = branches;
        return this
      },
      addBranch(branch) {
        // TODO: set to array when branches is undefiend
        
        _branches?.push(branch);
        return this
      },
      build() {
        return {
          branches: _branches
        }
      }
    }
  }
}
