import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import fs from 'fs'
import dayjs from 'dayjs'
import { nanoid } from 'nanoid'
import { viteMockServe } from 'vite-plugin-mock'
import vueJsx from '@vitejs/plugin-vue-jsx'
let base = '/'
const cdnSite = 'https://cdn.icebreaker.top/rendertron/release/'
if (process.env.NODE_ENV === 'production') {
  const prefix = nanoid(10) + dayjs().format('YYYYMMDD') + '/'
  base = cdnSite + prefix
  fs.writeFileSync('./publicPath.js', `module.exports = '${base}'`)
}
// https://vitejs.dev/config/
export default defineConfig({
  base,
  plugins: [
    vue(),
    viteMockServe({
      // default
      mockPath: 'mock',
      localEnabled: true,
      prodEnabled: true
      // jsx不识别？
      // injectCode: `
      //     import { setupProdMockServer } from './mockProdServer';
      //     setupProdMockServer();
      //   `
    }),
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    })
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src')
      },
      {
        find: '@@',
        replacement: resolve(__dirname, '/')
      }
    ]
  }
})
