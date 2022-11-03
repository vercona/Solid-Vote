import { defineConfig } from "vite";
import { resolve } from "path"

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
function parseJSON5() {
  const fileRegex = /\.(json5)$/
  return {
    enforce: 'pre',
    transform(src, id) {
      if (fileRegex.test(id)) {
        return {
          code: 'export default ' + JSON.stringify(JSON5.parse(src)) ,
          //map: null // provide source map if available
        }
      }
    }
  }
}