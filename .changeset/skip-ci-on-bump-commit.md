---
"@jameslnewell/buildkite-pipelines": patch
---

Stop the publish job's PAT push from cascading into a second `🤖 CI/CD` run that fails at `npm publish` (no pending changeset to consume).
