import {Command} from "commander";

export class CliCommandGroup {
  commandInstance: Command;

  constructor(public name: string, public commands: Command[]) {
    this.commandInstance = new Command(name)
    this.commandInstance.description(`Use ${name} --help for help`)
    this.commands.forEach(command => {
      if (command instanceof Command) {
        this.commandInstance.addCommand(command)
      }
    })
  }

  getCommand() {
    return this.commandInstance;
  }
}
