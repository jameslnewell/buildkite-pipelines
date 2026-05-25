import {
  GroupStep,
  GroupStepSchema,
  Pipeline,
  StepBuilder,
  StepSchema,
} from '../lib/index.js';

export interface FindStepsPredicate {
  (
    step: StepSchema | StepBuilder,
    index: number,
    steps: Array<StepSchema | StepBuilder>,
  ): boolean;
}

export interface FindStepsNarrowPredicate<S extends StepSchema | StepBuilder> {
  (
    step: StepSchema | StepBuilder,
    index: number,
    steps: Array<StepSchema | StepBuilder>,
  ): step is S;
}

export interface FindStepsOptions {
  /**
   * Whether to search recursively within GroupSteps
   */
  recursive?: boolean | undefined;
}

// filter<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S[];

/**
 * Finds all the steps that match the predicate within a pipeline, group, or
 * iterable of steps
 */
export function findSteps<S extends StepSchema | StepBuilder>(
  pipelineGroupOrSteps:
    | Pipeline
    | GroupStep
    | Iterable<StepSchema | StepBuilder>,
  predicate: FindStepsNarrowPredicate<S>,
  options?: FindStepsOptions,
): ReadonlyArray<S>;
export function findSteps(
  pipelineGroupOrSteps:
    | Pipeline
    | GroupStep
    | Iterable<StepSchema | StepBuilder>,
  predicate: FindStepsPredicate,
  options?: FindStepsOptions,
): ReadonlyArray<StepSchema | StepBuilder>;
export function findSteps(
  pipelineGroupOrSteps:
    | Pipeline
    | GroupStep
    | Iterable<StepSchema | StepBuilder>,
  predicate: FindStepsPredicate,
  {recursive = true}: FindStepsOptions = {},
): ReadonlyArray<StepSchema | StepBuilder> {
  // if we have a pipeline or a group, get its child steps; otherwise get the steps from the iterable
  const stepsArray = Array.from(
    pipelineGroupOrSteps instanceof Pipeline ||
      pipelineGroupOrSteps instanceof GroupStep
      ? Array.from(pipelineGroupOrSteps.getSteps())
      : pipelineGroupOrSteps,
  );

  // if recursive=true, add the child steps of any GroupSteps to the array
  const recursiveStepsArray: Array<StepBuilder | StepSchema> = recursive
    ? stepsArray.reduce<Array<StepBuilder | StepSchema>>((acc, step) => {
        // add the step itself
        acc.push(step);
        // add the group steps
        if (step instanceof GroupStep) {
          acc.push(...step.getSteps());
        } else if (isGroupSchema(step)) {
          acc.push(...((step.steps ?? []) as Array<StepSchema>));
        }
        return acc;
      }, [])
    : stepsArray;

  // filter the steps based on the predicate
  const filteredStepsArray = recursiveStepsArray.filter(
    (step, stepIndexInAllSteps, allSteps) =>
      predicate(step, stepIndexInAllSteps, allSteps),
  );

  return filteredStepsArray;
}

function isGroupSchema(
  step: StepSchema | StepBuilder,
): step is GroupStepSchema {
  return (step as any).group || (step as any).steps;
}

/**
 * Finds the first step that matches the predicate within a pipeline, group, or
 * iterable of steps
 */
export function findFirstStep<S extends StepSchema | StepBuilder>(
  pipelineGroupOrSteps:
    | Pipeline
    | GroupStep
    | Iterable<StepSchema | StepBuilder>,
  predicate: FindStepsNarrowPredicate<S>,
  options?: FindStepsOptions,
): S | undefined;
export function findFirstStep(
  pipelineGroupOrSteps:
    | Pipeline
    | GroupStep
    | Iterable<StepSchema | StepBuilder>,
  predicate: FindStepsPredicate,
  options?: FindStepsOptions,
): StepSchema | StepBuilder | undefined;
export function findFirstStep(
  pipelineGroupOrSteps:
    | Pipeline
    | GroupStep
    | Iterable<StepSchema | StepBuilder>,
  predicate: FindStepsPredicate,
  options: FindStepsOptions = {},
): StepSchema | StepBuilder | undefined {
  const steps = findSteps(pipelineGroupOrSteps, predicate, options);
  return steps[0];
}
