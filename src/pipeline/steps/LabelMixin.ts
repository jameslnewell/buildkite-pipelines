
export interface LabelMixinMethods {
  label(label: string): this;
}

export interface LabelMixinBuilder extends LabelMixinMethods {
  build(): {label?: string}
}

export class LabelMixin {
  static builder(): LabelMixinBuilder {
    let _label: string | undefined
    return {
      label(label) {
        _label = label;
        return this
      },
      build() {
        return {
          label: _label
        }
      }
    }
  }
}
