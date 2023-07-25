

export interface CommandBuilder {
  command(command: string): this;
}

export class CommandHelper {
  #command?: string | string[]

  command(command: string | string[]): void {
    this.#command = command
  }

  build() {
    if (!this.#command) {
      throw new Error('CommandStep requires a command.')
    }

    if (Array.isArray(this.#command)) {
      if (this.#command.length > 1) {
        return {commands: this.#command}
      }
      if (this.#command.length == 0) {
        throw new Error('CommandStep requires a command.')
      }
    } 

    return {command: this.#command}
  }
}
