import { StepSchema } from "./StepSchema";

export interface StepBuilder {
  build(): StepSchema;
}
