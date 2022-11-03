import { createStore } from "solid-js/store";

/* let componentMap = {
  category: Collapse  // type key => component
} */

let algorithmConfigs = {
  /** 1 Vote, 1 Winner (vote-type: bool) **/
  'unanimous': {
    description: '1 submission must get all votes to win',
    settings: [] // (all = voted or members? what if people don't vote)
  },
  'Majority rule': {
    description: '1 submission gets more than half votes',
    settings: []
  },
  'Super Majority': {
    description: '1 submission gets more than specified count (50 > input < 100)',
    settings: [
      {
        label: 'percent to pass',
        type: 'range', key: '',
        options: { min: 50, max: 100, default: 66.6666 } // could this be dynamic?
      }
    ]
  },


  /** Winner >= 1 winner (vote-type: bool) **/
  'plurality': { // if 1 vote
    description: '1 submission, most votes win',
  },
  'approval voting': { // if vote limit > 1
    description: 'Many submissions, most votes win',
  },


  /** Ranked Vote (vote-type: int) **/
  'instant runoff': { // if 1 winner
    description: 'eliminate fewest votes and redistribute till a submission has more than half of votes',
  },
  'single transferable vote': { // fixed winners > 1
    description: 'redistribute overflow and losers till (100% / winners) hit'
    // does this have to be fixed? could winners be dynamic too?
  },

  
  /** Value Modifiers **/
  'depreciating vote': { // if vote-limit > 1  (vote-type: bool, upvote/downvote compat +1/-1)
    description: 'the more votes the less they are worth, uniformly. most votes win.'
  },
  'weighted random': { // (vote-type: numeric) up/down-vote and rank compat
    description: 'vote skews random selection.',
  },


  /** for rankings (vote-type: int) **/
  'largest average': {
    description: 'Rank preferences summed and largest divided by number of votes. Largest wins.',
  },
  'largest mode': {
    description: 'for each entry, select the most common rank. largest rank with most votes wins.',
    settings: [
      {
        label: 'Count most votes',
        type: 'radio', key: '',
        options: [ // first is default
          'Count all votes.',
          'Count votes of mode.'
        ]
      }
    ]
  },

  /* binary comparisons */ // these may benefit special termination conditions (eg: all comparisons covered by at least x people)
  'win percentage': { // (vote-type: ???)
    description: 'Whichever has highest win rate by end is the winner.',
    settings: [
      {
        label: 'Enable Pass?',
        type: 'radio', key: '',
        options: [ // first is default
          'No',
          'Yes'
        ]
      }
    ]
  },
  'condorcet': { // if submission limit <= 5. (vote-type: bool)
    description: 'compare all binary submission combinations. If ones victories are unanimous, declare winner.',
    settings: []
  }
}


export default function useStore() {
  let form = [
    {
      label: 'Core Setting', type: 'heading',
      content: [ 
        {
          label: 'Termination Condition', type: 'radio',
          content: [
            'none',                    // Continuos
            'Fixed Duration',          // Has time based end
            'Conditional Termination', // Condition based end (self api?)
            'Vote limit'               // fixed amount of votes available. Doesn't end till they run out
          ]
        },
        
        {
          label: 'Win Count', type: 'radio',
          content: [
            { 
              label: 'Fixed Winners',  
              type: 'range'      // min or max threshold (will terminate vote if condition set w/ threshold, or will calculate in post)
            },
            'Unlimited Winners', // No limit to number of winners, continuous or in post
            'No Winners'         // People can rank and vote, but no events or states will denote winners (like reddit)
          ]
        }
      ]
    },

    {
      label: 'Submission Settings', type: 'category',
      content: [
        {
          label: 'Submission Limit', type: 'input',
        },
        {
          label: 'Submission Vitality', type: 'radio',
          content: [
            'Expiration',
            'lock on win'  // if continuous (otherwise winners are calculated in post)
          ]
        }
      ]
    },

    {
      label: 'Voting', type: 'category',
      content: [
        {
          label: 'Vote Type', type: 'radio',
          content: [
            'Manual',     // users have a vote interface
            'Implicit',   // submission-properties api used (view count etc.)
            'External',   // some other api use to determine winners
            'Random',     // Winner(s) selected at random
          ]
        },

        {
          label: 'Input Limit', type: 'radio', // ie vote limit per user
          // if manual
          content: [
            'unlimited',        // like reddit
            'limited [input]',  // 1 = normal vote, n = could be ranked etc.
            'Dynamic [function api(views, submissions, user)]' // some individuals may have diff vote limits
          ]
        },

        {
          label: 'Input Options', type: 'radio',
          // if manual
          content: [
            'Upvote',                  // +1/true      int/bool
            'Upvote/Downvote',         // +1/-1   int
    
            'Rating [min, max, step]', // 1 <= numeric, step = 0.5 or 1
            'Star Rating [5,10]',      // 0 < numeric <=10

            'Percentage Allocation',   // 0 < numeric <= 100
    
            'ranking',                 // int (ui text input + up down arrow)
            'tier lists',              // int (may map to fixed set of strings)
    
            'binary comparison',       // bool
    
            'tag vote [tags]'          // multi-bool (like emote reactions) [custom algorithm]
          ]
        },

        {
          label: 'Input Config', type: 'config',
          // if Input has config option
          // Input specific config options 
        },

        {
          label: 'Implicit Options', type: 'radio',
           // if implicit (may need api and callback bs cuz this is pretty project specific)
           // maybe checkbox, multiple values could be relevant
           // or just use have custom function with these exposed via api.
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
        }
      ]
    },


    {
      label: 'Calculation', type: 'category',
      content: [
        {
          label: 'Calculation Type', type: 'category',
          content: [
            'Provided',  // use one of our provided methods 
            'External',  // some other api use to determine winners
            'Custom',    // pass callback function
            'threshold'  // If Continuos && (Fixed Winners or Unlimited Winners)
            // if threshold reached, add winner (freeze or continue to allow voting? post-win-event handling?)
          ]
        },
      
        {
          label: 'Provided', type: 'category',
          // if Provided. perhaps use type matching for first pass simple validation
          content: [ 
            {
              label: 'Algorithms', type: 'radio', 
              content: `$algorithmConfigs file ref`
            },
            {
              label: 'Algorithms Config', type: 'config',
              // if Provided. perhaps use type matching for first pass simple validation
              // algorithm specific config options 
            }
          ]
        },

        { 
          label: 'Threshold', type: 'category',
          // if Threshold.
          content: [
            {
              label: 'Threshold Algorithms', type: 'radio', 
              content: [
                'barrier to entry', // minimum threshold value to be added to "winners" (numeric)
              ]
            }            
          ]
        }

        /* 
          idk what these are gonna look like yet
          { label: 'External'  },
          { label: 'Custom'    }
        */
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

  vote limit pass through to children (ie shared vote count)

  workflow: pass results of one vote onto another vote. can simulate a republic this way
  <Collapse title="Edit Level">
    <p>Inherit Submission Level</p>
  </Collapse>

  <Collapse title="Comment Level">
    <p>Inherit Submission Level</p>
  </Collapse>


  // votes weighted by individual? custom algo.

  // idk what to do for ties etc.
*/ 


/*
I think i need to:
  • flesh-out algorithmConfigs and add inputConfigs
  • assign components to types (aside from star, most inputs are basic html)
  • write frontend code to generate ui (ez)
  • write algorithms to get winners
  • add database to crud data

  • simulate submissions and voting to test

  • move algorithms and schema to their own repo (share as package, document considerations for database schema) 


oh right gotta add validators to both visibility and datatypes

hmm... but if i add validators i lose agnostic value 
I can valid form inputs i think
but conditional logic? prob not...
if thats the case i may as well just target js for now
so i'll allow functions...

ah! right… i can just use a key to move validators to their own objects and map them
i can do that l8r tho
easier to colocate atm

should prob rename upvote simply to vote

idk if managing “can submit”, “can vote” or “vote start” would make sense
prob not


was thinking of both individual vote limits and shared. 
but ultimately, a shared vote could just be a custom termination condition

im having trouble deciding where to draw the line on what options to provide vs what can be managed externally
like the vote system could simple wait to receive a “stop” event/callback, to end voting.

then devs could track vote count and emit “stop” via their own system and i don’t have to worry about it. 
idk there’s a whole api surface area issue i haven’t totally figured out yet
will probably be easier to solve as i build it


is 100% those who vote or member ship (those who can vote)
cuz not everyone will vote...


ranked winners or equal winners?
*/

let t =`
// 1D map of form input values
let selection = {
  [key]: value
}

let formBuilderSchema = [
  {
    key: '',  // maps to selection object for validation (must be unique)
    label:'', // display name - if applicable
    type:'',  // type will map to a component
    content: [/*...*/], // child components, elements, and values
    show() {},  // given data in selection, is this item visible/disabled
    validate() {}  // is data in selection, valid for given key?
  },
  /*...*/
]


`