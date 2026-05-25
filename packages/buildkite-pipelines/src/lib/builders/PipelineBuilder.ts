import {PipelineSchema} from '../schema/index.js';

export interface PipelineBuilder {
  build(): PipelineSchema | Promise<PipelineSchema>;
}
