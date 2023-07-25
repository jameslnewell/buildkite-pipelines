import { PipelineSchema, StepSchema } from "../schema";
import { PipelineBuilder } from "./PipelineBuilder";
import { StepBuilder } from "./StepBuilder";
import { isStepBuilder } from "./isStepBuilder";
import { StepsBuilder } from "./partials/steps";

export class Pipeline implements PipelineBuilder, StepsBuilder {
  #steps: Array<StepSchema | StepBuilder> = []

  step(step: StepSchema | StepBuilder): this {
    this.#steps.push(step)
    return this
  }

  build(): PipelineSchema {
    const object: PipelineSchema = {
      steps: this.#steps.map(step => isStepBuilder(step) ? step.build() : step)
    }
    return object;
  }
}
