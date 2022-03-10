import { Branches, Conditional, Dependencies, Prompt } from "./step-objects";

export interface InputStepObject extends Dependencies, Conditional, Branches, Prompt {
  block: string;
}