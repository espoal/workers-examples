import { buildHelper } from '@libs/build/index.mjs'


await buildHelper({
  entryPoints: ['./src/main.mjs', './src/worker.mjs'],
  outdir: './dist',
  external: []
})
