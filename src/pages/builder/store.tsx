//@ts-nocheck
import formConfig from '~/static/formConfig'

import valueArr from '~/static/keyArr.json'
import showArr from '~/static/showArr.json' 

/*
let validMap = {
  key: Collapse  // type key => component
}

let keySelection = {
  key: Collapse  // type key => component
}
*/

export default function useStore() {
  console.log(formConfig)
  return formConfig
}
