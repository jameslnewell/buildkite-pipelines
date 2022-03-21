import { PipelineObject } from "./pipeline/PipelineObject";
import yaml from 'js-yaml';
import prettier from 'prettier'

export function stringify(pipeline: PipelineObject): string {
  return prettier.format(yaml.dump(pipeline, {styles: {
    sortKeys: true,
    noRefs: true
  }}), {
    parser: 'yaml'
  });
}