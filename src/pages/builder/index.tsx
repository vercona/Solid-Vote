import './style.scss'

import Collapse from "~/components/Collapse";
import Page from "~/components/Page";

export default function builder () {
  return (
    <Page title="Vote Builder"> 
      <div>
        <Collapse title="Submission">
          <p>banana</p>
        </Collapse>

        <Collapse title="Edit/Comment Level">
          <p>banana</p>
        </Collapse> 
      </div>
    </Page>
  )
}