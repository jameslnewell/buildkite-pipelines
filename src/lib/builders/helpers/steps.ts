import {StepSchema} from '../../schema';
import {StepBuilder} from '../StepBuilder';
import {isStepBuilder} from '../isStepBuilder';

export interface StepsBuilder {
  getSteps(): ReadonlyArray<StepSchema | StepBuilder>;

  /**
   * @deprecated Use .addStep() instead
   */
  step(step: StepSchema | StepBuilder): this;
  addStep(step: StepSchema | StepBuilder): this;

  /**
   * @deprecated Use .addSteps() instead
   */
  steps(steps: Iterable<StepSchema | StepBuilder>): this;
  addSteps(steps: Iterable<StepSchema | StepBuilder>): this;
}

export class StepsHelper {
  #steps: Array<StepSchema | StepBuilder> = [];

  getSteps(): ReadonlyArray<StepSchema | StepBuilder> {
    // 🤔 not sure we want to allow mutation of the steps yet
    return this.#steps;
  }

  addStep(step: StepSchema | StepBuilder): void {
    this.#steps.push(step);
  }

  addSteps(steps: Iterable<StepSchema | StepBuilder>): void {
    this.#steps.push(...steps);
  }

  async build() {
    return this.#steps.length > 0
      ? {
          steps: await Promise.all(
            this.#steps.map(async (step) =>
              isStepBuilder(step) ? await step.build() : step,
            ),
          ),
        }
      : {};
  }
}
