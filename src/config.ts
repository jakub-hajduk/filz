import {cli, CliCommandGroup, registerCommands} from "./cli/cli";
import {Command} from "commander";
(() => {
  cli.name('breeze')

  const commandsConfig = [
    new CliCommandGroup('group', [
      new Command('aaa')
    ]),
    new Command('bbb')
  ]

  registerCommands(commandsConfig)
})()
