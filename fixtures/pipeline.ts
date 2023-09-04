import {Pipeline, CommandStep} from '@jameslnewell/buildkite-pipelines';

export default new Pipeline().step(new CommandStep().command('echo "test"'));
