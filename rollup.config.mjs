import path from 'path'
import url from 'url'

import typescript from '@rollup/plugin-typescript'

const root = path.dirname(url.fileURLToPath(import.meta.url))
function resolve(...args) {
  return path.resolve(root, ...args)
}

const mode = 'development'

let config = {
  input: resolve('src/index.ts'),
  output: {
    dir: 'build',
  },
  plugins: [typescript()],
}

if (mode === 'development') {
  config.output.sourcemap = true
}

export default config
