const {Pipeline, CommandStep} = require('@jameslnewell/buildkite-pipelines')

module.exports = Pipeline.builder().steps([CommandStep.builder().command('echo "test"')]);
