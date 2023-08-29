import {Field} from '../../schema';
import {InputStep} from '../../schema/schema';

export interface PromptBuilder {
  /**
   * @deprecated Use .setPrompt() instead
   */
  prompt(prompt: string): this;
  setPrompt(prompt: string): this;

  /**
   * @deprecated Use .addField() instead
   */
  field(field: Field): this;
  addField(field: Field): this;
}

export class PromptHelper {
  #prompt?: string;
  #fields: Array<Field> = [];

  setPrompt(prompt: string): void {
    this.#prompt = prompt;
  }

  addField(field: Field): void {
    this.#fields.push(field);
  }

  build() {
    const object: Pick<InputStep, 'prompt' | 'fields'> = {};

    if (this.#prompt) {
      object.prompt = this.#prompt;
    }

    if (this.#fields.length > 0) {
      object.fields = this.#fields;
    }

    return object;
  }
}
