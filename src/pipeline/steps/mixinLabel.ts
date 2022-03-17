import { Constructor } from "../../Constructor"

export interface LabelMixin {
  label(): string | undefined;
  label(label: string | undefined): this;
}

export interface LabelMixinOptions {
  label?: string
}

export function mixinLabel<BaseType extends Constructor>(Base: BaseType) {
  return class extends Base implements LabelMixin {
    #label: string | undefined

    label(): string | undefined;
    label(label: string | undefined): this;
    label(label?: string | undefined): string | undefined | this {
      if (label) {
        this.#label = label
        return this
      } else {
        return this.#label;
      }
    }
  }
}

export function configureLabel(object: LabelMixin, options: LabelMixinOptions | undefined) {
  object.label(options?.label)
}

export function buildLabel(object: LabelMixin) {
  const output: {label?: string}  = {}
  if  (object.label()) {
    output.label = object.label()
  }
  return output;
}
