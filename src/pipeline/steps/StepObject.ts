import { BlockStepObject } from "./BlockStepObject";
import { CommandStepObject } from "./CommandStepObject";
import { WaitStepObject } from "./WaitStepObject";
import { InputStepObject } from "./InputStepObject";
import { TriggerStepObject } from "./TriggerStepObject";
import { GroupStepObject } from "./GroupStepObject";

export type StepObject =
  | BlockStepObject
  | CommandStepObject
  | GroupStepObject
  | InputStepObject
  | TriggerStepObject
  | WaitStepObject;
