import {css} from "solid-styled"
import {Dynamic} from "solid-js/web";

export default function collapse (props) {
  css`
    .collapse-title { 
      display: inline;
    }

    details {
      cursor: pointer;
      user-select: none;

      width: 100%;
      margin-bottom: 20px
    }

    details > main {
      margin-left: 20px
    }
  `

  return (
    <details>
      <summary> 
        <Dynamic 
          class="collapse-title" 
          component={'h'+ (props.h || '3')} 
          use:solid-styled
        >
          {props.title}
        </Dynamic>
      </summary>
      <main>
        {props.children}
      </main>
    </details>
  )
}