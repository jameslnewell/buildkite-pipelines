import {PipelineNotify, PipelineSchema, StepSchema} from '../schema';
import {PipelineBuilder} from './PipelineBuilder';
import {StepBuilder} from './StepBuilder';
import {StepsBuilder, StepsHelper} from './helpers/steps';
import {AgentsBuilder, AgentsHelper} from './helpers/agents';
import {NotifyBuilder, NotifyHelper} from './helpers/notify';

export class Pipeline
  implements PipelineBuilder, AgentsBuilder, NotifyBuilder, StepsBuilder
{
  #agentsHelper = new AgentsHelper();
  #notifyHelper = new NotifyHelper();
  #stepsHelper = new StepsHelper();

  /**
   * @see https://buildkite.com/docs/agent/v3/cli-start#agent-targeting
   */
  agent(tag: string, value: string): this {
    this.#agentsHelper.agent(tag, value);
    return this;
  }

  /**
   * @see https://buildkite.com/docs/pipelines/notifications
   */
  notify(notify: PipelineNotify): this {
    this.#notifyHelper.notify(notify);
    return this;
  }

  /**
   * @deprecated Use .addStep() instead
   */
  step(step: StepSchema | StepBuilder): this {
    this.#stepsHelper.addStep(step);
    return this;
  }

  addStep(step: StepSchema | StepBuilder): this {
    this.#stepsHelper.addStep(step);
    return this;
  }

  /**
   * @deprecated Use .addSteps() instead
   */
  steps(steps: Iterable<StepSchema | StepBuilder>): this {
    this.#stepsHelper.addSteps(steps);
    return this;
  }

  addSteps(steps: Iterable<StepSchema | StepBuilder>): this {
    this.#stepsHelper.addSteps(steps);
    return this;
  }

  async build(): Promise<PipelineSchema> {
    const pipeline: PipelineSchema = {
      ...this.#agentsHelper.build(),
      ...this.#notifyHelper.build(),
      ...(await this.#stepsHelper.build()),
    };
    return pipeline;
  }
}
