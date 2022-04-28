import { PipelineBuilder } from "./PipelineBuilder";
import { StepsMixin, StepsMixinMethods } from "./steps/StepsMixin";

export namespace Pipeline {
  export interface Builder extends PipelineBuilder, StepsMixinMethods {}
}

export class Pipeline {
  static builder(): Pipeline.Builder {
    const stepsMixin = StepsMixin.builder();
    return {
      ...(stepsMixin as any),
      build() {
        return {
          ...stepsMixin.build(),
        };
      },
    };
  }
}
