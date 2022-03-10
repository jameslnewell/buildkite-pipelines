import { Conditional, Dependencies } from "./step-objects";

export interface WaitStepObject extends Dependencies, Conditional {
  wait: null;
  continue_on_failure?: boolean;
}