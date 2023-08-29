import {Pipeline, CommandStep} from '@jameslnewell/buildkite-pipelines';

export default new Pipeline().addStep(new CommandStep().addCommand('echo "test"'));
