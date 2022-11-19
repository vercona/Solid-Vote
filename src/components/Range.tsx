import {css} from "solid-styled"

export default function Range (props) {
  //css``
  return (
    <>
      <label>{props.options.label}:</label>
      <input
        type="range" min={props.options.state.min} max={props.options.state.max} value={props.options.state.default} 
        oninput="this.nextElementSibling.value = this.value"
      />
      <input type="text" value={props.options.state.default}
      oninput="this.previousElementSibling.value = this.value"/>
    </>
  )
}
