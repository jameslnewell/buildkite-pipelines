import {PipelineSchema} from '../schema/index.js';
import {PipelineBuilder} from './PipelineBuilder.js';

export function isPipelineBuilder(
  pipeline: PipelineSchema | PipelineBuilder,
): pipeline is PipelineBuilder {
  return !!pipeline && typeof (pipeline as any).build == 'function';
}
