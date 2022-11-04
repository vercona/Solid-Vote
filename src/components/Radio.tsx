import {css} from "solid-styled"
import {Dynamic} from "solid-js/web";

import {createSignal, For, Show} from "solid-js";
import formParser from '~/use/formParser'

export default function radio (props) {
  // will link state to global store l8r
  let [selected, setSelected] = createSignal(props.options.choices[0]) // first option is default (if-applicable)

  return (<>
    <details>
      <summary><strong>{props.options.label}:</strong>  {selected().label || selected()}</summary>
      
      <For each={props.options.choices}>
        {(item, index) => {
          let key = props.options.label.replace(/\s+/,'')
          let label = typeof item === 'string' ? item : item.label
          return (
            <div style="margin-left:10px" onClick={e=>setSelected(item)}>
              <input
                type="radio" id={key+index} name={key}
                checked={selected()===item || selected().label===item}
              />
              <label> {label}</label> <br/>
            </div>
          )
        }}
      </For>
      <br/>
      <Show when={selected().settings && selected().settings.length > 0} >
        <div style="margin-left: 10px">
          <strong>Settings:</strong>
          <div style="margin-left: 10px">
            {formParser(selected().settings)}
          </div>
        </div>
      </Show>
    </details>
  </>)
}