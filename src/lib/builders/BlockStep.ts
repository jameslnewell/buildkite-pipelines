import {BlockStepSchema, Field, StepDependsOn} from '../schema';
import {StepBuilder} from './StepBuilder';
import {BranchFilterBuilder, BranchFilterHelper} from './helpers/branches';
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
    PromptBuilder
{
  #label?: string;
  #state?: 'passed' | 'failed' | 'running';
  #keyHelper = new KeyHelper();
  #branchesHelper = new BranchFilterHelper();
  #dependenciesHelper = new DependenciesHelper();
  #promptHelper = new PromptHelper();

  /**
   * @deprecated Use .setLabel() instead
   */
  label(label: string): this {
    this.#label = label;
    return this;
  }

  setLabel(label: string): this {
    this.#label = label;
    return this;
  }

  state(state: 'passed' | 'failed' | 'running'): this {
    this.#state = state;
    return this;
  }

  /**
   * @deprecated Use .setKey() instead
   */
  key(key: string): this {
    this.#keyHelper.setKey(key);
    return this;
  }

  setKey(key: string): this {
    this.#keyHelper.setKey(key);
    return this;
  }

  /**
   * @deprecated Use .addBranch() instead
   */
  branch(branch: string): this {
    this.#branchesHelper.addBranch(branch);
    return this;
  }

  addBranch(branch: string): this {
    this.#branchesHelper.addBranch(branch);
    return this;
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

  allowDependencyFailure(allow: boolean): this {
    this.#dependenciesHelper.allowDependencyFailure(allow);
    return this;
  }

  /**
   * @deprecated Use .setPrompt() instead
   */
  prompt(prompt: string): this {
    this.#promptHelper.setPrompt(prompt);
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
    this.#promptHelper.addField(field);
    return this;
  }

  addField(field: Field): this {
    this.#promptHelper.addField(field);
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
