import {StepDependsOn, WaitStepSchema} from '../schema';
import {StepBuilder} from './StepBuilder';
import {ConditionBuilder, ConditionHelper} from './helpers/condition';
import {DependenciesBuilder, DependenciesHelper} from './helpers/dependencies';

export class WaitStep
  implements StepBuilder, ConditionBuilder, DependenciesBuilder
{
  #continueOnFailure: boolean | undefined;
  #conditionHelper = new ConditionHelper();
  #dependenciesHelper = new DependenciesHelper();

  continueOnFailure(continueOnFailure: boolean): this {
    this.#continueOnFailure = continueOnFailure;
    return this;
  }

  /**
   * @deprecated Use .setCondition() instead
   */
  condition(condition: string): this {
    return this.setCondition(condition);
  }

  setCondition(condition: string): this {
    this.#conditionHelper.setCondition(condition);
    return this;
  }

  /**
   * @deprecated Use .addDependency() instead
   */
  dependsOn(dependency: null | StepDependsOn): this {
    return this.addDependency(dependency);
  }

  addDependency(dependency: null | StepDependsOn): this {
    this.#dependenciesHelper.addDependency(dependency);
    return this;
  }

  allowDependencyFailure(allow: boolean): this {
    this.#dependenciesHelper.allowDependencyFailure(allow);
    return this;
  }

  build(): WaitStepSchema | Promise<WaitStepSchema> {
    const object: WaitStepSchema = {
      wait: null,
      ...this.#dependenciesHelper.build(),
    };

    if (this.#continueOnFailure !== undefined) {
      object.continue_on_failure = this.#continueOnFailure;
    }

    return object;
  }
}
