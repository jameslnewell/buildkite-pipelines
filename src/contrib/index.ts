import { CommandStep, StepBuilder, DockerPlugin, StepObject } from "../pipeline";

export class DockerCommandStep implements StepBuilder {

  #command: CommandStep;
  #docker: DockerPlugin;

  constructor() {
    // this.#secret = new SecretManagerPlugin()
    // this.#login = new DockerLoginPlugin()
    this.#docker = new DockerPlugin()
    this.#command = new CommandStep('')
    this.#command.plugins = [this.#docker]
  }

  env(env: Record<string, string>)  {
    this.#command = new CommandStep('').env({
      ...this.#command.build().env,
      ...env
    })
  }

  build(): StepObject {
    return this.#command.build()
  }
}