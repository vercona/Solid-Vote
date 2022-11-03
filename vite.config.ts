import { defineConfig } from "vite";
import { resolve, dirname } from "path"

import solid from 'vite-plugin-solid';
import solidStyled from 'vite-plugin-solid-styled';
import { undestructurePlugin } from "babel-plugin-solid-undestructure"

import Unocss from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'

export default defineConfig({
  plugins: [
    parseJSON5(),
    ...undestructurePlugin('ts'),
    solid(),
    solidStyled({
      filter: {
        include: 'src/**/*.{ts,tsx}',
        exclude: 'node_modules/**/*.{ts,js}',
      },
    }),
    Unocss({
      presets: [presetAttributify(), presetUno()],

    }),
  ],
  server: { port: 3000 },
  build: { target: 'esnext' },
  resolve: {
    alias: { '~': resolve(__dirname, 'src') },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.json5'],
  }
});


import JSON5 from 'json5'

import fs from 'fs'

function json5NestedParser(str, path) {
  let out = str.replaceAll(/:(\s+)?`(.*?)`/g, (match, g1, g2)=>{
    let file = resolve(dirname(path), g2)
    
    let ext = {[''+fs.existsSync(file+'.json')] : '.json',  [''+fs.existsSync(file+'.json5')]: '.json5'}?.['true']
    if (!ext) throw new Error('No valid extension...')
    
    const data = fs.readFileSync(
      file+ext, {encoding:'utf8', flag:'r'}
    )

    return ': ' + json5NestedParser(data, ext)
  })

  return JSON.stringify(JSON5.parse(out))
}

function parseJSON5() {
  const fileRegex = /\.(json5)$/
  return {
    enforce: 'pre',
    transform(src, id) {
      if (fileRegex.test(id)) {
        json5NestedParser(src, id)
        return {
          code: 'export default ' + json5NestedParser(src, id)
          //map: null // provide source map if available
        }
      }
    }
  }
}