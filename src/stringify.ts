import { PipelineObject } from "./PipelineObject";
import yaml from 'js-yaml';
import prettier from 'prettier'

export function stringify(pipeline: PipelineObject): string {
  return prettier.format(yaml.dump(pipeline, {}), {
    parser: 'yaml'
  });
}