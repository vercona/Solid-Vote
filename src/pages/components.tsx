import Collapse from "~/components/form/Collapse";
import Radio from "~/components/form/Radio";
import Range from "~/components/form/Range";
import Text from "~/components/form/Text";

import { css } from 'solid-styled';

export default function Home() {
  css` `

  return (
    <main>
      <Collapse label="hi">
        hi
      </Collapse>

      <Radio label="hi" choices={[]}/>

      <Range label="hi" state={ {min:0, max:1, default: 0.5} } />

      <br/>
      <Text label="hi" />
    </main>
  );
}
