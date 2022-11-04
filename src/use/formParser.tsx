
import { Dynamic } from 'solid-js/web'


import Collapse from "~/components/Collapse";
import Radio from "~/components/Radio";

let componentMap = {
  category: Collapse,
  radio: Radio,

  text: props => (<> <label>{props.options.label}:</label> <input type="text"/></>),
  range: props => (<>
    <label>{props.options.label}:</label>
    <input
      type="range" min={props.options.state.min} max={props.options.state.max} value={props.options.state.default} 
      oninput="this.nextElementSibling.value = this.value"
    />
    <input type="text" value={props.options.state.default}
    oninput="this.previousElementSibling.value = this.value"/>
  </>)
}


export default function formParser(arr) {
  console.log(arr)
  let componentArr = []

  for (let el of arr) {
    let children = []
    if (el.content) {
      children = formParser(el.content)
    }

    let comp = componentMap[el.el]
    let foo = <Dynamic component={comp} options={el}> {children} </Dynamic>
    componentArr.push(foo)
  }

  return componentArr
}
