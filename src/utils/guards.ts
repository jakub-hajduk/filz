import {Command} from "commander";

export const isCommand = (value: any): value is Command => value instanceof Command
