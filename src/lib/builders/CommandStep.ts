import {StepBuilder} from './StepBuilder';
import {KeyBuilder, KeyHelper} from './helpers/key';
import {LabelBuilder, LabelHelper} from './helpers/label';
import {ConditionBuilder, ConditionHelper} from './helpers/conition';
import {BranchesBuilder, BranchesHelper} from './helpers/branches';
import {DependenciesBuilder, DependenciesHelper} from './helpers/dependencies';
import {SkipBuilder, SkipHelper} from './helpers/skip';
import {PluginBuilder} from './PluginBuilder';
import {CommandStepSchema, PluginSchema, StepDependsOn} from '../schema';
import {isPluginBuilder} from './isPluginBuilder';
import {AgentsBuilder, AgentsHelper} from './helpers/agents';

export class CommandStep
  implements
    StepBuilder,
    KeyBuilder,
    LabelBuilder,
    ConditionBuilder,
    BranchesBuilder,
    DependenciesBuilder,
    SkipBuilder,
    AgentsBuilder
{
  #commands?: string[];
  #plugins: Array<PluginSchema | PluginBuilder> = [];
  #keyHelper = new KeyHelper();
  #labelHelper = new LabelHelper();
  #conditionHelper = new ConditionHelper();
  #branchesHelper = new BranchesHelper();
  #dependenciesHelper = new DependenciesHelper();
  #skipHelper = new SkipHelper();
  #agentsHelper = new AgentsHelper();

  #concurrency?: number;
  #concurrency_group?: string;
  #parallelism?: number;
  #env?: Record<string, string | number>;
  #soft_fail?: boolean;
  #timeout_in_minutes?: number;

  command(command: string): this {
    if (!this.#commands) {
      this.#commands = [];
    }
    this.#commands.push(command);
    return this;
  }

  key(key: string): this {
    this.#keyHelper.key(key);
    return this;
  }

  label(label: string): this {
    this.#labelHelper.label(label);
    return this;
  }

  condition(condition: string): this {
    this.#conditionHelper.condition(condition);
    return this;
  }

  branch(branch: string): this {
    this.#branchesHelper.branch(branch);
    return this;
  }

  dependOn(dependency: StepDependsOn): this {
    this.#dependenciesHelper.dependOn(dependency);
    return this;
  }

  allowDependencyFailure(allow: boolean): this {
    this.#dependenciesHelper.allowDependencyFailure(allow);
    return this;
  }

  skip(skip: boolean): this {
    this.#skipHelper.skip(skip);
    return this;
  }

  plugin(plugin: PluginSchema | PluginBuilder): this {
    this.#plugins.push(plugin);
    return this;
  }

  parallelism(parallelism: number): this {
    if (parallelism === 0) {
      throw new Error('Parallelism of zero will result in step being omitted');
    }

    this.#parallelism = parallelism;
    return this;
  }

  env(key: string, value: string | number): this {
    if (!this.#env) {
      this.#env = {};
    }
    this.#env[key] = value;
    return this;
  }

  concurrency(group: string, jobs: number): this {
    if (jobs === 0) {
      throw new Error(
        'Concurrency of zero will result in step which never starts',
      );
    }

    this.#concurrency = jobs;
    this.#concurrency_group = group;
    return this;
  }

  softFail(fail: boolean = true): this {
    this.#soft_fail = fail;
    return this;
  }

  timeout(minutes: number): this {
    this.#timeout_in_minutes = minutes;
    return this;
  }

  agent(tag: string, value: string): this {
    this.#agentsHelper.agent(tag, value);
    return this;
  }

  build(): CommandStepSchema {
    const object: CommandStepSchema = {
      ...{commands: this.#commands},
      ...this.#keyHelper.build(),
      ...this.#labelHelper.build(),
      ...this.#conditionHelper.build(),
      ...this.#branchesHelper.build(),
      ...this.#dependenciesHelper.build(),
      ...this.#skipHelper.build(),
      ...(this.#parallelism ? {parallelism: this.#parallelism} : {}),
      ...(this.#concurrency ? {concurrency: this.#concurrency} : {}),
      ...(this.#concurrency_group
        ? {concurrency_group: this.#concurrency_group}
        : {}),
      ...(this.#env ? {env: this.#env} : {}),
      ...(this.#soft_fail ? {soft_fail: this.#soft_fail} : {}),
      ...(this.#timeout_in_minutes
        ? {timeout_in_minutes: this.#timeout_in_minutes}
        : {}),
      ...this.#agentsHelper.build(),
    };

    if (this.#plugins.length > 0) {
      object.plugins = this.#plugins.map((plugin) =>
        isPluginBuilder(plugin) ? plugin.build() : plugin,
      );
    }

    return object;
  }
}