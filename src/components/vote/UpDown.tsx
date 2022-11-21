import { createSignal } from "solid-js"
import {css} from "solid-styled"

import Arrow from "~/static/icon/Arrow"

export default function UpDown(props: {
  children?
}) {
  //css` `
  let [upVoted, setUpVoted] = createSignal(false)
  let [downVoted, setDownVoted] = createSignal(false)

  return (<>
    <Arrow 
      onClick={() => setUpVoted(!upVoted()) && setDownVoted(false) }
      fill={upVoted()?"orange":"none"} 
      stroke="orange"
    />
      {props.children}
    <Arrow 
      onClick={() => setDownVoted(!downVoted())  && setUpVoted(false)}
      fill={downVoted()?"blue":"none"} 
      style="transform:scaleY(-1)"
      stroke="blue"
    />
  </>)
}
