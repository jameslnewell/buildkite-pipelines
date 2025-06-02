import {StepDependsOn, TriggerStepSchema} from '../schema';
import {StepBuilder} from './StepBuilder';
import {BranchFilterBuilder, BranchFilterHelper} from './helpers/branches';
import {ConditionBuilder, ConditionHelper} from './helpers/condition';
import {DependenciesBuilder, DependenciesHelper} from './helpers/dependencies';
import {KeyBuilder, KeyHelper} from './helpers/key';
import {LabelBuilder, LabelHelper} from './helpers/label';
import {SkipBuilder, SkipHelper} from './helpers/skip';

export class TriggerStep
  implements
    KeyBuilder,
    StepBuilder,
    LabelBuilder,
    BranchFilterBuilder,
    ConditionBuilder,
    DependenciesBuilder,
    SkipBuilder
{
  #pipeline?: string;
  #async?: boolean;
  #softFail?: boolean;
  #build?: TriggerStepSchema['build'];
  #keyHelper = new KeyHelper();
  #labelHelper = new LabelHelper();
  #branchesHelper = new BranchFilterHelper();
  #conditionHelper = new ConditionHelper();
  #dependenciesHelper = new DependenciesHelper();
  #skipHelper = new SkipHelper();

  setPipeline(pipeline: string): this {
    this.#pipeline = pipeline;
    return this;
  }

  setAsync(async: boolean): this {
    this.#async = async;
    return this;
  }

  setSoftFail(fail: boolean): this {
    this.#softFail = fail;
    return this;
  }

  setBuild(build: TriggerStepSchema['build']): this {
    this.#build = build;
    return this;
  }

  setKey(key: string): this {
    this.#keyHelper.setKey(key);
    return this;
  }

  /**
   * @deprecated Use .setLabel() instead
   */
  label(label: string): this {
    this.setLabel(label);
    return this;
  }

  setLabel(label: string): this {
    this.#labelHelper.setLabel(label);
    return this;
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
   * @deprecated Use .setSkip() instead
   */
  skip(skip: boolean | string): this {
    return this.setSkip(skip);
  }

  setSkip(skip: boolean | string): this {
    this.#skipHelper.setSkip(skip);
    return this;
  }

  build(): TriggerStepSchema | Promise<TriggerStepSchema> {
    const object: TriggerStepSchema = {
      trigger: this.#pipeline,
      ...this.#keyHelper.build(),
      ...this.#labelHelper.build(),
      ...this.#branchesHelper.build(),
      ...this.#conditionHelper.build(),
      ...this.#dependenciesHelper.build(),
      ...this.#skipHelper.build(),
    };

    if (this.#async) {
      object.async = this.#async;
    }

    if (this.#softFail) {
      object.soft_fail = this.#softFail;
    }

    if (this.#build) {
      object.build = this.#build;
    }

    return object;
  }
}
