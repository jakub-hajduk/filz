import {Command} from 'commander'
import {CliCommandGroup} from "./cli-command-group.class";

export const cli = new Command()

export const cliName = (name: string) => cli.name(name);

export const registerCommands = (commandGroup: (CliCommandGroup | Command)[]) => {
  commandGroup.forEach(commandOrGroup => {
    if (commandOrGroup instanceof CliCommandGroup) {
      cli.addCommand(commandOrGroup.getCommand())
      return;
    }

    cli.addCommand(commandOrGroup)
  })
}

export const cliRun = (...args) => cli.parse(...args);
