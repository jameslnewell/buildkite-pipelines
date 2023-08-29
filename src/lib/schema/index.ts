import {
  JSONSchemaForBuildkitePipelineConfigurationFiles,
  BlockStep,
  CommandStep,
  GroupStep,
  InputStep,
  TriggerStep,
  WaitStep,
  Fields,
  BuildNotify,
} from './schema';

export {
  BlockStep as BlockStepSchema,
  CommandStep as CommandStepSchema,
  GroupStep as GroupStepSchema,
  InputStep as InputStepSchema,
  TriggerStep as TriggerStepSchema,
  WaitStep as WaitStepSchema,
};

export type PipelineSchema = JSONSchemaForBuildkitePipelineConfigurationFiles;
export type StepSchema =
  | BlockStep
  | CommandStep
  | GroupStep
  | InputStep
  | TriggerStep
  | WaitStep;
export type PluginSchema = {
  [pluginName: string]: null | {[name: string]: unknown};
};

export type StepDependsOn = Extract<
  NonNullable<CommandStep['depends_on']>,
  any[]
> extends (infer U)[]
  ? U
  : never;

export type Field = Fields extends (infer U)[] ? U : never;

export type PipelineNotify = BuildNotify extends (infer U)[] ? U : never;
