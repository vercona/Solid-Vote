import { css } from 'solid-styled';
import Page from "~/components/Page";

/**  Form Components  **/
import Collapse from "~/components/form/Collapse";
import Radio from "~/components/form/Radio";
import Range from "~/components/form/Range";
import Text from "~/components/form/Text";


/**  Vote Components  **/
import Vote from "~/components/vote/Vote";
import UpDown from "~/components/vote/UpDown";

import Rate from "~/components/vote/Rate";
import Stars from "~/components/vote/Stars";

import Percent from '~/components/vote/Percent';

import Rank from "~/components/vote/Rank";
import Tier from '~/components/vote/Tier';

import Compare from '~/components/vote/Compare';
import TagArr from '~/components/vote/TagArr';

export default function Home() {
  //css` `

  return (
    <Page title='components'>
      <main>
        <Collapse label="Form">
          <Collapse label="Category"> content </Collapse>
          <Radio label="hi" choices={['one', 'two']}/>

          <Range label="hi" state={ {min:0, max:1, default: 0.5} } />

          <br/>
          <Text label="hi" />
        </Collapse>

        <Collapse label="Vote">
          <div>
            <div> <Vote/> count </div>
            <div> <UpDown> count </UpDown> </div>
            <Rate/>
            <Stars/>
            <Percent/>
            <Rank/>
            <Tier/>
            <Compare/>
            <TagArr/>
          </div>
        </Collapse>
      </main>
    </Page>
  );
}
