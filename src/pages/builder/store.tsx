import { createStore } from "solid-js/store";

/* let components = {
  collapese: Collapese
} */

export default function useStore() {
  let form = [
    {
      label: 'Termination Condition', type: 'category',
      content: [
        'none',                   // Continuos
        'Fixed Duration',         // Has time based end
        'Conditional Termination' // Condition based end (self api?)
      ]
    },

    {
      label: 'Win Count', type: 'category',
      content: [
        'Fixed Winners',     // min or max threshold (will terminate vote if condition set w/ threshold, or will calculate in post)
        'Unlimited Winners', // No limit to number of winners, continuous or in post
        'No Winners'         // People can rank and vote, but no events or states will denote winners
      ]
    },

    {
      label: 'Win Condition?', type: 'category',
      // if Continuos && Fixed Winners or Unlimited Winners
      // maybe have this be a major set w/ appropriate vote/calc types 
      content: [
        'Threshold', // if threshold reached, deem winner (freeze or continue voting? post-win-event handling?)
      ]
    },

    {
      label: 'Vote Type', type: 'category',
      content: [
        'Manual',    // users have a vote interface
        'Implicit',  // submission-properties api used (view count etc.)
        'External'   // some other api use to determine winners
      ]
    }

    
    
  ]
}

/*

## Options

- All submissions hidden, click to reveal, timer starts
based on size of submission, determine how long it would take to review
after timer hits that threshold, a usr can vote for it.

- Hide Other vote counts


event based vs continuous threshold based

multi winner single winner

random 

number of winners

vote limit pas through to children

workflow: pass results of one vote onto another vote. can simulate a republic this way


import './style.scss'

import Collapse from "~/components/Collapse";
import Page from "~/components/Page";


tier lists

export default function builder () {
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


*/