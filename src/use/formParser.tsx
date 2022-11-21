
import { Dynamic } from 'solid-js/web'


import Collapse from "~/components/form/Collapse";
import Radio from "~/components/form/Radio";
import Range from "~/components/form/Range";
import Text from "~/components/form/Text";

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
