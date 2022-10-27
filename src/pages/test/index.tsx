/* import { Title } from "solid-start"; */
import Counter from "~/components/Counter";
import './style.scss'

export default function Home() {
  return (
    <main>
      {/* <Title>Hello World</Title> */}
      <h1>Hello world!</h1>
      <Counter />
      <p class="test">
        Visit{" "}
        <a href="https://start.solidjs.com" target="_blank">
          AAHHHH
        </a>{" "}
        to learn how to build SolidStart apps.
      </p>
    </main>
  );
}
