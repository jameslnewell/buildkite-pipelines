import { Constructor } from "../Constructor"

export interface DependenciesMixin {
  dependsOn: null | Array<string | {step: string; allow_failure?: boolean;}> | undefined
  allowDependencyFailure: boolean | undefined
}

export interface DependenciesMixinOptions {
  dependsOn?: undefined
  allowDependencyFailure?: boolean
}

export function mixinDependencies<BaseType extends Constructor>(Base: BaseType) {
  return class extends Base implements DependenciesMixin {
    #dependsOn: null | Array<string | {step: string; allow_failure?: boolean;}> | undefined
    #allowDependencyFailure: boolean | undefined

    get dependsOn() {
      return this.#dependsOn
    }

    set dependsOn(dependsOn: null | Array<string | {step: string; allow_failure?: boolean;}> | undefined) {
      this.#dependsOn = dependsOn
    }

    get allowDependencyFailure() {
      return this.#allowDependencyFailure
    }

    set allowDependencyFailure(allowDependencyFailure: boolean | undefined) {
      this.#allowDependencyFailure = allowDependencyFailure
    }
  }
}

export function configureDependency(object: DependenciesMixin, options: DependenciesMixinOptions | undefined) {
  object.dependsOn = options?.dependsOn
  object.allowDependencyFailure = options?.allowDependencyFailure
}

export function buildDependency(object: DependenciesMixin) {
  return {
    depends_on: object.dependsOn,
    allow_dependency_failure: object.allowDependencyFailure
  }
}
