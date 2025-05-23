import {BlockStepSchema, Field, StepDependsOn} from '../schema';
import {StepBuilder} from './StepBuilder';
import {BranchFilterBuilder, BranchFilterHelper} from './helpers/branches';
import {ConditionBuilder, ConditionHelper} from './helpers/condition';
import {DependenciesBuilder, DependenciesHelper} from './helpers/dependencies';
import {KeyBuilder, KeyHelper} from './helpers/key';
import {LabelBuilder} from './helpers/label';
import {PromptBuilder, PromptHelper} from './helpers/prompt';

export class BlockStep
  implements
    StepBuilder,
    LabelBuilder,
    KeyBuilder,
    BranchFilterBuilder,
    DependenciesBuilder,
    ConditionBuilder,
    PromptBuilder
{
  #label?: string;
  #state?: 'passed' | 'failed' | 'running';
  #keyHelper = new KeyHelper();
  #branchesHelper = new BranchFilterHelper();
  #dependenciesHelper = new DependenciesHelper();
  #promptHelper = new PromptHelper();
  #conditionHelper = new ConditionHelper();

  getLabel(): string | undefined {
    return this.#label;
  }

  /**
   * @deprecated Use .setLabel() instead
   */
  label(label: string): this {
    this.setLabel(label);
    return this;
  }

  setLabel(label: string): this {
    this.#label = label;
    return this;
  }

  /**
   * @deprecated Use .setState() instead
   */
  state(state: 'passed' | 'failed' | 'running'): this {
    return this.setState(state);
  }

  setState(state: 'passed' | 'failed' | 'running'): this {
    this.#state = state;
    return this;
  }

  getKey(): string | undefined {
    return this.#keyHelper.getKey();
  }

  /**
   * @deprecated Use .setKey() instead
   */
  key(key: string): this {
    this.setKey(key);
    return this;
  }

  setKey(key: string): this {
    this.#keyHelper.setKey(key);
    return this;
  }

  getBranches(): Iterable<string> {
    return this.#branchesHelper.getBranches();
  }

  /**
   * @deprecated Use .addBranch() instead
   */
  branch(branch: string): this {
    this.addBranch(branch);
    return this;
  }

  addBranch(branch: string): this {
    this.#branchesHelper.addBranch(branch);
    return this;
  }

  getDependencies(): Iterable<StepDependsOn> {
    return this.#dependenciesHelper.getDependencies();
  }

  /**
   * @deprecated Use .addDependency() instead
   */
  dependOn(dependency: null | StepDependsOn): this {
    return this.addDependency(dependency);
  }

  addDependency(dependency: null | StepDependsOn): this {
    this.#dependenciesHelper.addDependency(dependency);
    return this;
  }

  /**
   * @deprecated Use .setAllowDependencyFailure() instead
   */
  allowDependencyFailure(allow: boolean): this {
    return this.setAllowDependencyFailure(allow);
  }

  setAllowDependencyFailure(allow: boolean): this {
    this.#dependenciesHelper.setAllowDependencyFailure(allow);
    return this;
  }

  /**
   * @deprecated Use .setPrompt() instead
   */
  prompt(prompt: string): this {
    this.setPrompt(prompt);
    return this;
  }

  setPrompt(prompt: string): this {
    this.#promptHelper.setPrompt(prompt);
    return this;
  }

  /**
   * @deprecated Use .addField() instead
   */
  field(field: Field): this {
    this.addField(field);
    return this;
  }

  addField(field: Field): this {
    this.#promptHelper.addField(field);
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

  build(): BlockStepSchema | Promise<BlockStepSchema> {
    if (!this.#label) {
      throw new Error('BlockStep must have a label.');
    }

    const object: BlockStepSchema = {
      block: this.#label,
      ...this.#keyHelper.build(),
      ...this.#branchesHelper.build(),
      ...this.#dependenciesHelper.build(),
      ...this.#promptHelper.build(),
    };

    if (this.#state) {
      object.blocked_state = this.#state;
    }

    return object;
  }
}
