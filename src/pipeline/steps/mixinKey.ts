import { Constructor } from "../../Constructor"

export interface KeyMixin {
  key(): string | undefined;
  key(key: string | undefined): this;
}

export interface KeyMixinOptions {
  key?: string
}

export function mixinKey<BaseType extends Constructor>(Base: BaseType) {
  return class extends Base implements KeyMixin {
    #key: string | undefined

    key(): string | undefined;
    key(key: string | undefined): this;
    key(key?: string | undefined): string | undefined | this {
      if (key) {
        this.#key = key
        return this
      } else {
        return this.#key;
      }
    }
  }
}

export function configureKey(object: KeyMixin, options: KeyMixinOptions | undefined) {
  object.key(options?.key)
}

export function buildKey(object: KeyMixin) {
  const output: {key?: string}  = {}
  if  (object.key()) {
    output.key = object.key()
  }
  return output;
}
