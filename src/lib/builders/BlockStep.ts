import {BlockStepSchema, Field, StepDependsOn} from '../schema';
import {StepBuilder} from './StepBuilder';
import {BranchesBuilder, BranchesHelper} from './helpers/branches';
import {DependenciesBuilder, DependenciesHelper} from './helpers/dependencies';
import {KeyBuilder, KeyHelper} from './helpers/key';
import {LabelBuilder} from './helpers/label';
import {PromptBuilder, PromptHelper} from './helpers/prompt';

export class BlockStep
  implements
    StepBuilder,
    LabelBuilder,
    KeyBuilder,
    BranchesBuilder,
    DependenciesBuilder,
    PromptBuilder
{
  #label?: string;
  #state?: 'passed' | 'failed' | 'running';
  #keyHelper = new KeyHelper();
  #branchesHelper = new BranchesHelper();
  #dependenciesHelper = new DependenciesHelper();
  #promptHelper = new PromptHelper();

  label(label: string): this {
    this.#label = label;
    return this;
  }

  state(state: 'passed' | 'failed' | 'running'): this {
    this.#state = state;
    return this;
  }

  key(key: string): this {
    this.#keyHelper.key(key);
    return this;
  }

  branch(branch: string): this {
    this.#branchesHelper.branch(branch);
    return this;
  }

  dependOn(dependency: null | StepDependsOn): this {
    this.#dependenciesHelper.dependOn(dependency);
    return this;
  }

  allowDependencyFailure(allow: boolean): this {
    this.#dependenciesHelper.allowDependencyFailure(allow);
    return this;
  }

  prompt(prompt: string): this {
    this.#promptHelper.prompt(prompt);
    return this;
  }

  field(field: Field): this {
    this.#promptHelper.field(field);
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
