import { buildHelper } from '@libs/build'


await buildHelper({
  entryPoints: ['src/main.mjs', 'src/worker.mjs'],
  outdir: 'dist',
  external: []
})
