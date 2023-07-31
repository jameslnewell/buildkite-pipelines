import {PipelineNotify, PipelineSchema, StepSchema} from '../schema';
import {PipelineBuilder} from './PipelineBuilder';
import {StepBuilder} from './StepBuilder';
import {isStepBuilder} from './isStepBuilder';
import {StepsBuilder} from './helpers/steps';
import { AgentsBuilder, AgentsHelper } from './helpers/agents';

export class Pipeline implements PipelineBuilder, StepsBuilder, AgentsBuilder {
  #agentsHelper = new AgentsHelper()
  #notify: Array<PipelineNotify> = [];
  #steps: Array<StepSchema | StepBuilder> = [];

  /**
   * @see https://buildkite.com/docs/agent/v3/cli-start#agent-targeting
   */
  agent(tag: string, value: string): this {
    this.#agentsHelper.agent(tag, value)
    return this;
  }

  /**
   * @see https://buildkite.com/docs/pipelines/notifications
   */
  notify(notify: PipelineNotify): this {
    this.#notify.push(notify);
    return this;
  }

  step(step: StepSchema | StepBuilder): this {
    this.#steps.push(step);
    return this;
  }

  build(): PipelineSchema {
    const pipeline: PipelineSchema = {
      ...this.#agentsHelper.build(),
      steps: this.#steps.map((step) =>
        isStepBuilder(step) ? step.build() : step,
      ),
    };

    if (this.#notify.length) {
      pipeline.notify = this.#notify;
    }

    return pipeline;
  }
}
