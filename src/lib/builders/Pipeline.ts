import {PipelineNotification, PipelineSchema, StepSchema} from '../schema';
import {PipelineBuilder} from './PipelineBuilder';
import {StepBuilder} from './StepBuilder';
import {StepsBuilder, StepsHelper} from './helpers/steps';
import {AgentsBuilder, AgentsHelper} from './helpers/agents';
import {NotifyBuilder, NotificationHelper} from './helpers/notifification';
import {EnvironmentBuilder, EnvironmentHelper} from './helpers/env';

export class Pipeline
  implements
    PipelineBuilder,
    AgentsBuilder,
    NotifyBuilder,
    StepsBuilder,
    EnvironmentBuilder
{
  #agentsHelper = new AgentsHelper();
  #envHelper = new EnvironmentHelper();
  #notifyHelper = new NotificationHelper();
  #stepsHelper = new StepsHelper();

  /**
   * @deprecated Use .addAgent() instead
   */
  agent(tag: string, value: string): this {
    return this.addAgent(tag, value);
  }

  /**
   * @see https://buildkite.com/docs/agent/v3/cli-start#agent-targeting
   */
  addAgent(tag: string, value: string): this {
    this.#agentsHelper.addAgent(tag, value);
    return this;
  }

  addEnv(name: string, value: unknown): this {
    this.#envHelper.addEnv(name, value);
    return this;
  }

  /**
   * @deprecated Use .addNotification() instead
   */
  notify(notification: PipelineNotification): this {
    return this.addNotification(notification);
  }

  /**
   * @see https://buildkite.com/docs/pipelines/notifications
   */
  addNotification(notification: PipelineNotification): this {
    this.#notifyHelper.addNotification(notification);
    return this;
  }

  /**
   * @deprecated Use .addStep() instead
   */
  step(step: StepSchema | StepBuilder): this {
    this.addStep(step);
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
    this.addSteps(steps);
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
      ...this.#envHelper.build(),
    };
    return pipeline;
  }
}
