import { PluginObject } from ".";


export interface CommandStepObject {
  command?: string;
  commands?: string[];

  key?: string;
  depends_on?: (string | {step: string; allow_failure?: boolean;})[];

  label?: string;
  if?: string;
  branches?: string[];
  env?: Record<string, string>;

  priority?: number;
  concurrency?: number;
  concurrency_group?: string;
  parallelism?: number;

  skip?: boolean | string;
  retry?: 'automatic' | 'manual';
  soft_fail?: boolean | number[];
  timeout_in_minutes?: number;

  artifact_paths?: string[];
  allow_dependency_failure?: boolean;
  agents?: Record<string, string>;

  plugins?: PluginObject[]

}