import { CommandStepObject } from "./CommandStepObject";
import { PluginBuilder } from "./plugins/PluginBuilder";
import { KeyMixin, KeyMixinMethods } from "./KeyMixin";
import { LabelMixin, LabelMixinMethods } from "./LabelMixin";
import { StepBuilder } from "./StepBuilder";
import { PluginObject } from "./plugins/PluginObject";
import { BranchesMixin, BranchesMixinMethods } from "./BranchesMixin";
import { ConditionalMixin, ConditionalMixinMethods } from "./ConditionalMixin";
import {
  DependenciesMixin,
  DependenciesMixinMethods,
} from "./DependenciesMixin";

function isBuilder(step: PluginObject | PluginBuilder): step is PluginBuilder {
  return typeof (step as any).build == "function";
}

export namespace CommandStep {
  export interface Builder
    extends StepBuilder,
      KeyMixinMethods,
      LabelMixinMethods,
      ConditionalMixinMethods,
      BranchesMixinMethods,
      DependenciesMixinMethods {
    command(command: string | string[]): this;
    env(env: Record<string, string | number>): this;
    addEnv(name: string, value: string): this;
    plugins(plugins: Array<PluginObject | PluginBuilder>): this;
    addPlugin(plugin: PluginObject | PluginBuilder): this;
    concurrency(jobs: number, group: string): this;
    artifactPaths(paths: string[]): this;
    addArtifactPath(path: string): this;
    timeout(minutes: number): this;
    softFail(fail: boolean): this;
    parallelism(count: number): this;
  }
}

export class CommandStep {
  static builder(): CommandStep.Builder {
    let _command: string | string[] = [];
    let _env: Record<string, string | number> = {};
    let _plugins: Array<PluginObject | PluginBuilder> = [];
    let _concurrency: number | undefined;
    let _concurrencyGroup: string | undefined;
    let _artifactPaths: string[] = [];
    let _timeoutInMinutes: number | undefined;
    let _softFail: boolean | undefined;
    let _parallelism: number | undefined;
    const keyMixin = KeyMixin.builder();
    const labelMixin = LabelMixin.builder();
    const conditionalMixin = ConditionalMixin.builder();
    const branchesMixin = BranchesMixin.builder();
    const dependenciesMixin = DependenciesMixin.builder();
    return {
      ...(keyMixin as any),
      ...labelMixin,
      ...conditionalMixin,
      ...branchesMixin,
      ...dependenciesMixin,

      command(command) {
        _command = command;
        return this;
      },

      env(env) {
        _env = env;
        return this;
      },

      addEnv(name, value) {
        _env[name] = value;
        return this;
      },

      plugins(plugins) {
        _plugins = plugins;
        return this;
      },

      addPlugin(plugin) {
        _plugins.push(plugin);
        return this;
      },

      concurrency(jobs, group) {
        _concurrency = jobs;
        _concurrencyGroup = group;
        return this;
      },

      artifactPaths(paths) {
        _artifactPaths = paths;
        return this;
      },

      addArtifactPath(path) {
        _artifactPaths.push(path);
        return this;
      },

      timeout(minutes: number) {
        _timeoutInMinutes = minutes;
        return this;
      },

      softFail(fail) {
        _softFail = fail;
        return this;
      },

      parallelism(count) {
        _parallelism = count;
        return this;
      },

      build() {
        const step: CommandStepObject = {
          ...keyMixin.build(),
          ...labelMixin.build(),
          ...conditionalMixin.build(),
          ...branchesMixin.build(),
          ...dependenciesMixin.build(),
        };

        if (Array.isArray(_command) && _command.length > 1) {
          step.commands = _command;
        } else if (Array.isArray(_command) && _command.length === 1) {
          step.command = _command[0];
        } else if (typeof _command === "string") {
          step.command = _command;
        }

        if (Object.keys(_env).length) {
          step.env = _env;
        }

        if (_plugins.length) {
          step.plugins = _plugins.map((plugin) =>
            isBuilder(plugin) ? plugin.build() : plugin
          );
        }

        if (_artifactPaths.length) {
          step.artifact_paths = _artifactPaths;
        }

        if (_timeoutInMinutes) {
          step.timeout_in_minutes = _timeoutInMinutes;
        }

        if (_softFail) {
          step.soft_fail = _softFail;
        }

        if (_concurrency) {
          step.concurrency = _concurrency;
        }
        if (_concurrencyGroup) {
          step.concurrency_group = _concurrencyGroup;
        }

        if (_parallelism) {
          step.parallelism = _parallelism;
        }

        return step;
      },
    };
  }
}
