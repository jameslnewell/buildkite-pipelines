import { Constructor } from "../Constructor"

export interface KeyMixin {
  key: string | undefined
}

export interface KeyMixinOptions {
  key?: string
}

export function mixinKey<BaseType extends Constructor>(Base: BaseType) {
  return class extends Base implements KeyMixin {
    #key: string | undefined

    get key() {
      return this.#key
    }

    set key(key: string  | undefined) {
      this.#key = key
    }
  }
}

export function configureKey(object: KeyMixin, options: KeyMixinOptions | undefined) {
  object.key = options?.key
}

export function buildKey(object: KeyMixin) {
  return {
    key: object.key
  }
}
