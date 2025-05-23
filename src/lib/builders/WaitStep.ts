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

  /**
   * @deprecated Use .setContinueOnFailure() instead
   */
  continueOnFailure(continueOnFailure: boolean): this {
    return this.setContinueOnFailure(continueOnFailure);
  }

  setContinueOnFailure(continueOnFailure: boolean): this {
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

  getDependencies(): Iterable<StepDependsOn> {
    return this.#dependenciesHelper.getDependencies();
  }

  /**
   * @deprecated Use .addDependency() instead
   */
  dependOn(dependency: null | StepDependsOn): this {
    return this.addDependency(dependency);
  }

  addDependency(dependency: null | StepDependsOn): this {
    this.#dependenciesHelper.addDependency(dependency);
    return this;
  }

  /**
   * @deprecated Use .setAllowDependencyFailure() instead
   */
  allowDependencyFailure(allow: boolean): this {
    return this.setAllowDependencyFailure(allow);
  }

  setAllowDependencyFailure(allow: boolean): this {
    this.#dependenciesHelper.setAllowDependencyFailure(allow);
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
