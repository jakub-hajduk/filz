import {Command} from 'commander'

export const cli = new Command()

export const isCommand = (value: any): value is Command => value instanceof Command

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

export const registerCommands = (commandGroup: (CliCommandGroup | Command)[]) => {
  commandGroup.forEach(commandOrGroup => {
    console.log('cog', commandOrGroup)
    if (commandOrGroup instanceof CliCommandGroup) {
      cli.addCommand(commandOrGroup.getCommand())
      return;
    }

    cli.addCommand(commandOrGroup)
  })
}

