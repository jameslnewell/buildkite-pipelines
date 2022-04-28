import { StepBuilder } from "./StepBuilder";
import { StepObject } from "./StepObject";

function isBuilder(step: StepObject | StepBuilder): step is StepBuilder {
  return typeof (step as any).build == "function";
}

export interface StepsMixinMethods {
  steps(steps: Array<StepObject | StepBuilder>): this;
  addStep(step: StepObject | StepBuilder): this;
}

export interface StepsMixinBuilder extends StepsMixinMethods {
  build(): { steps: Array<StepObject | StepBuilder> };
}

export class StepsMixin {
  static builder(): StepsMixinBuilder {
    let _steps: Array<StepObject | StepBuilder> = [];
    return {
      steps(steps) {
        _steps = steps;
        return this;
      },
      addStep(step) {
        _steps.push(step);
        return this;
      },
      build() {
        return {
          steps: _steps.map((step) => {
            if (isBuilder(step)) {
              return step.build();
            } else {
              return step;
            }
          }),
        };
      },
    };
  }
}
