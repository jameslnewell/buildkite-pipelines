import {
  DependenciesMixin,
  DependenciesMixinMethods,
} from "./DependenciesMixin";
import { KeyMixin, KeyMixinMethods } from "./KeyMixin";
import { LabelMixin, LabelMixinMethods } from "./LabelMixin";
import { StepsMixin, StepsMixinMethods } from "./StepsMixin";
import { StepBuilder } from "./StepBuilder";

export namespace GroupStep {
  export interface Builder
    extends StepBuilder,
      KeyMixinMethods,
      LabelMixinMethods,
      DependenciesMixinMethods,
      StepsMixinMethods {}
}

export class GroupStep {
  static builder(): GroupStep.Builder {
    const keyMixin = KeyMixin.builder();
    const labelMixin = LabelMixin.builder();
    const dependenciesMixin = DependenciesMixin.builder();
    const stepsMixin = StepsMixin.builder();
    return {
      ...(keyMixin as any),
      ...labelMixin,
      ...dependenciesMixin,
      ...stepsMixin,
      build() {
        return {
          ...keyMixin.build(),
          ...labelMixin.build(),
          ...dependenciesMixin.build(),
          ...stepsMixin.build(),
          group: null,
        };
      },
    };
  }
}
