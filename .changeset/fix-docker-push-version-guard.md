---
---

Fix the `docker-push` CI job: reference the published version via `needs.publish-package.outputs.version` (not the non-existent `steps.publish-package`), gate the build on a working `docker manifest inspect` exit-code check written to `$GITHUB_OUTPUT` (replacing the deprecated `::set-output` and the broken `steps.version.outputs.pushed` guard). CI-only change; no release required.
