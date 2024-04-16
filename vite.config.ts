import {defineConfig, type Plugin} from 'vite'
import solid from 'vite-plugin-solid'
import {vavite} from 'vavite'
import fs from 'fs/promises'
import path from 'path'

/* 从.env导入环境变量 */
import('dotenv/config')

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
  plugins: [
    solid({ssr: true}),
    vavite({
      handlerEntry: 'src/entry-server.tsx',
      reloadOn: 'static-deps-change',
      serveClientAssetsInDev: true,
      standalone: false,
    }),
    MyTransform(),
  ],
  buildSteps: [
    {
      name: 'client',
      config: {
        build: {
          outDir: 'dist/client',
          rollupOptions: {input: '/index.html'},
        },
      },
    },
    {
      name: 'server',
      config: {
        build: {
          ssr: true,
          copyPublicDir: false,
          outDir: 'dist/server',
          rollupOptions: {
            plugins: [MoveTemplate()],
            output: {
              entryFileNames: 'entry-server.js',
            },
          },
        },
      },
    },
  ],
  build: {
    target: 'esnext',
  },
})

/** 设置rpc.ts, 并且将服务端中App.tsx的lazy 转化为静态导入, 避免循环引用 */
function MyTransform(): Plugin {
  return {
    name: 'add-code-plugin',
    transform(code, id, opt) {
      if (!opt?.ssr && id.endsWith('rpc.ts')) {
        const index = code.indexOf('\n')
        code = code.substring(index + 1)
      } else if (id.endsWith('App.tsx') && opt?.ssr) {
        const importArr: string[] = []
        const regx = /lazy\(\(\) => import\("([^"]+?)"\)\)/g
        code = code.replace(regx, (match, p1) => {
          const pageName = `$Page${importArr.length}`
          const imoprtC = `import ${pageName} from "${p1}";\n`
          importArr.push(imoprtC)
          return pageName
        })
        code = code.replace(
          `import { lazy } from "solid-js";`,
          importArr.join('')
        )
      }
      return {
        code,
      }
    },
  }
}
/** 服务端构建时, 移动模板.html文件 并且添加自定义服务器*/
function MoveTemplate(): Plugin {
  return {
    name: 'MoveTemplate',
    closeBundle() {
      fs.writeFile(
        'dist/server/index.js',
        `import app from './entry-server.js';\napp.listen(3000, () => {console.log(\`run on http://localhost:3000\`)});`
      )
      fs.rename('dist/client/index.html', 'dist/server/template.html')
    },
  }
}
