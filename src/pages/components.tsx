import Collapse from "~/components/Collapse";
import Radio from "~/components/Radio";
import Range from "~/components/Range";
import Text from "~/components/Text";

import { css } from 'solid-styled';

export default function Home() {
  css` `

  return (
    <main>
      <Collapse label="hi">
        hi
      </Collapse>

      <Radio label="hi" />

      <Range label="hi" state={ {min:0, max:1, default: 0.5} } />

      <br/>
      <Text label="hi" />
    </main>
  );
}
