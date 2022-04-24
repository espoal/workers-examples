import { argv } from 'process'
import { build } from 'esbuild'
import { pnpPlugin } from '@yarnpkg/esbuild-plugin-pnp'
import { watchHelper, timeNow } from './utils/watchHelper.mjs'

export const baseOptions = {
  entryPoints: ['Error: No entry points'],
  outdir: 'Error: No outdir',
  plugins: [pnpPlugin()],
  bundle: true,
  splitting: false,
  format: 'esm',
  platform: 'node',
  target: 'esnext',
  minify: false,
  treeShaking: true,
  watch: false,
  external: [],
}

export const buildHelper = async (
  {
    entryPoints,
    outdir,
    external = [],
  }) => {

  const watch = argv.includes('watch')

  console.log('Build started at: ' + timeNow())


  build({
    ...baseOptions,
    entryPoints,
    outdir,
    external,
    watch: watch ? watchHelper : false
  })

  // console.log('Build Done at: ' + timeNow())
}
