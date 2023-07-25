import { PipelineSchema} from "../schema";
import { PipelineBuilder } from "./PipelineBuilder";

export function isPipelineBuilder(pipeline: PipelineSchema | PipelineBuilder): pipeline is PipelineBuilder {
  return !!pipeline && typeof (pipeline as any).build == "function";
}
