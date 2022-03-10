import { Conditional, Dependencies } from "./step-objects";

export interface WaitStepObject extends Dependencies, Conditional {
  wait: null |  undefined;
  continue_on_failure?: boolean;
}