import yaml from 'js-yaml';
import prettier from 'prettier';
import {PipelineSchema} from '../schema';

export function stringify(pipeline: PipelineSchema): string {
  return prettier.format(
    yaml.dump(pipeline, {
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
