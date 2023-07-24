
export interface LabelBuilder {
  label(label: string): this
}

export class LabelHelper {
  #label?: string

  label(label: string): void {
    this.#label = label
  }

  build() {
    return this.#label ? {label: this.#label} : {}
  }
}
