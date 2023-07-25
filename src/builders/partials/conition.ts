
export interface ConditionBuilder {
  condition(condition: string): this;
}

export class ConditionHelper {
  #condition?: string

  condition(condition: string): void {
    this.#condition = condition
  }

  build() {
    return this.#condition ? {if: this.#condition} : {}
  }
}
