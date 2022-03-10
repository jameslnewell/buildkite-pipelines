import { Constructor } from "../Constructor"

export interface ConditionalMixin {
  if: string | undefined
}

export interface ConditionalMixinOptions {
  if?: string
}

export function mixinConditional<BaseType extends Constructor>(Base: BaseType) {
  return class extends Base implements ConditionalMixin {
    #if: string | undefined

    get if() {
      return this.#if
    }

    set if(value: string  | undefined) {
      this.#if = value
    }
  }
}

export function configureConditional(object: ConditionalMixin, options: ConditionalMixinOptions | undefined) {
  object.if = options?.if
}

export function buildConditional(object: ConditionalMixin) {
  return {
    if: object.if
  }
}
