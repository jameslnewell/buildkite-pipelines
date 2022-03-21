# @jameslnewell/buildkite-pipelines

Generate buildkite pipelines with code.

## Installation

NPM:
```bash
npm install @jameslnewell/buildkite-pipelines
```

Yarn:
```bash
yarn add --dev @jameslnewell/buildkite-pipelines
```

## Usage

`./buildkite/pipeline.js`
```ts
import {Pipeline, CommandStep, stringify} from '@jameslnewell/buildkite-pipelines';

export const pipeline = Pipeline.builder()
  .steps([
    CommandStep.builder()
      .label('👋 Greeting')
      .command('echo "Hello World!"')
  ])

```

`./buildkite/pipeline.yml`
```yaml
steps:
  - commands:
      - buildkite-pipeline ./.buildkite/pipeline.js | buildkite-agent pipeline upload
    plugins:
      - docker#v3.11.0:
          image: jameslnewell/buildkite-pipelines
```

## Why?

This library is a very thin wrapper around [Buildkite's `yaml` syntax for defining a pipeline](https://buildkite.com/docs/pipelines/defining-steps). As such the value of this library is unlikely to be realised for simple one-file pipelines. 

Consider using this library when:

- you're dynamically generating the pipeline and you require a programming language
- your pipeline is split across multiple `yaml` files and you're unable to use `yaml` anchors and aliases for composition across them
- you can't possibly live without typings

### Development

1. Setup a pipeline - use the command for setting up a docker agent [here](https://buildkite.com/organizations/jameslnewell/agents?return_to_pipeline=buildkite-pipelines&welcome=true#setup-docker)