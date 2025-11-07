import {StepDependsOn, WaitStepSchema} from '../schema';
import {StepBuilder} from './StepBuilder';
import {ConditionBuilder, ConditionHelper} from './helpers/condition';
import {DependenciesBuilder, DependenciesHelper} from './helpers/dependencies';
import {KeyBuilder, KeyHelper} from './helpers/key';

export class WaitStep
  implements StepBuilder, ConditionBuilder, DependenciesBuilder, KeyBuilder
{
  #continueOnFailure: boolean | undefined;
  #conditionHelper = new ConditionHelper();
  #dependenciesHelper = new DependenciesHelper();
  #keyHelper = new KeyHelper();

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

  getCondition(): string | undefined {
    return this.#conditionHelper.getCondition();
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

  getDependencies(): ReadonlyArray<StepDependsOn> {
    return this.#dependenciesHelper.getDependencies();
  }

  /**
   * @deprecated Use .addDependency() instead
   */
  dependOn(dependency: StepDependsOn): this {
    return this.addDependency(dependency);
  }

  addDependency(dependency: StepDependsOn): this {
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

  getKey(): string | undefined {
    return this.#keyHelper.getKey();
  }

  /**
   * @deprecated Use .setKey() instead
   */
  key(key: string): this {
    this.setKey(key);
    return this;
  }

  setKey(key: string): this {
    this.#keyHelper.setKey(key);
    return this;
  }

  build(): WaitStepSchema | Promise<WaitStepSchema> {
    const object: WaitStepSchema = {
      wait: null,
      ...this.#dependenciesHelper.build(),
      ...this.#keyHelper.build(),
    };

    if (this.#continueOnFailure !== undefined) {
      object.continue_on_failure = this.#continueOnFailure;
    }

    return object;
  }
}
