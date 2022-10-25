import solid from "solid-start/vite";
import { defineConfig } from "vite";

import Unocss from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'

export default defineConfig({
  plugins: [
    solid(),
    Unocss({
      presets: [presetAttributify(), presetUno()]
    })
  ]
});
