import { WaitStepSchema } from "../schema";
import { StepDependency } from "../schema/partials";
import { StepBuilder } from "./StepBuilder";
import { ConditionBuilder, ConditionHelper } from "./partials/conition";
import { DependenciesBuilder, DependenciesHelper } from "./partials/dependencies";

export class WaitStep implements StepBuilder, ConditionBuilder, DependenciesBuilder {
  #continueOnFailure: boolean | undefined;
  #conditionHelper = new ConditionHelper
  #dependenciesHelper = new DependenciesHelper()

  continueOnFailure(continueOnFailure: boolean): this {
    this.#continueOnFailure = continueOnFailure
    return this
  }

  condition(condition: string): this {
    this.#conditionHelper.condition(condition)
    return this
  }

  dependOn(dependency: null | StepDependency): this {
    this.#dependenciesHelper.dependOn(dependency)
    return this
  }

  allowDependencyFailure(allow: boolean): this {
    this.#dependenciesHelper.allowDependencyFailure(allow)
    return this
  }

  build(): WaitStepSchema {
    const object: WaitStepSchema = { 
      wait: null, 
      ...this.#dependenciesHelper.build() 
    }

    if (this.#continueOnFailure !== undefined) {
      object.continue_on_failure = this.#continueOnFailure
    }

    return object
  }
}

new WaitStep().condition('xyz').dependOn('unit-test')
