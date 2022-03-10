import { CommandStepObject } from "./CommandStepObject";
import { PluginBuilder } from "./PluginBuilder";
import { buildKey, configureKey, KeyMixinOptions, mixinKey } from "./mixinKey";
import { StepBuilder } from "./StepBuilder";
import { buildLabel, configureLabel, LabelMixinOptions, mixinLabel } from "./mixinLabel";
import { buildDependency, configureDependency, DependenciesMixinOptions, mixinDependencies } from "./mixinDependencies";
import { BranchesMixinOptions, buildBranches, configureBranches, mixinBranches } from "./mixinBranches";
import { buildConditional, ConditionalMixinOptions, configureConditional, mixinConditional } from "./mixinConditional";

function configure(object: CommandStep, options?: CommandStepOptions) {
  configureKey(object, options)
  configureLabel(object, options)
  configureDependency(object, options)
  configureConditional(object, options)
  configureBranches(object, options)
}

export interface CommandStepOptions extends KeyMixinOptions, LabelMixinOptions, DependenciesMixinOptions, ConditionalMixinOptions, BranchesMixinOptions {
  command?: string | string[]
  plugins?: PluginBuilder[]
}

export class CommandStep extends mixinKey(mixinLabel(mixinDependencies(mixinConditional(mixinBranches(class {}))))) implements StepBuilder{
  #command: undefined | string | string[]

  constructor(command: string, options?: CommandStepOptions)
  constructor(commands: string[], options?: CommandStepOptions)
  constructor(options: CommandStepOptions) 
  constructor(commandCommandsOrOptions: string | string[] | CommandStepOptions, options?: CommandStepOptions) {
    super()
    if (typeof commandCommandsOrOptions === 'string') {
      this.#command = commandCommandsOrOptions
      configure(this, options)
    } else if (Array.isArray(commandCommandsOrOptions)) {
      this.#command = commandCommandsOrOptions
      configure(this, options)
    } else if (commandCommandsOrOptions) {
      this.#command = commandCommandsOrOptions.command
      configure(this, commandCommandsOrOptions)
    } else  {
      throw new Error('Invalid options')
    }
  }

  build(): CommandStepObject {
    const step: CommandStepObject = {
      ...buildKey(this),
      ...buildLabel(this),
      ...buildDependency(this),
      ...buildConditional(this),
      ...buildBranches(this),
    }

    if (Array.isArray(this.#command) && this.#command.length > 1) {
      step.commands = this.#command
    } else if (Array.isArray(this.#command)) {
      step.command = this.#command[0]
    } else {
      step.command = this.#command
    }

    return step
  }
}

