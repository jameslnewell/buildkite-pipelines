import { CommandStep, StepBuilder, DockerPlugin } from "../pipeline";

export class DockerCommandStep implements StepBuilder {

  #command: CommandStep;
  #docker: DockerPlugin;

  constructor() {
    // this.#secret = new SecretManagerPlugin()
    // this.#login = new DockerLoginPlugin()
    this.#docker = new DockerPlugin()
    this.#command = new CommandStep({})
    this.#command.addPlugin(this.#docker)
  }

  build(): StepObject {
    return this.#command.build()
  }
}