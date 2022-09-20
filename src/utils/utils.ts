import { join, dirname } from 'path';
import {existsSync, readFileSync} from "fs";

export const closestFile = (filename, path = process.cwd()) => {
  const filepath = join(path, filename)

  if (filepath === filename) return null

  if (existsSync(filepath)) {
    return filepath
  }

  const nextDir =  dirname(path)

  return closestFile(filename, nextDir !== path ? nextDir : '')
};

export const closestPackageJsonPath = closestFile('package.json')

export const closestProjectRootDir = closestPackageJsonPath ? dirname(closestPackageJsonPath) : null

export const closestPackageJsonContents = closestPackageJsonPath
  ? JSON.parse(readFileSync(closestPackageJsonPath || '', 'utf-8'))
  : {}

export const currentProject = closestPackageJsonContents.name

export const isPackage = (projectName: string) =>  currentProject === projectName;

export const isProjectRoot = process.cwd() === closestProjectRootDir
