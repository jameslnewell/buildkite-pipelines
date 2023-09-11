export interface LabelBuilder {
  /**
   * @deprecated Use .setLabel() instead
   */
  label(label: string): this;
  setLabel(label: string): this;
}

export class LabelHelper {
  #label?: string;

  setLabel(label: string): void {
    this.#label = label;
  }

  build() {
    return this.#label ? {label: this.#label} : {};
  }
}
