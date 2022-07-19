import { dirname } from 'path'
import {closestPackageJsonPath} from "./utils";

export const CWD = process.cwd()

export const PROJECT_ROOT = dirname(closestPackageJsonPath)

export const CLI_DIR = __dirname
