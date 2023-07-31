import {PipelineNotify, PipelineSchema, StepSchema} from '../schema';
import {PipelineBuilder} from './PipelineBuilder';
import {StepBuilder} from './StepBuilder';
import {isStepBuilder} from './isStepBuilder';
import {StepsBuilder} from './helpers/steps';
import {AgentsObject} from '../schema/schema';

export class Pipeline implements PipelineBuilder, StepsBuilder {
  #agents: AgentsObject = {};
  #notify: Array<PipelineNotify> = [];
  #steps: Array<StepSchema | StepBuilder> = [];

  /**
   * @see https://buildkite.com/docs/agent/v3/cli-start#agent-targeting
   */
  agent(tag: string, value: string): this {
    this.#agents[tag] = value;
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
      steps: this.#steps.map((step) =>
        isStepBuilder(step) ? step.build() : step,
      ),
    };

    if (this.#notify.length) {
      pipeline.notify = this.#notify;
    }

    if (Object.keys(this.#agents).length) {
      pipeline.agents = this.#agents;
    }

    return pipeline;
  }
}
