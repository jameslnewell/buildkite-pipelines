---
'@jameslnewell/buildkite-pipelines': minor
---

`findSteps` and `findFirstStep` now accept a `GroupStep` as their first argument, in addition to a `Pipeline` or an iterable of steps. A passed group is unwrapped to its child steps (the same way a `Pipeline` already is), so callers can write `findSteps(group, predicate)` instead of `findSteps(group.getSteps(), predicate)`.
