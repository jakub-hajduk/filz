import { join, dirname } from 'path';
import {existsSync, readFileSync} from "fs";
import {PROJECT_ROOT} from "./paths";

export const closestFile = (filename, path = process.cwd()) => {
  const filepath = join(path, filename)

  if (existsSync(filepath)) {
    return filepath
  }

  const nextDir =  dirname(path)
  return closestFile(nextDir !== path ? nextDir : '', filename)
};

export const closestPackageJsonPath = closestFile('package.json')

export const closestPackageJsonContents = JSON.parse(readFileSync(closestPackageJsonPath, 'utf-8'))

export const currentProject = closestPackageJsonContents.name

export const isPackage = (projectName: string) =>  currentProject === projectName;

export const isProjectRoot = process.cwd() === PROJECT_ROOT
