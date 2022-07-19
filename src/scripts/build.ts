import { config } from 'dotenv'
import { writeFileSync } from 'fs'
import { resolve } from 'path'
import { closestPackageJsonContents } from "../utils/utils";

const arg = (arg) => (process.argv.slice(2) || []).includes(arg)

export const environment = arg('prod') ? 'production' : 'development';

export const isProd = !!arg('prod')

export const esBuilder = (buildInstance) => (buildConfig) => {
  const mapObj = (object, callback) => Object.fromEntries(Object.entries(object).map(([key, value], index) => callback(value, key, index)))

  const envVariables = {
    ...config({ path: `.env.${environment}`}).parsed,
    ENV: environment
  }

  const define = mapObj(envVariables, (value, key) => [`process.env.${key}`, `"${value}"`])

  return buildInstance({
    define,
    watch: !!arg('watch'),
    logLevel: 'info',
    target: 'node16',
    platform: 'node',
    format: 'cjs',
    bundle: true,
    treeShaking: true,
    ...buildConfig
  })
}


export const packageJson = (pick: string[], overwrite: Object, destDir: string = './dist/') => {
  const filteredPackageJson = {}

  pick.forEach(key => {
    filteredPackageJson[key] = closestPackageJsonContents[key]
  })

  const outputPackageJson = {
    ...filteredPackageJson,
    ...overwrite
  }

  writeFileSync(resolve(destDir, 'package.json'), JSON.stringify(outputPackageJson, null, 2), 'utf-8')
}
