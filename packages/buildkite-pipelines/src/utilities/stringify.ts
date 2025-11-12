import yaml from 'js-yaml';
import prettier from 'prettier';
import {PipelineSchema} from '../schema';
import {PipelineBuilder} from '../builders';
import {isPipelineBuilder} from '../builders/isPipelineBuilder';

export async function stringify(
  pipeline: PipelineSchema | PipelineBuilder,
): Promise<string> {
  return prettier.format(
    yaml.dump(isPipelineBuilder(pipeline) ? await pipeline.build() : pipeline, {
      styles: {
        sortKeys: true,
        noRefs: true,
      },
    }),
    {
      parser: 'yaml',
    },
  );
}
