import {AgentsObject} from '../../schema/schema';

export interface AgentsBuilder {
  /**
   * @deprecated Use .addAgent() instead
   */
  agent(tag: string, value: string): this;
  addAgent(tag: string, value: string): this;
}

export class AgentsHelper {
  #agents: AgentsObject = {};

  /**
   * @see https://buildkite.com/docs/agent/v3/cli-start#agent-targeting
   */
  addAgent(tag: string, value: string): void {
    this.#agents[tag] = value;
  }

  build() {
    return Object.keys(this.#agents).length > 0 ? {agents: this.#agents} : {};
  }
}
