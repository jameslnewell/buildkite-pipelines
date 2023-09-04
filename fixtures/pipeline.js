const {Pipeline, CommandStep} = require('@jameslnewell/buildkite-pipelines');

module.exports = new Pipeline().step(new CommandStep().command('echo "test"'));
