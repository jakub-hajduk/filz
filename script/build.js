const { buildSync } = require('esbuild')
const { resolve } = require('path')
const {rmSync, readFileSync, writeFileSync, existsSync} = require("fs");

if( existsSync('./dist') ) {
  rmSync('./dist', {recursive: true})
}

const baseConfig = {
  entryPoints: [resolve(__dirname, '../src/index.ts')],
  target: 'node16',
  platform: 'node',
  bundle: true,
  treeShaking: true,
  external: ['esbuild']
}

buildSync({
  ...baseConfig,
  outfile: './dist/index.cjs',
  format: 'cjs'
})

buildSync({
  ...baseConfig,
  outfile: './dist/index.mjs',
  format: 'esm'
})

const packageJson = JSON.parse(readFileSync(resolve(__dirname, '../package.json'), 'utf-8'))

const {name, version, description, keywords, author, license} = packageJson;

const outputJson = {
  name,
  version,
  description,
  keywords,
  author,
  license,
  main: 'index.cjs',
  module: 'index.mjs',
  types: 'index.d.ts',
  peerDependencies: {
    esbuild: packageJson.devDependencies.esbuild
  }
}

writeFileSync('./dist/package.json', JSON.stringify(outputJson, null, 2), 'utf-8')


