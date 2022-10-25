import { defineConfig } from "vite";

import solid from "solid-start/vite";
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
  ]
});
