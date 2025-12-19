import { glob } from 'glob'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'
import { extname, relative } from 'node:path'
import { libInjectCss } from 'vite-plugin-lib-inject-css'

export default defineConfig({
  envDir: fileURLToPath(new URL('configs', import.meta.url)),
  publicDir: fileURLToPath(new URL('public', import.meta.url)),

  resolve: {
    alias: {
      '~': fileURLToPath(new URL('src', import.meta.url)),
    },
  },

  plugins: [
    vue(),
    libInjectCss(),
    dts({
      insertTypesEntry: true,
      tsconfigPath: fileURLToPath(new URL('tsconfig.build.json', import.meta.url)),
    }),
  ],

  build: {
    minify: false,
    emptyOutDir: true,
    copyPublicDir: false,
    outDir: fileURLToPath(new URL('dist', import.meta.url)),
    lib: {
      formats: ['es'],
      fileName: '[name]',
      name: '@uteka/ui-kit',
      entry: fileURLToPath(new URL('src/index.ts', import.meta.url)),
    },
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: 'assets/[name][extname]',
      },
      external: [
        'vue',
      ],
      input: Object.fromEntries(
        // https://rollupjs.org/configuration-options/#input
        glob.sync('src/**/*.{ts,tsx,vue}', { ignore: ['src/**/*.stories.*'] }).map((file) => [
          // 1. The name of the entry point
          // lib/nested/foo.js becomes nested/foo
          relative(
            'src',
            file.slice(0, file.length - extname(file).length),
          ),
          // 2. The absolute path to the entry file
          // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
          fileURLToPath(new URL(file, import.meta.url)),
        ]),
      ),
    },
  },
})
