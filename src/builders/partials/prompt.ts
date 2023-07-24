import { Prompt, SelectInput, TextInput } from "../../schema/partials"

export interface PromptBuilder {
  prompt(prompt: string): this;
  field(field: SelectInput | TextInput): this
}

export class PromptHelper {
  #prompt?: string
  #fields: Array<SelectInput | TextInput> = []

  prompt(prompt: string): void {
    this.#prompt = prompt
  }

  field(field: SelectInput | TextInput): void {
    this.#fields.push(field)
  }

  build() {
    const object: Prompt = {}

    if (this.#prompt) {
      object.prompt = this.#prompt
    }

    if (this.#fields.length > 0) {
      object.fields = this.#fields
    }

    return object
  }

}
