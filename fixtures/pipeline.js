const {Pipeline, CommandStep} = require('@jameslnewell/buildkite-pipelines')

module.exports = new Pipeline({
  steps: [
    CommandStep.builder().command('echo "test"')
  ]
})
