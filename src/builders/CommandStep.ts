
import { StepBuilder } from "./StepBuilder";
import { KeyBuilder, KeyHelper } from "./partials/key";
import { LabelBuilder, LabelHelper } from "./partials/label";
import { ConditionBuilder, ConditionHelper } from "./partials/conition";
import { BranchesBuilder, BranchesHelper } from "./partials/branches";
import { DependenciesBuilder, DependenciesHelper } from "./partials/dependencies";
import { SkipBuilder, SkipHelper } from "./partials/skip";
import { PluginBuilder } from "./PluginBuilder";
import {CommandStepSchema, PluginSchema, StepDependsOn } from "../schema";
import { isPluginBuilder } from "./isPluginBuilder";
import { CommandBuilder, CommandHelper } from "./partials/command";

export class CommandStep implements StepBuilder, KeyBuilder, LabelBuilder, ConditionBuilder, BranchesBuilder, DependenciesBuilder, SkipBuilder {
  #command?: string | string[]
  #plugins: Array<PluginSchema | PluginBuilder> = []
  #keyHelper = new KeyHelper()
  #labelHelper = new LabelHelper()
  #conditionHelper = new ConditionHelper()
  #branchesHelper = new BranchesHelper()
  #dependenciesHelper = new DependenciesHelper()
  #skipHelper = new SkipHelper()

  #concurrency?: number
  #concurrency_group?: string
  #parallelism?: number
  #env?: Record<string, string | number>
  #soft_fail?: boolean;
  #timeout_in_minutes?: number;
  #artifact_paths?: string[];

  command(command: string | string[]): this {
    this.#command = command
    return this
  }

  key(key: string): this {
    this.#keyHelper.key(key)
    return this
  }

  label(label: string): this {
    this.#labelHelper.label(label)
    return this
  }

  condition(condition: string): this {
    this.#conditionHelper.condition(condition)
    return this
  }

  branch(branch: string): this {
    this.#branchesHelper.branch(branch)
    return this
  }

  dependOn(dependency: StepDependsOn): this {
    this.#dependenciesHelper.dependOn(dependency)
    return this
  }

  allowDependencyFailure(allow: boolean): this {
    this.#dependenciesHelper.allowDependencyFailure(allow)
    return this
  }

  skip(skip: boolean): this {
    this.#skipHelper.skip(skip)
    return this
  }

  plugin(plugin: PluginSchema | PluginBuilder): this {
    this.#plugins.push(plugin)
    return this
  }
  
  parallelism(parallelism: number): this {
    this.#parallelism = parallelism
    return this
  }
  
  env(env: Record<string, string | number>): this {
    this.#env = env
    return this
  }

  addEnv(key: string, value: string | number): this {
    if (!this.#env) {
      this.#env = {}
    }
    this.#env[key] = value
    return this
  }

  concurrency(jobs?: number, group?: string): this {
    this.#concurrency = jobs
    this.#concurrency_group = group
    return this
  }

  softFail(fail: boolean = true): this {
    this.#soft_fail = fail
    return this
  }

  timeout(minutes: number): this {
    this.#timeout_in_minutes = minutes
    return this
  }

  artifactPath(path: string): this {
    if (!this.#artifact_paths) {
      this.#artifact_paths = []
    }
    this.#artifact_paths.push(path)
    return this
  }

  build(): CommandStepSchema {
    const commandKey = this.#command && Array.isArray(this.#command) && this.#command.length > 1 ? 'commands' : 'command'
    const object: CommandStepSchema = {
      ...{ [commandKey]: this.#command },
      ...this.#keyHelper.build(),
      ...this.#labelHelper.build(),
      ...this.#conditionHelper.build(),
      ...this.#branchesHelper.build(),
      ...this.#dependenciesHelper.build(),
      ...this.#skipHelper.build(),
      ...(this.#parallelism ? { parallelism: this.#parallelism } : {}),
      ...(this.#concurrency ? {concurrency: this.#concurrency} : {}),
      ...(this.#concurrency_group ? {concurrency_group: this.#concurrency_group} : {}),
      ...(this.#env ? {env: this.#env} : {}),
      ...(this.#soft_fail ? {soft_fail: this.#soft_fail} : {}),
      ...(this.#timeout_in_minutes ? {timeout_in_minutes: this.#timeout_in_minutes} : {}),
      ...(this.#artifact_paths ? {artifact_paths: this.#artifact_paths} : {}),
    }

    if (!this.#command || (Array.isArray(this.#command) && this.#command.length === 0)) {
      throw new Error('CommandStep requires a command.')
    }

    if (this.#plugins.length > 0) {
      object.plugins = this.#plugins.map(plugin => isPluginBuilder(plugin) ? plugin.build() : plugin)
    }

    return object
  }
}




// interface Labeled {
//   label(label: string | undefined): this
// }

// interface Keyed {
//   key(key: string | undefined): this
// }

// interface Conditional {
//   if(condition: string | undefined): this
// }

// export class CommandStep__2 implements StepBuilder, Labeled, Keyed, Conditional {
//   #label: string | undefined
//   #key: string | undefined
//   #if: string | undefined

//   label(label: string | undefined): this {
//     this.#label = label;
//     return this
//   }

//   key(key: string | undefined): this {
//     this.#key = key;
//     return this
//   }

//   if(condition: string | undefined): this {
//     this.#if = condition
//     return this
//   }
  
//   dependsOn(dependsOn: null | Array<string | {
//     step: string; 
//     allow_failure?: boolean;
//   }>): this;
//   allowDependencyFailure(allow: boolean): this
  
//   command(command: string | string[]): this {
//     _command = command;
//     return this;
//   }

//   env(env: Record<string, string | number>): this {
//     _env = env;
//     return this;
//   }

//   addEnv(name, value) {
//     _env[name] = value;
//     return this;
//   }

//   plugins(plugins: Array<PluginSchema | PluginBuilder>): this {
//     _plugins = plugins;
//     return this;
//   }

//   addPlugin(plugin) {
//     _plugins.push(plugin);
//     return this;
//   }

//   concurrency(jobs: number, group: string): this {
//     _concurrency = jobs;
//     _concurrencyGroup = group;
//     return this;
//   }

//   artifactPaths(paths) {
//     _artifactPaths = paths;
//     return this;
//   }

//   addArtifactPath(path) {
//     _artifactPaths.push(path);
//     return this;
//   }

//   timeout(minutes: number) {
//     _timeoutInMinutes = minutes;
//     return this;
//   }

//   softFail(fail) {
//     _softFail = fail;
//     return this;
//   }

//   parallelism(count) {
//     _parallelism = count;
//     return this;
//   }

//   build() {
//     // TODO: validate result

//     const step: CommandStepObject = {
//       ...keyMixin.build(),
//       ...labelMixin.build(),
//       ...conditionalMixin.build(),
//       ...branchesMixin.build(),
//       ...dependenciesMixin.build(),
//       ...skippableMixin.build(),
//     };

//     if (Array.isArray(_command) && _command.length > 1) {
//       step.commands = _command;
//     } else if (Array.isArray(_command) && _command.length === 1) {
//       step.command = _command[0];
//     } else if (typeof _command === "string") {
//       step.command = _command;
//     }

//     if (Object.keys(_env).length) {
//       step.env = _env;
//     }

//     if (_plugins.length) {
//       step.plugins = _plugins.map((plugin) =>
//         isBuilder(plugin) ? plugin.build() : plugin
//       );
//     }

//     if (_artifactPaths.length) {
//       step.artifact_paths = _artifactPaths;
//     }

//     if (_timeoutInMinutes) {
//       step.timeout_in_minutes = _timeoutInMinutes;
//     }

//     if (_softFail) {
//       step.soft_fail = _softFail;
//     }

//     if (_concurrency) {
//       step.concurrency = _concurrency;
//     }
//     if (_concurrencyGroup) {
//       step.concurrency_group = _concurrencyGroup;
//     }

//     if (_parallelism) {
//       step.parallelism = _parallelism;
//     }

//     return step;
//   }

// }

// new CommandStep__2()
//   .label(':jest: Unit Tests')
//   .key('unit-tests')
//   .if('sky === blue')
//   .command('')
// ;

// export class CommandStep {
//   static builder(): CommandStep.Builder {
//     let _command: string | string[] = [];
//     let _env: Record<string, string | number> = {};
//     let _plugins: Array<PluginSchema | PluginBuilder> = [];
//     let _concurrency: number | undefined;
//     let _concurrencyGroup: string | undefined;
//     let _artifactPaths: string[] = [];
//     let _timeoutInMinutes: number | undefined;
//     let _softFail: boolean | undefined;
//     let _parallelism: number | undefined;
//     const keyMixin = KeyMixin.builder();
//     const labelMixin = LabelMixin.builder();
//     const conditionalMixin = ConditionalMixin.builder();
//     const branchesMixin = BranchesMixin.builder();
//     const dependenciesMixin = DependenciesMixin.builder();
//     const skippableMixin = SkippableMixin.builder();
//     return {
//       ...(keyMixin as any),
//       ...labelMixin,
//       ...conditionalMixin,
//       ...branchesMixin,
//       ...dependenciesMixin,
//       ...skippableMixin,

//       command(command) {
//         _command = command;
//         return this;
//       },

//       env(env) {
//         _env = env;
//         return this;
//       },

//       addEnv(name, value) {
//         _env[name] = value;
//         return this;
//       },

//       plugins(plugins) {
//         _plugins = plugins;
//         return this;
//       },

//       addPlugin(plugin) {
//         _plugins.push(plugin);
//         return this;
//       },

//       concurrency(jobs, group) {
//         _concurrency = jobs;
//         _concurrencyGroup = group;
//         return this;
//       },

//       artifactPaths(paths) {
//         _artifactPaths = paths;
//         return this;
//       },

//       addArtifactPath(path) {
//         _artifactPaths.push(path);
//         return this;
//       },

//       timeout(minutes: number) {
//         _timeoutInMinutes = minutes;
//         return this;
//       },

//       softFail(fail) {
//         _softFail = fail;
//         return this;
//       },

//       parallelism(count) {
//         _parallelism = count;
//         return this;
//       },

//       build() {
//         const step: CommandStepObject = {
//           ...keyMixin.build(),
//           ...labelMixin.build(),
//           ...conditionalMixin.build(),
//           ...branchesMixin.build(),
//           ...dependenciesMixin.build(),
//           ...skippableMixin.build(),
//         };

//         if (Array.isArray(_command) && _command.length > 1) {
//           step.commands = _command;
//         } else if (Array.isArray(_command) && _command.length === 1) {
//           step.command = _command[0];
//         } else if (typeof _command === "string") {
//           step.command = _command;
//         }

//         if (Object.keys(_env).length) {
//           step.env = _env;
//         }

//         if (_plugins.length) {
//           step.plugins = _plugins.map((plugin) =>
//             isBuilder(plugin) ? plugin.build() : plugin
//           );
//         }

//         if (_artifactPaths.length) {
//           step.artifact_paths = _artifactPaths;
//         }

//         if (_timeoutInMinutes) {
//           step.timeout_in_minutes = _timeoutInMinutes;
//         }

//         if (_softFail) {
//           step.soft_fail = _softFail;
//         }

//         if (_concurrency) {
//           step.concurrency = _concurrency;
//         }
//         if (_concurrencyGroup) {
//           step.concurrency_group = _concurrencyGroup;
//         }

//         if (_parallelism) {
//           step.parallelism = _parallelism;
//         }

//         return step;
//       },
//     };
//   }
// }
