---
'@jameslnewell/buildkite-pipelines': patch
---

Fix the published package shipping only TypeScript declarations and no compiled JavaScript. `@swc/cli` emits to `dist/src/...`, but `files`/`main`/`bin` reference `dist/cli`, `dist/lib` and `dist/__experimental__`, so only the `.d.ts` files written by `tsc` were ever packaged. Build with `--strip-leading-paths` so swc emits to `dist/cli`, `dist/lib` and `dist/__experimental__`, matching the published paths.
