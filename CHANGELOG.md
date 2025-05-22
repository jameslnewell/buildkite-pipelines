# @jameslnewell/buildkite-pipelines

## 3.15.0

### Minor Changes

- 6984ea3: Add keywords to package.json

## 3.14.0

### Minor Changes

- 78bb601: Add CommandStep retries via .setManualRetry() and .addAutomaticRetry()

## 3.13.0

### Minor Changes

- a6795f2: update plugin versions

## 3.12.0

### Minor Changes

- 73b4204: Add DockerPlugin.setExpandVolumeVars

## 3.11.0

### Minor Changes

- bf08cb3: Add from,to to addDownload and addUpload methods of ArtifactsPlugin"

## 3.10.3

### Patch Changes

- dbc34f8: fix spelling of propagateAWSAauthTokens

## 3.10.2

### Patch Changes

- 68014f7: improve error handling of Pipeline.build()

## 3.10.1

### Patch Changes

- 6447c05: force script name in cli

## 3.10.0

### Minor Changes

- 28486ca: work around artifacts ignore-missing issue by outputing a single download/upload instead of an array when there is only a single value

## 3.9.0

### Minor Changes

- fc68e9b: Added .addEnv() to Pipeline

## 3.8.0

### Minor Changes

- 0852755: Updated all of the plugin versions

## 3.7.0

### Minor Changes

- d1b391a: Adds support for the `assume-role` `ecr-buildkite-plugin` option.

## 3.6.0

### Minor Changes

- 64e8fac: Added TriggerStep builder

## 3.5.1

### Patch Changes

- 5d4ff30: Add missing @deprecated JSDoc

## 3.5.0

### Minor Changes

- 382ccd0: Add more explicitly named methods and deprecate the old methods.

## 3.4.0

### Minor Changes

- 271ca8a: Add CommandStep.plugins(...) method for adding multiple plugins at once

## 3.3.1

### Patch Changes

- 800ecd0: log validation errors to stderr when validation errors are ignored

## 3.3.0

### Minor Changes

- f088682: Improve error messaging

## 3.2.0

### Minor Changes

- 524572f: Add --cwd option to the CLI

## 3.1.1

### Patch Changes

- f67b971: more specific return type

## 3.1.0

### Minor Changes

- 892e6a0: Add Pipeline.steps([...]) and GroupStep.steps([...]) methods to add multiple steps at once.

## 3.0.1

### Patch Changes

- 8f22b9d: Fix missing await in the CLI

## 3.0.0

### Major Changes

- ca6f2ba: Make .build(), validate() and stringify() functions async"

## 2.8.0

### Minor Changes

- d7f50aa: Add DockerECRCachePlugin
- 9084b95: Added ArtifactsPlugin

## 2.7.0

### Minor Changes

- 5af7a22: Add .user and .userns methods to DockerPlugin

## 2.6.0

### Minor Changes

- 04dfccc: Added ECRPlugin and updated SecretsManagerPlugin

## 2.5.1

### Patch Changes

- 3222290: Move tagline before status checks so it shows on npmjs.com

## 2.5.0

### Minor Changes

- 92e934e: Update the version of the docker plugin and add additional methods

## 2.4.0

### Minor Changes

- b61b108: Generate API docs from types and publish to Github Pages

## 2.3.0

### Minor Changes

- b2ee598: Add support for Agent on CommandStep

## 2.2.0

### Minor Changes

- d230699: Support passing a PipelineBuilder where PipelineSchema is accepted (the stringify and validate methods)

## 2.1.0

### Minor Changes

- 85dbb5d: Added builder methods for pipeline notify and agents properties

## 2.0.3

### Patch Changes

- 699ccb8: Export StepBuilder interface

## 2.0.2

### Patch Changes

- b8e428a: Fix GroupStep validation errors

## 2.0.1

### Patch Changes

- ad3a656: Standardise command output to always generate an array
- c9b6e89: Set group key to null, allowing label key to be used instead

## 2.0.0

### Major Changes

- a8e47e0: Refactor Buildkite primative builder syntax

## 1.6.0

### Minor Changes

- bf5acaa: added skip

## 1.5.0

### Minor Changes

- ef9280d: Add parallelism and docker-login properties

## 1.4.1

### Patch Changes

- c0e142c: export namespaces better

## 1.4.0

### Minor Changes

- 4de8150: append steps

## 1.3.0

### Minor Changes

- 6b35d38: Added GroupStep

### Patch Changes

- 6b35d38: Clear yarn cache after install on docker image

## 1.2.1

### Patch Changes

- 73eea9c: export namespaces

## 1.2.0

### Minor Changes

- db6a51f: Nest builder interfaces within namespaces

## 1.1.9

### Patch Changes

- 1b3ab15: Only install production dependencies

## 1.1.8

### Patch Changes

- af0db8c: Fixed bin path in docker image

## 1.1.6

### Patch Changes

- ce56e99: Use builder

## 1.1.5

### Patch Changes

- da9ac24: fix release script version

## 1.1.4

### Patch Changes

- 238e10c: test

## 1.1.4

### Patch Changes

- trying to republish the latest content
