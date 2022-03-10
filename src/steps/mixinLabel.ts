import { Constructor } from "../Constructor"

export interface LabelMixin {
  label: string | undefined
}

export interface LabelMixinOptions {
  label?: string
}

export function mixinLabel<BaseType extends Constructor>(Base: BaseType) {
  return class extends Base implements LabelMixin {
    #label: string | undefined

    get label() {
      return this.#label
    }

    set label(label: string  | undefined) {
      this.#label = label
    }
  }
}

export function configureLabel(object: LabelMixin, options: LabelMixinOptions | undefined) {
  object.label = options?.label
}

export function buildLabel(object: LabelMixin) {
  return {
    label: object.label
  }
}
