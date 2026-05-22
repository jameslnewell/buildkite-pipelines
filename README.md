# buildkite-pipelines

Monorepo for [`@jameslnewell/buildkite-pipelines`](./packages/buildkite-pipelines) and related packages.

![CI/CD](https://github.com/jameslnewell/buildkite-pipelines/actions/workflows/workflow.yml/badge.svg)

## Packages

| Package                                                               | Description                             |
| --------------------------------------------------------------------- | --------------------------------------- |
| [`@jameslnewell/buildkite-pipelines`](./packages/buildkite-pipelines) | Generate Buildkite pipelines from code. |

## Development

This repository uses [pnpm workspaces](https://pnpm.io/workspaces). Each package owns its own build, test, type-check and formatting tooling; the root scripts fan out to every package via `pnpm -r`.

```bash
pnpm install
pnpm run build
pnpm run test
pnpm run check
```

Versioning and publishing are managed at the root with [Changesets](https://github.com/changesets/changesets):

```bash
pnpm changeset        # record a change
pnpm run version      # apply pending changesets (bump versions + changelogs)
pnpm run release      # publish changed packages to npm
```
