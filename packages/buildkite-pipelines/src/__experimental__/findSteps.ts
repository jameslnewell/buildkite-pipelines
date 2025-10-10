import {Pipeline} from '../lib/builders/Pipeline';
import {StepBuilder} from '../lib/builders/StepBuilder';
import {StepSchema} from '../lib/schema';

export interface FindStepsPredicate {
  (
    step: StepSchema | StepBuilder,
    index: number,
    steps: Array<StepSchema | StepBuilder>,
  ): boolean;
}

export interface FindStepsOptions {
  recursive?: boolean;
}

/**
 * Finds all the steps that match the predicate within a pipeline or array of steps
 */
export function findSteps(
  pipelineOrSteps: Pipeline | Iterable<StepSchema | StepBuilder>,
  predicate: FindStepsPredicate,
  options: FindStepsOptions = {},
): ReadonlyArray<StepSchema | StepBuilder> {
  // if we have a pipeline, get the steps from the pipeline, otherwise get the steps from the iterable
  const stepsArray = Array.from(
    pipelineOrSteps instanceof Pipeline
      ? pipelineOrSteps.getSteps()
      : pipelineOrSteps,
  );

  // filter the steps based on the predicate
  let filteredStepsArray = stepsArray.filter((step, index, steps) =>
    predicate(step, index, steps),
  );

  // if recursive, search nested steps
  if (options.recursive) {
    for (const step of stepsArray) {
      if (
        typeof step === 'object' &&
        step !== null &&
        'getSteps' in step &&
        typeof (step as any).getSteps === 'function'
      ) {
        filteredStepsArray = filteredStepsArray.concat(
          findSteps((step as any).getSteps(), predicate, options),
        );
      }
    }
  }

  return filteredStepsArray;
}

/**
 * Finds the first step that matches the predicate within a pipeline or array of steps
 */
export function findFirstStep(
  pipelineOrSteps: Pipeline | Iterable<StepSchema | StepBuilder>,
  predicate: FindStepsPredicate,
  options: FindStepsOptions = {},
): StepSchema | StepBuilder | undefined {
  const steps = findSteps(pipelineOrSteps, predicate, options);
  return steps[0];
}
