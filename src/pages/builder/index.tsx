import './style.scss'

import Collapse from "~/components/Collapse";
import Page from "~/components/Page";

import useStore from './store'

export default function builder () {
  useStore()
  return (
    <Page title="Vote Builder"> 
      <div>
        <Collapse title="Submission" >
          <Collapse title="Vote Type:" h="4">
            radio:<br/>
              • Manual<br/>
              • Implicit<br/>
              • External<br/>

            <br/>
            If Manual: <br/>
              • Upvote <br/>
              • Upvote + Downvote <br/>

              • integer Rating [input min,max] <br/>
              • percentage Allocation <br/>
              • Star Rating [5,10] <br/>

              • ranking<br/>

              • binary comparison<br/>

              • none (voting not allowed)<br/>
              • tag vote [tags] (like emote reactions)<br/>

            <br/>
            If Implicit:<br/>
              • time interactive/engagement<br/>
              • view count<br/>
              • edit count<br/>
              • comment count<br/>
              • content

            <br/>
            If External(/functional?):<br/>
              • API
          </Collapse>

          <Collapse title="Vote Limit:" h="4">
            radio: <br/>
              • unlimited <br/>
              • limited [input]<br/>
              • Dynamic [function api(views, submissions)]<br/>
          </Collapse>

          <Collapse title="Calculation:" h="4">
            radio: <br/>
              • unanimous<br/>
              • Majority rule<br/>
              • Super Majority {"50 > input < 100"}<br/>
              • plurality<br/>
              • ranked choice / instant runoff<br/>
              • up-vote/score approval voting <br/>
              • deprecating vote (the more you vote the less they are worth, uniformly)<br/>
              • weighted random<br/>
              • single transferable vote<br/>
          </Collapse>
          
        </Collapse>

        <Collapse title="Edit Level">
          <p>Inherit Submission Level</p>
        </Collapse>

        <Collapse title="Comment Level">
          <p>Inherit Submission Level</p>
        </Collapse>
      </div>
    </Page>
  )
}