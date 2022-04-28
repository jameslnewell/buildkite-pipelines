import { Label, Dependencies, Key } from "./step-objects";
import { StepBuilder } from "./StepBuilder";
import { StepObject } from "./StepObject";

export interface GroupStepObject extends Key, Label, Dependencies {
  group: string | null;
  steps: Array<StepObject | StepBuilder>;
}
