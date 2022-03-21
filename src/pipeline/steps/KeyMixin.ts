
export interface KeyMixinMethods {
  key(key: string): this;
}

export interface KeyMixinBuilder extends KeyMixinMethods {
  build(): {key?: string}
}

export class KeyMixin {
  static builder(): KeyMixinBuilder {
    let _key: string | undefined
    return {
      key(key) {
        _key = key;
        return this
      },
      build() {
        return {
          key: _key
        }
      }
    }
  }
}