---
'@jameslnewell/buildkite-pipelines': minor
---

`CommandStep` now supports `concurrency_method` via `.setConcurrencyMethod('ordered' | 'eager')` and `.getConcurrencyMethod()`. The field is only emitted when set. Buildkite requires a concurrency limit and group alongside it, so pair it with `.setConcurrency()` and `.setConcurrencyGroup()`.
