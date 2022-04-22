import { PipelineBuilder } from "./PipelineBuilder";
import { StepBuilder } from "./steps/StepBuilder";
import { StepObject } from "./steps/StepObject";

function isBuilder(step: StepObject | StepBuilder): step is StepBuilder {
  return typeof (step as any).build == "function";
}

interface Builder extends PipelineBuilder {
  steps(steps: Array<StepObject | StepBuilder>): this;
  addStep(step: StepObject | StepBuilder): this;
}

export class Pipeline {
  static builder(): Builder {
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
