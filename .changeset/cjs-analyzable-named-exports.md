---
"@jameslnewell/buildkite-pipelines": minor
---

Make named exports resolvable from pure-ESM consumers (without dropping CommonJS)

Pure-ESM consumers couldn't `import { ECRPlugin, CommandStep, … }` from this
package: it was transpiled by swc, whose CJS output re-exports barrels via the
runtime `_export_star` helper, which Node's `cjs-module-lexer` cannot statically
analyze — so no named exports were visible and ESM consumers failed with
`SyntaxError: Named export '…' not found`.

Switch the transpile step from swc to `tsc` with `module: "node16"`. tsc emits
`__exportStar(require(...), exports)` for barrels and `exports.X = X` for leaf
modules — both patterns `cjs-module-lexer` recognises and recurses through — so
named imports now resolve from pure-ESM consumers. `node16` also preserves the
CLI's dynamic `import()`, so user pipeline files authored as ESM still load.

The package remains CommonJS (no `"type": "module"`), so existing
`require('@jameslnewell/buildkite-pipelines')` consumers are unaffected — hence
a minor, non-breaking release.
