import {StepSchema} from '../schema/index.js';
import {StepBuilder} from './StepBuilder.js';

export function isStepBuilder(
  step: StepSchema | StepBuilder,
): step is StepBuilder {
  return !!step && typeof (step as any).build == 'function';
}
