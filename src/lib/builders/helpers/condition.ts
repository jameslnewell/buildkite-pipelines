export interface ConditionBuilder {
  /**
   * @deprecated Use .setCondition() instead
   */
  condition(condition: string): this;
  setCondition(condition: string): this;
}

export class ConditionHelper {
  #condition?: string;

  setCondition(condition: string | undefined): void {
    this.#condition = condition;
  }

  build() {
    return this.#condition ? {if: this.#condition} : {};
  }
}
