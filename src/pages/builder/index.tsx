import './style.scss'

import Page from "~/components/Page";

import useStore from './store'
import { Dynamic } from 'solid-js/web'
import { For }  from 'solid-js'

/* interface Form {
  label: 'Submission Settings',
  type: 'category',
  content: [],
} */

import Collapse from "~/components/Collapse";

let componentMap = {
  category: Collapse, // type key => component
  text: props => (<> <label>{props.options.label}:</label> <input type="text"/></>),
  radio: props => (<>
    <div>{props.options.label}:</div>
    <For each={props.options.choices}>
      {(item) => ( <div style="margin-left:10px">• {item()}</div> )}
    </For>
  </>),
  heading: props => (<h2>{props.label}</h2>),
  range: props => (<><label>{props.label}</label> <input type="range" min={props.options.min} max={props.options.max} value={props.options.default}/></>)
}


function parseForm(arr) {
  console.log(arr)
  let componentArr = []

  for (let el of arr) {
    let children = []
    if (el.content) {
      children = parseForm(el.content)
    }

    let comp = componentMap[el.el]
    let foo = <Dynamic component={comp} options={el}> {children} </Dynamic>
    componentArr.push(foo)
  }

  return componentArr
}



export default function builder () {
  let arr = useStore()
  /* let arr = [
    {
      label: 'Submission Settings', type: 'category',
      content: [
        {
          label: 'Submission Limit', type: 'text',
        },
        {
          label: 'Submission Vitality', type: 'radio',
          options: [
            'Expiration',
            'lock on win'
          ]
        }
      ]
    },

    {
      label: 'HMM', type: 'category',
      content: [
        {
          label: 'Deeper!', type: 'category',
          h: '4',
          content: [
            {
              label: 'another input', type: 'text',
            }
          ]
        },
      ]
    }
  ]
 */
  return (
    <Page
      title="Vote Builder"
    > {parseForm(arr)} </Page>
  )
}