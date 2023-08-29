const {Pipeline, CommandStep} = require('@jameslnewell/buildkite-pipelines');

module.exports = new Pipeline().addStep(new CommandStep().addCommand('echo "test"'));
