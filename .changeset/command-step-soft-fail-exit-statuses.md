---
'@jameslnewell/buildkite-pipelines': minor
---

`CommandStep.setSoftFail()` now also accepts exit statuses, e.g. `.setSoftFail([{exit_status: 97}])`, so a step can soft-fail on specific statuses only. `.getSoftFail()` returns whichever was set.
