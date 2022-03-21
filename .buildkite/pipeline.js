const {Pipeline, CommandStep} = require('@jameslnewell/buildkite-pipelines')

module.exports.pipeline = new Pipeline({
  steps: [
    CommandStep.builder().command('echo "test"')
  ]
})