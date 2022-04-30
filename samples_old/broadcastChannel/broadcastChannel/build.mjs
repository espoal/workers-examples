import { buildHelper } from '@libs/build'


await buildHelper({
  entryPoints: ['src/scheduler.mjs', 'src/worker.mjs'],
  outdir: 'dist',
  external: []
})
