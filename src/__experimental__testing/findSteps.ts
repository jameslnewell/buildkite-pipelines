import {
  GroupStep,
  GroupStepSchema,
  Pipeline,
  StepBuilder,
  StepSchema,
} from '../lib';

export interface FindStepsPredicate {
  (
    step: StepSchema | StepBuilder,
    index: number,
    steps: Array<StepSchema | StepBuilder>,
  ): boolean;
}

export interface FindStepsOptions {
  /**
   * Whether to search recursively within GroupSteps
   */
  recursive?: boolean | undefined;
}

/**
 * Find steps that match the predicate within a pipeline
 */
export function findSteps(
  pipelineOrSteps: Pipeline | Iterable<StepSchema | StepBuilder>,
  predicate: FindStepsPredicate,
  {recursive = true}: FindStepsOptions = {},
): Array<StepSchema | StepBuilder> {
  // if we have a pipeline, get the steps from the pipeline, otherwise get the steps from the iterable
  const stepsArray = Array.from(
    pipelineOrSteps instanceof Pipeline
      ? pipelineOrSteps.getSteps()
      : pipelineOrSteps,
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
