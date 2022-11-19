import {css} from "solid-styled"

export default function Text(props) {
  //css` `
  return (<> <label>{props.options.label}:</label> <input type="text"/><br/></>)
}
