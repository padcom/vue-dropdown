import { resolve } from 'path'
import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import eslint from 'vite-plugin-eslint'

import DocsPlugin from './vite.plugin-docs'
import { name } from './package.json'

export default defineConfig(({ mode }) => {
  const breakOnLintProblems = mode !== 'production'

  return {

    plugins: [
      createVuePlugin(),
      eslint({ failOnWarning: breakOnLintProblems, failOnError: breakOnLintProblems }),
      DocsPlugin(),
    ],
    build: {
      lib: {
        entry: resolve(__dirname, 'lib/index.js'),
        name: name.split('/').at(-1),
        fileName: format => `${name}.${format}.js`,
      },
      rollupOptions: {
        external: [
          'vue',
        ],
        output: {
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
  }
})
