/* import { Title } from "@solidjs/meta"; */
import { css } from "solid-styled"

export default function page (props:{
  title: string,
  children
}) {
  css`
    .page-wrapper {
      margin: 5% 0 5% 20%
    }
  `

  return (<>
    {/* <Title> {props.title} </Title> */}

    <main class="page-wrapper">
      <h1>{props.title}</h1> <br/>
      <div>{props.children}</div>
    </main>
  </>)
}