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
  skipHelper = new SkipHelper();
  dependenciesHelper = new DependenciesHelper();

  /**
   * Required
   * The name of the group
   * @param label
   * @returns
   */
  label(label: string): this {
    this.#labelHelper.label(label);
    return this;
  }

  /**
   * Required
   * A step
   * @param step
   * @returns
   */
  step(step: StepSchema | StepBuilder): this {
    this.#stepsHelper.step(step);
    return this;
  }

  steps(steps: Iterable<StepSchema | StepBuilder>): this {
    this.#stepsHelper.steps(steps);
    return this;
  }

  key(key: string): this {
    this.#keyHelper.key(key);
    return this;
  }

  skip(skip: boolean): this {
    this.skipHelper.skip(skip);
    return this;
  }

  dependOn(dependency: null | StepDependsOn): this {
    this.dependenciesHelper.dependOn(dependency);
    return this;
  }

  allowDependencyFailure(allow: boolean): this {
    this.dependenciesHelper.allowDependencyFailure(allow);
    return this;
  }

  async build(): Promise<StepSchema> {
    const step: GroupStepSchema = {
      // Workaround until the schema is updated to make `group` nullable
      group: this.#labelHelper.build().label ?? '',
      ...this.#keyHelper.build(),
      ...this.#labelHelper.build(),
      // TODO: cannot have group steps nested within groups so refactor steps helper to take a generic arg
      ...((await this.#stepsHelper.build()) as any),
      ...this.skipHelper.build(),
      ...this.dependenciesHelper.build(),
    };

    return step;
  }
}
