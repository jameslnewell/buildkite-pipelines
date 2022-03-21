import { PluginObject } from "./plugins";
import { Key, Label, Skippable, Branches, Conditional, Dependencies } from "./step-objects";

export interface CommandStepObject extends Key, Label, Dependencies, Conditional, Branches, Skippable {
  command?: string;
  commands?: string[];

  env?: Record<string, string | number>;

  priority?: number;
  concurrency?: number;
  concurrency_group?: string;
  parallelism?: number;

  retry?: 'automatic' | 'manual';
  soft_fail?: boolean | number[];
  timeout_in_minutes?: number;

  artifact_paths?: string[];
  allow_dependency_failure?: boolean;
  agents?: Record<string, string>;

  plugins?: PluginObject[]

  notify?: {
    github_commit_status: {
      context: string
    }
  }
}