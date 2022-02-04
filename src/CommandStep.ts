import { CommandStepObject } from "./CommandStepObject";
import { PluginBuilder } from "./PluginBuilder";
import { StepBuilder } from "./StepBuilder";

export interface CommandStepOptions {
  command?: string | string[]
  label?: string;
  branches?: string[];
  plugins?: PluginBuilder[]

}

export class CommandStep implements StepBuilder {
  #key?: string;
  #dependsOn: StepBuilder[] = [];
  #label?: string;
  #branches: string[] = [];
  #command: string[]
  #plugins: PluginBuilder[] = []
  #artifactPaths: string[] = []

  public constructor(command: string | string[] | CommandStepOptions) {
    if (Array.isArray(command)) {
      this.#command = command 
    } else if (typeof command === 'string') {
      this.#command = [command]
    } else if (Array.isArray(command.command)) {
      this.#command = command.command
    } else {
      if (typeof command.command === 'string') {
        this.#command = [command.command]
      } else {
        this.#command = []
      }
      this.#label = command.label
      this.#plugins = command.plugins ?? []
    }
  }

  public get key(): string | undefined {
    return this.#key;
  }

  public set key(key: string | undefined) {
    this.#key = key;
  }

  public get dependsOn(): StepBuilder[] {
    return this.#dependsOn;
  }

  public dependOn(step: StepBuilder): this {
    this.#dependsOn?.push(step);
    return this;
  }

  public get label(): string | undefined {
    return this.#label;
  }

  public set label(label: string | undefined) {
    this.#label = label;
  }

  public get branches(): string[] {
    return this.#branches ?? [];
  }

  public addBranch(branch: string): this {
    this.#branches.push(branch);
    return this;
  }

  public get plugins(): PluginBuilder[] {
    return this.#plugins;
  }

  public addPlugin(builder: PluginBuilder): this {
    this.#plugins.push(builder)
    return this;
  }

  public get artifactPaths(): string[] {
    return this.#artifactPaths;
  }

  public addArtifactPath(path: string): this {
    this.#artifactPaths.push(path);
    return this;
  }

  public build(): CommandStepObject {
    return {
      key: this.#key,
      depends_on: this.#dependsOn.length ? this.#dependsOn.map(step => step.key) : undefined, 
      label: this.#label,
      commands: this.#command,
      plugins: this.#plugins.length ? this.#plugins.map((builder) => builder.build()) : undefined
    }
  }
}