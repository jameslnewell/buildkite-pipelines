import { Pipeline, CommandStep } from "@jameslnewell/buildkite-pipelines";

export default new Pipeline({
  steps: [CommandStep.builder().command('echo "test"')],
});
