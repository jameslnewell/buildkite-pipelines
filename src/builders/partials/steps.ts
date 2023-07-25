import { StepSchema } from "../../schema";
import { StepBuilder } from "../StepBuilder";
import { isStepBuilder } from "../isStepBuilder";

export interface StepsBuilder {
  step(step: StepSchema | StepBuilder): this
}

export class StepsHelper {
  #steps: Array<StepSchema | StepBuilder> = []

  step(step: StepSchema | StepBuilder): void {
    this.#steps.push(step)
  }

  build() {
    return this.#steps.length > 0 ? {steps: this.#steps.map(step => isStepBuilder(step) ? step.build() : step)} : {}
  }
}
