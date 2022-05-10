export interface SkippableMixinMethods {
  skip(condition: boolean): this;
}

export interface SkippableMixinBuilder extends SkippableMixinMethods {
  build(): { skip?: boolean };
}

export class SkippableMixin {
  static builder(): SkippableMixinBuilder {
    let _skip: boolean | undefined;
    return {
      skip(condition) {
        _skip = condition;
        return this;
      },
      build() {
        if (_skip === undefined) return {};
        return {
          skip: _skip,
        };
      },
    };
  }
}
