export interface ConditionBuilder {
  getCondition(): string | undefined;
  /**
   * @deprecated Use .setCondition() instead
   */
  condition(condition: string): this;
  setCondition(condition: string): this;
}

export class ConditionHelper {
  #condition?: string;

  getCondition(): string | undefined {
    return this.#condition;
  }

  setCondition(condition: string): void {
    this.#condition = condition;
  }

  build() {
    return this.#condition ? {if: this.#condition} : {};
  }
}
