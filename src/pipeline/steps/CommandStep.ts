import { CommandStepObject } from "./CommandStepObject";
import { PluginBuilder } from "./plugins/PluginBuilder";
import { buildKey, configureKey, KeyMixinOptions, mixinKey } from "./mixinKey";
import { StepBuilder } from "./StepBuilder";
import { buildLabel, configureLabel, LabelMixinOptions, mixinLabel } from "./mixinLabel";
import { buildDependency, configureDependency, DependenciesMixinOptions, mixinDependencies } from "./mixinDependencies";
import { BranchesMixinOptions, buildBranches, configureBranches, mixinBranches } from "./mixinBranches";
import { buildConditional, ConditionalMixinOptions, configureConditional, mixinConditional } from "./mixinConditional";
import { PluginObject } from "./plugins/PluginObject";

function isBuilder(step: PluginObject|PluginBuilder): step is PluginBuilder {
  return typeof (step as any).build == 'function'
}

export interface CommandStepOptions extends KeyMixinOptions, LabelMixinOptions, DependenciesMixinOptions, ConditionalMixinOptions, BranchesMixinOptions {
  command: string | string[]
  env?: Record<string, string>;
  plugins?: PluginBuilder[]
}

export class CommandStep extends mixinKey(mixinLabel(mixinDependencies(mixinConditional(mixinBranches(class {}))))) implements StepBuilder {
  #command: string | string[] = []
  #env: Record<string, string> = {};
  #plugins: Array<PluginObject | PluginBuilder> = [];
  #concurrency?: number;
  #concurrency_group?: string

  command(): string  | string[];
  command(command: string | string[]): this;
  command(command?: string | string[]): string | string[] | this {
    if (command) {
      this.#command = command
      return this
    } else {
      return this.#command;
    }
  }

  env(): Record<string, string>;
  env(env: Record<string, string>): this;
  env(env?: Record<string, string>): Record<string, string> | this {
    if (env) {
      this.#env = env
      return this
    } else {
      return this.#env;
    }
  }

  addEnv(name: string, value: string): this {
    this.#env[name] = value
    return this;
  }

  plugins(): Array<PluginObject | PluginBuilder>;
  plugins(plugins: Array<PluginObject | PluginBuilder>): this;
  plugins(plugins?: Array<PluginObject | PluginBuilder>): Array<PluginObject | PluginBuilder> | this {
    if (plugins) {
      this.#plugins = plugins
      return this
    } else {
      return this.#plugins;
    }
  }

  addPlugin(plugin: PluginObject | PluginBuilder): this {
    this.#plugins.push(plugin)
    return this;
  }

  withConcurrency(jobs: number, group: string) {
    this.#concurrency = jobs;
    this.#concurrency_group = group
    return this;
  }

  build(): CommandStepObject {
    const step: CommandStepObject = {
      ...buildKey(this),
      ...buildLabel(this),
      ...buildDependency(this),
      ...buildConditional(this),
      ...buildBranches(this),
    }

    if (Array.isArray(this.#command)) {
      if (this.#command.length > 1) {
        step.commands = this.#command
      } else if (this.#command.length === 1) {
        step.command = this.#command[0]
      } else {
        throw new Error('Invalid command')
      } 
    } else {
      step.command = this.#command
    }

    if (Object.keys(this.#env).length) {
      step.env = this.#env
    }

    if  (this.#plugins.length) {
      step.plugins = this.#plugins.map(plugin => isBuilder(plugin) ? plugin.build() : plugin)
    }
    
    return step
  }
}