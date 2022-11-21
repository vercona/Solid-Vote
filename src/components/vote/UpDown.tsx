import { createSignal } from "solid-js"
import {css} from "solid-styled"

import Arrow from "~/static/icon/Arrow"

export default function UpDown(props: {
  children?
}) {
  //css` `
  let [value, setValue] = createSignal(0)
  let updateValue = (input:-1|1) => setValue( input * +(value() !== input) )

  return (<>
    <Arrow
      onClick={()=>updateValue(1)}
      fill={value()===1?"orange":"none"} 
      stroke="orange"
    />
      {props.children}
    <Arrow
      onClick= {()=>updateValue(-1) }
      fill={value()===-1?"blue":"none"} 
      style="transform:scaleY(-1)"
      stroke="blue"
    />
  </>)
}
