import { defineConfig } from 'tsup'

export default defineConfig({
  entryPoints: ['src/index.ts'],
  format: ['esm', 'cjs', 'iife'],
  globalName: 'UniAppPromisify',
  dts: true,
  splitting: true,
  clean: true,
  minify: false,
  target: 'es2015',
})
