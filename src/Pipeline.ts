import { PipelineBuilder } from "./PipelineBuilder";
import { PipelineObject } from "./PipelineObject";
import { StepBuilder } from "./StepBuilder";

export interface PipelineOptions {
  steps?: StepBuilder[]
}

export class Pipeline implements PipelineBuilder {
  #steps: StepBuilder[];

  public constructor({steps}: PipelineOptions = {}) {
    this.#steps = steps ?? [];
  } 

  public build(): PipelineObject {
    return {
      steps: this.#steps.map(step => step.build())
    }
  }
}