import { Label, Skippable, Branches, Conditional, Dependencies } from "./step-objects";

export interface TriggerStepObject extends Label, Dependencies, Conditional, Branches, Skippable {
  trigger: string
  async?: string;
  build?: {
    message?: string;
    commit?: string;
    branch?: string;
    meta_data?: Record<string, string>;
    env?: Record<string, string>;
  }
}