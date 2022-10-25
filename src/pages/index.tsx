import { Title } from "solid-start";
import Counter from "~/components/Counter";
import { css } from 'solid-styled';

export default function Home() {
  css`
    p {
      color: red;
    }
  `;

  return (
    <main>
      <Title>Hello World</Title>
      <h1>Hello world!</h1>
      <Counter />
      <p>
        Visit{" "}
        <a href="https://start.solidjs.com" target="_blank">
          start.solidjs.com
        </a>{" "}
        to learn how to build SolidStart apps.
      </p>
    </main>
  );
}
