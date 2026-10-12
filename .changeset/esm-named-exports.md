---
"@jameslnewell/buildkite-pipelines": major
---

Publish as pure ESM

The package is now pure ESM (`"type": "module"`). It builds with `tsc`
(`module: node16`), which under `"type": "module"` emits native
`export * from './…js'` re-exports — so pure-ESM consumers get real ES modules
(and tree-shaking) rather than a CommonJS module loaded via Node's interop.
`schema.json` is loaded with `createRequire` and copied into `dist` by a
`copy:assets` build step.

BREAKING CHANGE: this package is now ESM-only. CommonJS consumers can no longer
`require('@jameslnewell/buildkite-pipelines')` and must use `import` (or dynamic
`import()`) from an ESM context. (Named imports already work from ESM on the
current CommonJS release as of the previous minor — this release drops CommonJS
entirely.)
