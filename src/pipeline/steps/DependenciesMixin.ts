export interface DependenciesMixinMethods {
  dependsOn(dependsOn: null | Array<string | {
    step: string; 
    allow_failure?: boolean;
  }>): this;
  allowDependencyFailure(allow: boolean): this
}

export interface DependenciesMixinBuilder extends DependenciesMixinMethods {
  build(): {
    depends_on?: null | Array<string | {
      step: string; 
      allow_failure?: boolean;
    }>;
    allow_dependency_failure?: boolean}
}

export class DependenciesMixin {
  static builder(): DependenciesMixinBuilder {
    let _dependsOn: null | Array<string | {
      step: string; 
      allowFailure?: boolean;
    }> | undefined
    let _allowDependencyFailure: boolean | undefined;
    return {
      dependsOn(dependsOn) {
        _dependsOn = dependsOn;
        return this
      },
      allowDependencyFailure(allow)  {
        _allowDependencyFailure = allow
        return this;
      },
      build() {
        return {
          depends_on: _dependsOn,
          allow_dependency_failure: _allowDependencyFailure
        }
      }
    }
  }
}
