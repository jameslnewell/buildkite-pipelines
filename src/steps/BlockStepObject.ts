import { Branches, Conditional, Dependencies, Key, Prompt } from "./step-objects";

export interface BlockStepObject extends Key, Dependencies, Conditional, Branches, Prompt {
  block: string;
  blocked_state?: 'passed' | 'failed' | 'running'
}