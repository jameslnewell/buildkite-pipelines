import { GroupStepSchema, StepSchema } from "../schema"
import { StepDependency } from "../schema/partials"
import { StepBuilder } from "./StepBuilder"
import { DependenciesBuilder, DependenciesHelper } from "./partials/dependencies"
import { KeyBuilder, KeyHelper } from "./partials/key"
import { LabelBuilder, LabelHelper } from "./partials/label"
import { NotifyBuilder } from "./partials/notify"
import { SkipBuilder, SkipHelper } from "./partials/skip"
import { StepsHelper } from "./partials/steps"

export class GroupStep implements StepBuilder, KeyBuilder, LabelBuilder, DependenciesBuilder, SkipBuilder/*, NotifyBuilder*/ {
  #labelHelper = new LabelHelper()
  #stepsHelper = new StepsHelper()
  #keyHelper = new KeyHelper()
  skipHelper = new SkipHelper()
  dependenciesHelper = new DependenciesHelper()

  /**
   * Required
   * The name of the group
   * @param label 
   * @returns 
   */
  label(label: string): this {
    this.#labelHelper.label(label)
    return this;
  }

  /**
   * Required
   * A step
   * @param step 
   * @returns 
   */
  step(step: StepSchema | StepBuilder): this {
    this.#stepsHelper.step(step)
    return this
  }

  key(key: string): this {
    this.#keyHelper.key(key)
    return this
  }

  skip(skip: boolean): this {
    this.skipHelper.skip(skip)
    return this
  }

  dependOn(dependency: null | StepDependency): this {
    this.dependenciesHelper.dependOn(dependency)
    return this
  }

  allowDependencyFailure(allow: boolean): this {
    this.dependenciesHelper.allowDependencyFailure(allow)
    return this
  }

  build(): GroupStepSchema {
    const step: GroupStepSchema = {
      group: "",
      ...this.#keyHelper.build(),
      ...this.#labelHelper.build(),
      ...this.#stepsHelper.build(),
      ...this.skipHelper.build(),
      ...this.dependenciesHelper.build(),
    }

    return step;
  }
}

