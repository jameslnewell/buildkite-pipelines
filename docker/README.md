# jameslnewell/buildkite-pipelines

Generate buildkite pipelines with code.

## Usage

```bash
docker run \
  --volume $(PWD)/pipeline.js:/workdir/pipeline.js \
  jameslnewell/buildkite-pipelines \
  buildkite-pipelines pipeline.js
```