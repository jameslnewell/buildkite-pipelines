import { StepObject } from "./StepObject";

export interface StepBuilder {
  build(): StepObject;
}