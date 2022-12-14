import { defineConfig } from "vite";
import { resolve, dirname } from "path"

import solid from 'vite-plugin-solid';
import solidStyled from 'vite-plugin-solid-styled';
import { undestructurePlugin } from "babel-plugin-solid-undestructure"

import Unocss from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'

export default defineConfig({
  plugins: [
    parseJSON5(), genKeyArr(/^key$/), genKeyArr('show', ['formConfig'], 'showArr'),
    // genKeyArr must follow parseJSON5

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
    alias: { '~': resolve(__dirname, 'src') },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.json5'],
  }
});




import JSON5 from 'json5'
import fs from 'fs'

function json5NestedParser(str, path) {
  // Note - could be improved by caching already read parsed schema in the event of re-use.
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



async function strModule(src) {
  let mod = await import(`data:text/javascript,${encodeURIComponent(src)}`)
  return mod
}

function traverse(objArr, keyArr=[], key:string|RegExp='key') {
  let normal = Object.entries(objArr) as any
  for(let [k,v] of normal) {
    if (k.match(key)?.[0]) { // could be a little risky
      if (k in keyArr) {
        // no real benefit using set as i hope to catch all dupes anyway. but, may be good for clarity.
        throw new Error(`Duplicate Key (${k}) Found On: ${normal?.label || JSON.stringify(normal)}`)
      }
      keyArr.push(v)
    } else 
    if (typeof v === 'object') {
      keyArr = traverse(v, keyArr, key)
    }
  }
  return keyArr
}

function genKeyArr(key:string|RegExp='key', fileArr=['formConfig'], outFile='keyArr') {
  const fileRegex = new RegExp(`(${fileArr.join('|')}).json5$`)
  let keyArr = []
  return {
    enforce: 'pre',
    async transform(src, id) {
      if (fileRegex.test(id)) {
        let arr = (await strModule(src)).default
        keyArr = traverse(arr, keyArr, key)
       
        fs.writeFileSync(`src/static/${outFile}.json`, JSON.stringify(keyArr, null, 2))
        console.log(`${outFile} updated.`)
      }
    }
  }
}
