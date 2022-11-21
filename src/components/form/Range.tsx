import {css} from "solid-styled"

export default function Range (props: {
  label: string,
  state: {
    [Property in 'min'|'max'|'default']: number | string
  }
}) {
  //css``
  return (
    <>
      <label>{props.label}:</label>
      <input
        type="range" min={props.state.min} max={props.state.max} value={props.state.default} 
        oninput="this.nextElementSibling.value = this.value"
      />
      <input 
        type="text" value={props.state.default}
        oninput="this.previousElementSibling.value = this.value"
      />
    </>
  )
}
