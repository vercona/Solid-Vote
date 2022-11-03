//@ts-nocheck
import { createStore } from "solid-js/store";
import formConfig from '~/static/formConfig'

import Collapse from "~/components/Collapse";

let componentMap = {
  category: Collapse  // type key => component
}

/*
let validMap = {
  key: Collapse  // type key => component
}

let keySelection = {
  key: Collapse  // type key => component
}
*/

export default function useStore() {
  return formConfig
}
