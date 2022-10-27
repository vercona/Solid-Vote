import { defineConfig } from "vite";
import { resolve } from "path"

import solid from 'vite-plugin-solid';
import solidStyled from 'vite-plugin-solid-styled';
import { undestructurePlugin } from "babel-plugin-solid-undestructure"

import Unocss from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'

export default defineConfig({
  plugins: [
    ...undestructurePlugin('ts'),
    solid(),
    solidStyled({
      filter: {
        include: 'src/**/*.{ts,tsx}',
        exclude: 'node_modules/**/*.{ts,js}',
      },
    }),
    Unocss({
      presets: [presetAttributify(), presetUno()]
    }),
  ],
  server: { port: 3000 },
  build: { target: 'esnext' },
  resolve: {
    alias: { '~': resolve(__dirname, 'src') }
  }
});
