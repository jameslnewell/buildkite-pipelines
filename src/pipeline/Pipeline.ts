import { PipelineObject } from "./PipelineObject";
import { StepBuilder } from "./steps/StepBuilder";
import { StepObject } from "./steps/StepObject";

function isBuilder(step: StepObject|StepBuilder): step is StepBuilder {
  return typeof (step as any).build == 'function'
}

export interface PipelineOptions {
  steps?: Array<StepObject | StepBuilder>
}

export class Pipeline {
  #steps: Array<StepObject | StepBuilder>;

  constructor(options: PipelineOptions) {
    this.#steps = options.steps ?? []
  }

  build(): PipelineObject {
    return {
      steps: this.#steps.map(step => {
        if (isBuilder(step)) {
          return step.build()
        } else {
          return step;
        }
      })
    }
  }
}