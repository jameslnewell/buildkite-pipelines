import {Pipeline, CommandStep} from '@jameslnewell/buildkite-pipelines';

export default Pipeline.builder().steps([
  CommandStep.builder().command('echo "test"'),
]);
