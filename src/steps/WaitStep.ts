import { StepBuilder } from "./StepBuilder";
import { WaitStepObject } from "./WaitStepObject";
import {buildDependency, configureDependency, DependenciesMixinOptions, mixinDependencies} from './mixinDependencies'
import { buildConditional, ConditionalMixinOptions, configureConditional, mixinConditional } from "./mixinConditional";

export interface WaitStepOptions extends DependenciesMixinOptions, ConditionalMixinOptions {
  continueOnFailure?: boolean
}

export class WaitStep extends mixinDependencies(mixinConditional(class {})) implements StepBuilder {
  #continueOnFailure?: boolean;

  constructor(options: WaitStepOptions = {}) {
    super()
    configureDependency(this, options)
    configureConditional(this, options)
    this.#continueOnFailure = options.continueOnFailure
  }

  get continueOnFailure() {
    return this.#continueOnFailure
  }

  set continueOnFailure(value: boolean | undefined) {
    this.#continueOnFailure  = value
  }

  build(): WaitStepObject {
    return {
      //  null when other values are defined, undefined when other values are undefined
      wait: null,
      ...buildDependency(this),
      ...buildConditional(this),
      continue_on_failure: this.#continueOnFailure
    }
  }
}