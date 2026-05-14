---
'@jameslnewell/buildkite-pipelines': patch
---

Fix `BlockStep` and `WaitStep` silently dropping `setCondition()` when building the pipeline schema. The condition value is now emitted as the `if` field, matching `CommandStep` and `TriggerStep`.
