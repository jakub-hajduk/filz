import {cli} from "./cli/cli";

export const context = {
  options: cli.opts(),
  env: process.env
}
