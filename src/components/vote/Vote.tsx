import { createSignal } from "solid-js"
import {css} from "solid-styled"


export default function Vote(props) {
  //css` `
  let [selected, setSelected] = createSignal(false)
  return (<>
    <input type="checkbox" checked={selected()} onInput={()=>setSelected(!selected())}/>
  </>)
}
