# jameslnewell/buildkite-pipelines

Generate buildkite pipelines with code.

## Usage

```bash
docker run \
  -v "$(PWD)/pipeline.js:/workdir/pipeline.js" \
  jameslnewell/buildkite-pipelines \
  pipeline.js
```