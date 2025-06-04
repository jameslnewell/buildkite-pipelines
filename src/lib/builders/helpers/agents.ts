export interface AgentsBuilder {
  getAgents(): Readonly<Record<string, string>>;
  /**
   * @deprecated Use .addAgent() instead
   */
  agent(tag: string, value: string): this;
  addAgent(tag: string, value: string): this;
}

export class AgentsHelper {
  #agents: Record<string, string> = {};

  getAgents(): Readonly<Record<string, string>> {
    return Object.freeze(this.#agents);
  }

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
