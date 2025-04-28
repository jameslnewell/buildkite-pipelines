import {StepSchema} from '../../schema';
import {StepBuilder} from '../StepBuilder';
import {isStepBuilder} from '../isStepBuilder';

export interface StepsBuilder {
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

  addStep(step: StepSchema | StepBuilder): void {
    this.#steps.push(step);
  }

  addSteps(steps: Iterable<StepSchema | StepBuilder>): void {
    this.#steps.push(...steps);
  }

  build() {
    return this.#steps.length > 0
      ? {
          steps: this.#steps.map((step) =>
            isStepBuilder(step) ? step.build() : step,
          ),
        }
      : {};
  }
}
