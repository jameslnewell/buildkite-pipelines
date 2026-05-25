import {StepSchema} from '../schema/index.js';

export interface StepBuilder {
  build(): StepSchema | Promise<StepSchema>;
}
