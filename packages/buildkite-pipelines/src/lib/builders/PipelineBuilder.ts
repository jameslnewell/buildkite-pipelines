import {PipelineSchema} from '../schema';

export interface PipelineBuilder {
  build(): PipelineSchema | Promise<PipelineSchema>;
}
