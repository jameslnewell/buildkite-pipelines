---
'@jameslnewell/buildkite-pipelines': minor
---

- Added `.get*` methods to many places where there are equivalent `.set*` or `.add*` methods in order to allow walking through the pipeline, steps and plugins for testing purposes
- Added `@jameslnewell/buildkite-pipelines/__experimental__` entrypoint containing two new `findSteps()` and `findPlugins()` functions to assist in walking through the pipeline, steps and plugins for testing purposes
- Changed the signature of `dependOn` and `addDependency` because you cannot specify both null and a list

    ```diff
    -  dependOn(dependency: null | StepDependsOn): this
    +  dependOn(dependency: StepDependsOn): this
    ```

    ```diff
    -  addDependency(dependency: null | StepDependsOn): this 
    +  addDependency(dependency: StepDependsOn): this
    ```

    > ⚠️ This is technically a breaking change, but also a fix, hopefully noone is relying on this behaviour
