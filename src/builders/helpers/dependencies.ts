import {CommandStepSchema, StepDependsOn} from '../../schema';

export interface DependenciesBuilder {
  dependOn(dependency: null | StepDependsOn | Array<StepDependsOn>): this;
  allowDependencyFailure(allow: boolean): this;
}

export class DependenciesHelper {
  #dependsOn: null | Array<StepDependsOn> = [];
  #allowDependencyFailure?: boolean;

  dependOn(dependency: null | StepDependsOn): void {
    if (this.#dependsOn === null) {
    } else if (dependency === null) {
      // TODO:
    } else {
      this.#dependsOn.push(dependency);
    }
  }

  allowDependencyFailure(allow: boolean): void {
    this.#allowDependencyFailure = allow;
  }

  build() {
    const object: Pick<
      CommandStepSchema,
      'depends_on' | 'allow_dependency_failure'
    > = {};

    if (this.#dependsOn === null || this.#dependsOn.length > 0) {
      object.depends_on = this.#dependsOn;
    }

    if (this.#allowDependencyFailure) {
      object.allow_dependency_failure = this.#allowDependencyFailure;
    }

    return object;
  }
}
