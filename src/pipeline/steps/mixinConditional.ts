import { Constructor } from "../../Constructor"

export interface ConditionalMixin {
  if(): string | undefined;
  if(condition: string | undefined): this;
}

export interface ConditionalMixinOptions {
  if?: string
}

export function mixinConditional<BaseType extends Constructor>(Base: BaseType) {
  return class extends Base implements ConditionalMixin {
    #if: string | undefined

    if(): string | undefined;
    if(condition: string | undefined): this;
    if(condition?: string | undefined): string | undefined | this {
      if (condition) {
        this.#if = condition
        return this
      } else {
        return this.#if;
      }
    }
  }
}

export function configureConditional(object: ConditionalMixin, options: ConditionalMixinOptions | undefined) {
  object.if(options?.if)
}

export function buildConditional(object: ConditionalMixin) {
  const output: {if?: string}  = {}
  if  (object.if()) {
    output.if  = object.if()
  }
  return output;
}
