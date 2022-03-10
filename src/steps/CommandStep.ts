import { CommandStepObject } from "./CommandStepObject";
import { PluginBuilder } from "./PluginBuilder";
import { buildKey, configureKey, KeyMixinOptions, mixinKey } from "./mixinKey";
import { StepBuilder } from "./StepBuilder";
import { buildLabel, configureLabel, LabelMixinOptions, mixinLabel } from "./mixinLabel";
import { buildDependency, configureDependency, DependenciesMixinOptions, mixinDependencies } from "./mixinDependencies";
import { BranchesMixinOptions, buildBranches, configureBranches, mixinBranches } from "./mixinBranches";
import { buildConditional, ConditionalMixinOptions, configureConditional, mixinConditional } from "./mixinConditional";

export interface CommandStepOptions extends KeyMixinOptions, LabelMixinOptions, DependenciesMixinOptions, ConditionalMixinOptions, BranchesMixinOptions {
  command?: string | string[]
  if?: string;
  branches?: string[];
  plugins?: PluginBuilder[]

}

export const xCommandStep = class CommandStep implements StepBuilder {
  #dependsOn: (StepBuilder &  {key?: string})[] = [];
  #branches: string[] = [];
  #commands: string[]
  #plugins: PluginBuilder[] = []
  #artifactPaths: string[] = []

  public constructor(command: string | string[] | CommandStepOptions) {
    if (Array.isArray(command)) {
      this.#commands = command 
    } else if (typeof command === 'string') {
      this.#commands = [command]
    } else {
      if (Array.isArray(command.command)) {
        this.#commands = command.command
      } else if (typeof command.command === 'string') {
        this.#commands = [command.command]
      } else {
        this.#commands = []
      }
      this.label = command.label
      this.#plugins = command.plugins ?? []
    }
  }

  public get dependsOn(): StepBuilder[] {
    return this.#dependsOn;
  }

  public dependOn(step: StepBuilder & {key?: string}): this {
    this.#dependsOn?.push(step);
    return this;
  }

  public get branches(): string[] {
    return this.#branches ?? [];
  }

  public addBranch(branch: string): this {
    this.#branches.push(branch);
    return this;
  }

  public build(): CommandStepObject {
    return {
      key: this.#key,
      depends_on: this.#dependsOn.length 
        ? this.#dependsOn.map(step => step.key).filter((key): key is string => !!key)
        : undefined, 
      label: this.#label,
      command: this.#commands[0] ? this.#commands[0] : undefined,
      commands: this.#commands.length > 1 ? this.#commands : undefined,
      plugins: this.#plugins.length ? this.#plugins.map((builder) => builder.build()) : undefined
    }
  }
}

export class CommandStep extends mixinKey(mixinLabel(mixinDependencies(mixinConditional(mixinBranches(class {}))))) implements StepBuilder{
  constructor(options: CommandStepOptions = {}) {
    super()
    configureKey(this, options)
    configureLabel(this, options)
    configureDependency(this, options)
    configureConditional(this, options)
    configureBranches(this, options)
  }

  build(): CommandStepObject {
    return {
      ...buildKey(this),
      ...buildLabel(this),
      ...buildDependency(this),
      ...buildConditional(this),
      ...buildBranches(this),
    }
  }
}

const command = new CommandStep({})
