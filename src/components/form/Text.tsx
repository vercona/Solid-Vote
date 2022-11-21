import {css} from "solid-styled"

export default function Text(props: {
  label: string
}) {
  //css` `
  return (<> <label>{props.label}:</label> <input type="text"/><br/></>)
}
