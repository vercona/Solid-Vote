import { createStore } from "solid-js/store";

/* let components = {
  category: Collapse
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
        'Random'
      ]
    },

    {
      label: 'Vote Type', type: 'category',
      content: [
        'Manual',     // users have a vote interface
        'Implicit',   // submission-properties api used (view count etc.)
        'External',   // some other api use to determine winners
        'Random',     // Winner(s) selected at random
      ]
    },

    {
      label: 'Input Options', type: 'category',
      // if manual
      content: [
        'Upvote',
        'Upvote + Downvote',

        'integer Rating [input min,max]',
        'percentage Allocation',
        'Star Rating [5,10]',

        'ranking',
        'tier lists',

        'binary comparison',

        'tag vote [tags] (like emote reactions)'
      ]
    },

    {
      label: 'Input Limit', type: 'category',
      // if manual
      content: [
        'unlimited',
        'limited [input]',
        'Dynamic [function api(views, submissions)]'
      ]
    },

    {
      label: 'Implicit Options', type: 'category',
       // if implicit (may need api and callback bs cuz this is pretty project specific)
      content: [
        'time interactive/engagement',
        'view count',
        'edit count',
        'comment count',
        'content',
      ]
    },

    {
      label: 'External Options', type: 'category',
      // if external: connects to external api...
      content: [ ]
    },

    {
      label: 'Calculation Type', type: 'category',
      content: [
        'Provided',  // use one of our provided methods 
        'External',  // some other api use to determine winners
        'Custom'     // pass callback function
      ]
    },
  
    {
      label: 'Calculation Options', type: 'category',
      // if Provided. perhaps use type matching for first pass simple validation
      content: [
        'unanimous',
        'Majority rule',
        'Super Majority {"50 > input < 100"}',
        'plurality',
        'ranked choice / instant runoff',
        'up-vote/score approval voting',
        'diminishing/depreciating vote (the more you vote the less they are worth, uniformly)',
        'single transferable vote',
        'weighted random',
      ]
    }
  ]
}


/*
## Extensions Beyond Vote Builder
  - All submissions hidden, click to reveal, timer starts
  based on size of submission, determine how long it would take to review
  after timer hits that threshold, a usr can vote for it.

  - Hide Other vote counts


  vote limit pass through to children

  workflow: pass results of one vote onto another vote. can simulate a republic this way
  <Collapse title="Edit Level">
    <p>Inherit Submission Level</p>
  </Collapse>

  <Collapse title="Comment Level">
    <p>Inherit Submission Level</p>
  </Collapse>
*/ 
