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
      <h1>Hello world!</h1>
      <Counter />
      <p>
        Go to 
        <a href="./builder">
          Builder
        </a>
      </p>
    </main>
  );
}
