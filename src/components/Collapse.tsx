import {css} from "solid-styled"

export default function collapse (props) {
  css`
    h3 { 
      display: inline;
    }

    details {
      cursor: pointer;
      user-select: none;

      width: 50%;
      margin-bottom: 20px
    }

    details > main {
      margin-left: 20px
    }
  `

  return (
    <details>
      <summary> <h3>{props.title}</h3> </summary>
      <main>
        {props.children}
      </main>
    </details>
  )
}