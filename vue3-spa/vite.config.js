import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import fs from 'fs'
import dayjs from 'dayjs'
import { nanoid } from 'nanoid'
import vueJsx from '@vitejs/plugin-vue-jsx'
let base = '/'
const cdnSite = 'https://cdn.icebreaker.top/'
if (process.env.NODE_ENV === 'production') {
  const prefix =
    'rendertron/release/' + nanoid(10) + dayjs().format('YYYYMMDD') + '/'
  base = cdnSite + prefix
  fs.writeFileSync('./publicPath.js', `module.exports = '${prefix}'`)
}
// https://vitejs.dev/config/
export default defineConfig({
  base,
  plugins: [
    vue(),
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    }),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src'),
      },
      {
        find: '@@',
        replacement: resolve(__dirname, '/'),
      },
    ],
  },
})
