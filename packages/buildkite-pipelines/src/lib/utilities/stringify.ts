import yaml from 'js-yaml';
import prettier from 'prettier';
import {PipelineSchema} from '../schema/index.js';
import {PipelineBuilder} from '../builders/index.js';
import {isPipelineBuilder} from '../builders/isPipelineBuilder.js';

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
