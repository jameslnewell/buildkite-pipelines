---
'@jameslnewell/buildkite-pipelines': major
---

BREAKING CHANGE:

⚠️ `.build()` methods are no longer asynchronous!

- `PipelineBuilder.build(): PipelineSchema | Promise<PipelineSchema>` has been changed to `PipelineBuilder.build(): PipelineSchema`
- `StepBuilder.build(): StepSchema | Promise<StepSchema>` has been changed to `StepBuilder.build(): StepSchema`
- `PluginBuilder.build(): PluginSchema | Promise<PluginSchema>` has been changed to `PluginBuilder.build(): PluginSchema`

ℹ️ Pipeline factories can still be async e.g. 

```ts
export const pipeline = async () => new Pipeline()
```

If your pipelines require some kind of async operation to generate your pipeline then we recommend one of the following patterns:

Pattern #1:
```ts

interface MyPipelineOptions {
  otherOption: any
}

async function createMyPipeline({otherOption}: MyPipelineOptions): Promise<Pipeline> {
  // do something async
  const thing = await getThing();
  return new Pipeline()
    .addStep(
      new CommandStep()
      // do something with thing
        .setLabel(`Test ${thing.name} ${otherOption}`)
    )
}

export const pipeline = async () => createMyPipeline({otherOption: 'value'})
```

If you wish to test your pipeline generation it might be simplest to keep the async behaviour separate from the pipeline factory:

Pattern #1.1

```ts

interface MyPipelineOptions {
  thing: Thing
  otherOption: string
}

function createMyPipeline({thing, otherOption}: MyPipelineOptions): Pipeline {
  return new Pipeline()
    .addStep(
      new CommandStep()
      // do something with thing
        .setLabel(`Test ${thing.name} ${otherOption}`)
    )
}

export const pipeline = async () => {
  const thing = await getThing()
  return createMyPipeline({thing, otherOption: 'some-value'})
}

```

Pattern #2:
```ts

class MyPipeline extends PipelineBuilder {

  static create(): Promise<MyPipeline> {
    // do something async
    const thing = await getThing();
    return new MyPipeline(thing)
  }

  #thing: Thing
  #otherOption: string

  constructor(thing: Thing) {
    this.#thing = thing
  }

  setOtherOption(value: string): this {
    this.#otherOption = value
    return this
  }

  build() {
    return new Pipeline()
    // do something with thing
    .addStep(
      new CommandStep()
        .setLabel(`Test ${this.#thing.name} ${this.#otherOption}`)
    )
  }

}

export const pipeline = async () => {
  (await MyPipeline.create()).setOption('value')
}

```
