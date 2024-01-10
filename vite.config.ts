import { readFileSync } from 'fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

const packageJson = JSON.parse(
  readFileSync('./package.json', { encoding: 'utf-8' }),
)
const getGlobals = () => Object.keys((packageJson?.dependencies || {})).filter(item => !(item.startsWith('@ckeditor/')))
const resolve = (str: string) => path.resolve(__dirname, str)
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin(),
    ckeditor5({ theme: require.resolve('@ckeditor/ckeditor5-theme-lark') })    
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    // 输出文件夹
    outDir: 'dist',
    target: 'es2015',
    lib: {
      // 组件库源码的入口文件
      entry: resolve('packages/index.ts'),
      // 组件库名称
      name: 'innovative-app-assembly',
      // 文件名称, 打包结果: innovativeAppAssembly.cjs
      fileName: 'innovativeAppAssembly',
      // 打包格式 'es', 'umd', 'cjs', 'iife'
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      //排除不相关的依赖
      external: getGlobals()
    },
  },
})



