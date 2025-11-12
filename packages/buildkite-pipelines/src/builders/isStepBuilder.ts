import {StepSchema} from '../schema';
import {StepBuilder} from './StepBuilder';

export function isStepBuilder(
  step: StepSchema | StepBuilder,
): step is StepBuilder {
  return !!step && typeof (step as any).build == 'function';
}
