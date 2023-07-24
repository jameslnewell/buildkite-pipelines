import { CommandStepSchema, StepDependsOn, StepSchema } from "../../schema";

export interface DependenciesBuilder {
  dependOn(dependency: null | StepDependsOn | Array<StepDependsOn>): this
  allowDependencyFailure(allow: boolean): this
}

export class DependenciesHelper {
  #dependsOn: null | Array<string | {step: string; allow_failure?: boolean;}> = []
  #allowDependencyFailure?: boolean

  dependOn(dependency: null | string | {step: string; allow_failure?: boolean;}): void {
    if (this.#dependsOn === null) {
    } else if (dependency === null) {
      // TODO:
    } else {
      this.#dependsOn.push(dependency)
    }
  }

  allowDependencyFailure(allow: boolean): void {
    this.#allowDependencyFailure = allow
  }

  build() {
    const object: Pick<CommandStepSchema, 'depends_on' | 'allow_dependency_failure'> = {}

    if (this.#dependsOn === null || this.#dependsOn.length > 0) {
      object.depends_on = this.#dependsOn
    }

    if (this.#allowDependencyFailure) {
      object.allow_dependency_failure = this.#allowDependencyFailure
    }

    return object
  }
}
