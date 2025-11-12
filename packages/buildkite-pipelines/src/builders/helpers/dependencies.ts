import {CommandStepSchema, StepDependsOn} from '../../schema';

export interface DependenciesBuilder {
  getDependencies(): ReadonlyArray<StepDependsOn>;
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
  #dependencies: Array<StepDependsOn> = [];
  #allowDependencyFailure?: boolean;

  getDependencies(): ReadonlyArray<StepDependsOn> {
    return this.#dependencies;
  }

  addDependency(dependency: StepDependsOn): void {
    this.#dependencies.push(dependency);
  }

  setAllowDependencyFailure(allow: boolean): void {
    this.#allowDependencyFailure = allow;
  }

  build() {
    const object: Pick<
      CommandStepSchema,
      'depends_on' | 'allow_dependency_failure'
    > = {};

    if (this.#dependencies.length > 0) {
      object.depends_on = this.#dependencies;
    }

    if (this.#allowDependencyFailure) {
      object.allow_dependency_failure = this.#allowDependencyFailure;
    }

    return object;
  }
}
