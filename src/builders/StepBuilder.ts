import { StepSchema } from "../schema";

export interface StepBuilder {
  build(): StepSchema;
}
