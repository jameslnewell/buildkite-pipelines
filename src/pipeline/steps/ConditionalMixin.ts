export interface ConditionalMixinMethods {
  if(condition: string): this;
}

export interface ConditionalMixinBuilder extends ConditionalMixinMethods {
  build(): { if?: string };
}

export class ConditionalMixin {
  static builder(): ConditionalMixinBuilder {
    let _if: string | undefined;
    return {
      if(condition) {
        _if = condition;
        return this;
      },
      build() {
        return {
          if: _if,
        };
      },
    };
  }
}
