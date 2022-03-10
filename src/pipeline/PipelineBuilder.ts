import { PipelineObject } from "./PipelineObject";

export interface PipelineBuilder {
  build(): PipelineObject;
}