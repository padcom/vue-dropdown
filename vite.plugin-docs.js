import { writeFile, mkdir, stat } from 'fs/promises'
import { basename, extname } from 'path'

function isDocsId(id) {
  return /vue&type=docs/.test(id)
}

function compile(source) {
  return require('markdown-js').parse(source)
}

function getComponentNameFromId(id) {
  const component = new URL(`file://${id}`).pathname.split('/').at(-1)
  return basename(component, extname(component))
}

/**
 * @param {import('vite').Plugin} config
 */
function definePlugin(config) {
  return config
}

async function exists(path, opts = {}) {
  try {
    return (await stat(path, opts)).isDirectory()
  } catch {
    return false
  }
}

export default () => {
  let outDir = './dist'

  return definePlugin({
    name: 'vue-plugin-docs',
    config(config) {
      outDir = config.build?.outDir || './dist'
    },
    async transform(code, id) {
      if (!isDocsId(id)) return

      const docs = compile(code)
      const component = getComponentNameFromId(id)
      const documentationFileName = `${outDir}/${component}.html`
      if (!(await exists(outDir))) {
        console.log('Directory does not exist')
        await mkdir(outDir)
      }
      await writeFile(documentationFileName, docs)

      return 'export default () => {}'
    },
  })
}
