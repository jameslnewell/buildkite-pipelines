---
'@jameslnewell/buildkite-pipelines': patch
---

CLI now redirects any stdout written from the imported pipeline file (and any function it executes — factories, builders) to stderr so it doesn't get interleaved with the generated YAML on stdout.
