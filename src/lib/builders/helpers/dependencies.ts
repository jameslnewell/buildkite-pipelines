import {CommandStepSchema, StepDependsOn} from '../../schema';

export interface DependenciesBuilder {
  /**
   * @deprecated Use .addDependency() instead
   */
  dependOn(dependency: null | StepDependsOn | Array<StepDependsOn>): this;
  addDependency(dependency: null | StepDependsOn | Array<StepDependsOn>): this;
  /**
   * @deprecated Use .setAllowDependencyFailure() instead
   */
  allowDependencyFailure(allow: boolean): this;
  setAllowDependencyFailure(allow: boolean): this;
}

export class DependenciesHelper {
  dependencies: null | Array<StepDependsOn> = [];
  #allowDependencyFailure?: boolean;

  addDependency(dependency: null | StepDependsOn): void {
    if (this.dependencies === null) {
    } else if (dependency === null) {
      // TODO:
    } else {
      this.dependencies.push(dependency);
    }
  }

  setAllowDependencyFailure(allow: boolean): void {
    this.#allowDependencyFailure = allow;
  }

  build() {
    const object: Pick<
      CommandStepSchema,
      'depends_on' | 'allow_dependency_failure'
    > = {};

    if (this.dependencies === null || this.dependencies.length > 0) {
      object.depends_on = this.dependencies;
    }

    if (this.#allowDependencyFailure) {
      object.allow_dependency_failure = this.#allowDependencyFailure;
    }

    return object;
  }
}
