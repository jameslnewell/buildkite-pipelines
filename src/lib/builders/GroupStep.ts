import {GroupStepSchema, StepDependsOn, StepSchema} from '../schema';
import {StepBuilder} from './StepBuilder';
import {DependenciesBuilder, DependenciesHelper} from './helpers/dependencies';
import {KeyBuilder, KeyHelper} from './helpers/key';
import {LabelBuilder, LabelHelper} from './helpers/label';
import {SkipBuilder, SkipHelper} from './helpers/skip';
import {StepsBuilder, StepsHelper} from './helpers/steps';

export class GroupStep
  implements
    StepBuilder,
    KeyBuilder,
    LabelBuilder,
    DependenciesBuilder,
    SkipBuilder,
    StepsBuilder
{
  /*, NotifyBuilder*/
  #labelHelper = new LabelHelper();
  #stepsHelper = new StepsHelper();
  #keyHelper = new KeyHelper();
  #skipHelper = new SkipHelper();
  #dependenciesHelper = new DependenciesHelper();

  /**
   * @deprecated Use .setLabel() instead
   */
  label(label: string): this {
    this.setLabel(label);
    return this;
  }

  setLabel(label: string): this {
    this.#labelHelper.setLabel(label);
    return this;
  }

  /**
   * @deprecated Use .addStep() instead
   */
  step(step: StepSchema | StepBuilder): this {
    this.addStep(step);
    return this;
  }

  addStep(step: StepSchema | StepBuilder): this {
    this.#stepsHelper.addStep(step);
    return this;
  }

  /**
   * @deprecated Use .addSteps() instead
   */
  steps(steps: Iterable<StepSchema | StepBuilder>): this {
    this.addSteps(steps);
    return this;
  }

  addSteps(steps: Iterable<StepSchema | StepBuilder>): this {
    this.#stepsHelper.addSteps(steps);
    return this;
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

  /**
   * @deprecated Use .setSkip() instead
   */
  skip(skip: boolean | string): this {
    return this.setSkip(skip);
  }

  setSkip(skip: boolean | string): this {
    this.#skipHelper.setSkip(skip);
    return this;
  }

  /**
   * @deprecated Use .setKey() instead
   */
  dependOn(dependency: null | StepDependsOn): this {
    return this.addDependency(dependency);
  }

  addDependency(dependency: null | StepDependsOn): this {
    this.#dependenciesHelper.addDependency(dependency);
    return this;
  }

  /**
   * @deprecated Use .setKey() instead
   */
  allowDependencyFailure(allow: boolean = true): this {
    return this.setAllowDependencyFailure(allow);
  }

  setAllowDependencyFailure(allow: boolean): this {
    this.#dependenciesHelper.setAllowDependencyFailure(allow);
    return this;
  }

  async build(): Promise<GroupStepSchema> {
    const step: GroupStepSchema = {
      // Workaround until the schema is updated to make `group` nullable
      group: this.#labelHelper.build().label ?? '',
      ...this.#keyHelper.build(),
      ...this.#labelHelper.build(),
      // TODO: cannot have group steps nested within groups so refactor steps helper to take a generic arg
      ...((await this.#stepsHelper.build()) as any),
      ...this.#skipHelper.build(),
      ...this.#dependenciesHelper.build(),
    };

    return step;
  }
}
