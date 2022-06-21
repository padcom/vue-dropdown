import { defineConfig } from 'vitest/config'
import { createVuePlugin } from 'vite-plugin-vue2'
import ScriptSetup from 'unplugin-vue2-script-setup/vite'

import DocsPlugin from './vite.plugin-docs'

export default defineConfig({
  plugins: [
    createVuePlugin(),
    ScriptSetup(),
    DocsPlugin(),
  ],
  test: {
    environment: 'jsdom',
    setupFiles: [
      'vitest.setup.js',
    ],
  },
})
