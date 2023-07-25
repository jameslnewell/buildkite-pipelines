import { Field } from "../../schema";
import { InputStep } from "../../schema/schema";

export interface PromptBuilder {
  prompt(prompt: string): this;
  field(field: Field): this
}

export class PromptHelper {
  #prompt?: string
  #fields: Array<Field> = []

  prompt(prompt: string): void {
    this.#prompt = prompt
  }

  field(field: Field): void {
    this.#fields.push(field)
  }

  build() {
    const object: Pick<InputStep, 'prompt' |'fields'> = {}

    if (this.#prompt) {
      object.prompt = this.#prompt
    }

    if (this.#fields.length > 0) {
      object.fields = this.#fields
    }

    return object
  }

}
