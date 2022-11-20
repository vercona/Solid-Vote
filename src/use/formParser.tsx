
import { Dynamic } from 'solid-js/web'


import Collapse from "~/components/Collapse";
import Radio from "~/components/Radio";
import Range from "~/components/Range";
import Text from "~/components/Text";

let componentMap = {
  category: Collapse,
  radio:    Radio,
  text:     Text,
  range:    Range
}


export default function formParser(arr) {
  let componentArr = []

  for (let el of arr) {
    let children = []
    if (el.content) {
      children = formParser(el.content)
    }

    let comp = componentMap[el.el]
    let foo = <Dynamic {...el} component={comp}> {children} </Dynamic>
    componentArr.push(foo)
  }

  return componentArr
}
