const esbuild = require('esbuild')
const dotenv = require('dotenv')

const arg = (arg) => (process.argv.slice(2) || []).includes(arg)

const mapObj = (object, callback) => Object.fromEntries(Object.entries(object).map(([key, value], index) => callback(value, key, index)))

const environment = arg('prod') ? 'production' : 'development';

const envVariables = {
    ...dotenv.config({ path: `.env.${environment}`}).parsed,
    ENV: environment
}

const define = mapObj(envVariables, (value, key) => [`process.env.${key}`, `"${value}"`])

esbuild.build({
    entryPoints: ['./src/index.ts'],
    define,
    outdir: './dist',
    watch: !!arg('watch'),
    logLevel: 'info',
    target: 'node16',
    platform: 'node',
    format: 'cjs',
    bundle: true,
    treeShaking: true,
    loader: {
        '.html': 'text',
        '.css': 'text'
    },
})
