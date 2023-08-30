import { StepBuilder } from './StepBuilder';
import { KeyBuilder, KeyHelper } from './helpers/key';
import { LabelBuilder, LabelHelper } from './helpers/label';
import { ConditionBuilder, ConditionHelper } from './helpers/condition';
import { BranchFilterBuilder, BranchFilterHelper } from './helpers/branches';
import { DependenciesBuilder, DependenciesHelper } from './helpers/dependencies';
import { SkipBuilder, SkipHelper } from './helpers/skip';
import { PluginBuilder } from './PluginBuilder';
import { CommandStepSchema, PluginSchema, StepDependsOn } from '../schema';
import { isPluginBuilder } from './isPluginBuilder';
import { AgentsBuilder, AgentsHelper } from './helpers/agents';

export class CommandStep
  implements
  StepBuilder,
  KeyBuilder,
  LabelBuilder,
  ConditionBuilder,
  BranchFilterBuilder,
  DependenciesBuilder,
  SkipBuilder,
  AgentsBuilder {
  #commands?: string[];
  #plugins: Array<PluginSchema | PluginBuilder> = [];
  #keyHelper = new KeyHelper();
  #labelHelper = new LabelHelper();
  #conditionHelper = new ConditionHelper();
  #branchesHelper = new BranchFilterHelper();
  #dependenciesHelper = new DependenciesHelper();
  #skipHelper = new SkipHelper();
  #agentsHelper = new AgentsHelper();

  #concurrency?: number;
  #concurrency_group?: string;
  #parallelism?: number;
  #env: Record<string, string | number> = {};
  #soft_fail?: boolean;
  #timeout_in_minutes?: number;

  /**
   * @deprecated Use .addCommand() instead
   */
  command(command: string): this {
    return this.addCommand(command);
  }

  addCommand(command: string): this {
    if (!this.#commands) {
      this.#commands = [];
    }
    this.#commands.push(command);
    return this;
  }

  /**
   * @deprecated Use .setKey() instead
   */
  key(key: string): this {
    return this.setKey(key);
  }

  setKey(key: string): this {
    this.#keyHelper.setKey(key);
    return this;
  }

  /**
   * @deprecated Use .setLabel() instead
   */
  label(label: string): this {
    return this.setLabel(label);
  }

  setLabel(label: string): this {
    this.#labelHelper.setLabel(label);
    return this;
  }

  /**
   * @deprecated Use .setCondition() instead
   */
  condition(condition: string): this {
    return this.setCondition(condition);
  }

  setCondition(condition: string): this {
    this.#conditionHelper.setCondition(condition);
    return this;
  }

  /**
   * @deprecated Use .addBranch() instead
   */
  branch(branch: string): this {
    return this.addBranch(branch);
  }

  addBranch(branch: string): this {
    this.#branchesHelper.addBranch(branch);
    return this;
  }

  /**
   * @deprecated Use .addDependency() instead
   */
  dependsOn(dependency: null | StepDependsOn): this {
    return this.addDependency(dependency);
  }

  addDependency(dependency: null | StepDependsOn): this {
    this.#dependenciesHelper.addDependency(dependency);
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

  /**
   * @deprecated Use .addPlugin() instead
   */
  plugin(plugin: PluginSchema | PluginBuilder): this {
    return this.addPlugin(plugin);
  }

  addPlugin(plugin: PluginSchema | PluginBuilder): this {
    this.#plugins.push(plugin);
    return this;
  }

  /**
   * @deprecated Use .addPlugins() instead
   */
  plugins(plugins: Iterable<PluginSchema | PluginBuilder>): this {
    return this.addPlugins(plugins);
  }

  addPlugins(plugins: Iterable<PluginSchema | PluginBuilder>): this {
    this.#plugins.push(...plugins);
    return this;
  }

  /**
   * @deprecated Use .setParallelism() instead
   */
  parallelism(parallelism: number): this {
    return this.setParallelism(parallelism);
  }

  setParallelism(parallelism: number): this {
    if (parallelism === 0) {
      throw new Error('Parallelism of zero will result in step being omitted');
    }

    this.#parallelism = parallelism;
    return this;
  }

  /**
   * @deprecated Use .addEnv() instead
   */
  env(name: string, value: string | number): this {
    return this.addEnv(name, value);
  }

  addEnv(name: string, value: string | number): this {
    this.#env[name] = value;
    return this;
  }

  /**
   * @deprecated Use .setConcurrency() instead
   */
  concurrency(group: string, jobs: number): this {
    return this.setConcurrency(group, jobs);
  }

  setConcurrency(group: string, jobs: number): this {
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

  /**
   * @deprecated Use .setTimeout() instead
   */
  timeout(minutes: number): this {
    return this.setTimeout(minutes);
  }

  setTimeout(minutes: number): this {
    this.#timeout_in_minutes = minutes;
    return this;
  }

  /**
   * @deprecated Use .addAgent() instead
   */
  agent(tag: string, value: string): this {
    return this.addAgent(tag, value);
  }

  addAgent(tag: string, value: string): this {
    this.#agentsHelper.addAgent(tag, value);
    return this;
  }

  async build(): Promise<CommandStepSchema> {
    const object: CommandStepSchema = {
      ...{ commands: this.#commands },
      ...this.#keyHelper.build(),
      ...this.#labelHelper.build(),
      ...this.#conditionHelper.build(),
      ...this.#branchesHelper.build(),
      ...this.#dependenciesHelper.build(),
      ...this.#skipHelper.build(),
      ...(this.#parallelism ? { parallelism: this.#parallelism } : {}),
      ...(this.#concurrency ? { concurrency: this.#concurrency } : {}),
      ...(this.#concurrency_group
        ? { concurrency_group: this.#concurrency_group }
        : {}),
      ...(Object.keys(this.#env).length ? { env: this.#env } : {}),
      ...(this.#soft_fail ? { soft_fail: this.#soft_fail } : {}),
      ...(this.#timeout_in_minutes
        ? { timeout_in_minutes: this.#timeout_in_minutes }
        : {}),
      ...this.#agentsHelper.build(),
    };

    if (this.#plugins.length > 0) {
      object.plugins = await Promise.all(
        this.#plugins.map(async (plugin) =>
          isPluginBuilder(plugin) ? await plugin.build() : plugin,
        ),
      );
    }

    return object;
  }
}
