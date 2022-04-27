import { ConditionalMixin, ConditionalMixinMethods } from "./ConditionalMixin";
import {
  DependenciesMixin,
  DependenciesMixinMethods,
} from "./DependenciesMixin";
import { StepBuilder } from "./StepBuilder";
import { WaitStepObject } from "./WaitStepObject";

namespace WaitStep {
  export interface Builder
    extends StepBuilder,
      ConditionalMixinMethods,
      DependenciesMixinMethods {
    continueOnFailure(value: boolean): this;
  }
}

export class WaitStep {
  static builder(): WaitStep.Builder {
    let _continueOnFailure: boolean | undefined;
    const conditionalMixin = ConditionalMixin.builder();
    const dependenciesMixin = DependenciesMixin.builder();
    return {
      ...(conditionalMixin as any),
      ...dependenciesMixin,
      continueOnFailure(value) {
        _continueOnFailure = value;
        return this;
      },
      build(): WaitStepObject {
        return {
          ...conditionalMixin.build(),
          ...dependenciesMixin.build(),
          wait: null,
          continue_on_failure: _continueOnFailure,
        };
      },
    };
  }
}
