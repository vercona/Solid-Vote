import { createStore } from "solid-js/store";

/* let componentMap = {
  category: Collapse  // type key => component
} */

let algorithmConfigs = {
  'unanimous': {
    // if 1 vote, 1 submission gets all votes (type: bool/int) (all = voted or members? what if people don't vote)
  },                           
  'Majority rule':{
    // if 1 vote, 1 submission gets more than half votes (type: bool/int)
  },                      
  'Super Majority {"50 > input < 100"}':{
    // if 1 vote, 1 submission gets more than specified count (type: bool/int)
  },  

  // allow for multi winner for these 2? 
  'plurality':{
    // if 1 vote, most votes win (type: bool/int)
  },                           
  'up-vote/score approval voting':{
    // if vote limit > 1, most votes win (type: bool/int)
  },       

  'instant runoff':{
    // if ranked, eliminate fewest votes and redistribute till submission has more than half of votes,  (type: int)
  },                      
  'single transferable vote':{
    // fixed winners, ranked, redistribute overflow and losers till hit (type: int)
  },           
  
  'diminishing/depreciating vote':{
    // if vote limit > 1, the more votes the less they are worth, uniformly. most votes wins (type: int/bool, upvote/downvote compat +1/-1)
  },      
  'weighted random':{
    // vote skews random selection (type: numeric)
  },                    

  // for rankings
  'largest average':{
    // average ranking values and take the top
  },                 
  'largest mode':{
    // mode ranking and take the top
  },                        

  // for binary comparison
  'win percentage':{
    // what ever has highest win rate
  },                        
  'condorcet':{
    // if submission limit <= 5. unanimous winner
  },                              
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
          label: 'Input Limit', type: 'radio',
          // if manual
          content: [
            'unlimited',
            'limited [input]',
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
              content: [
                // These 3 are the same underlying algorithm.
                'unanimous',                           // if 1 vote, 1 submission gets all votes (type: bool/int) (all = voted or members? what if people don't vote)
                'Majority rule',                       // if 1 vote, 1 submission gets more than half votes (type: bool/int)
                'Super Majority {"50 > input < 100"}', // if 1 vote, 1 submission gets more than specified count (type: bool/int)

                // allow for multi winner for these 2? 
                'plurality',                           // if 1 vote, most votes win (type: bool/int)
                'up-vote/score approval voting',       // if vote limit > 1, most votes win (type: bool/int)

                'instant runoff',                      // if ranked, eliminate fewest votes and redistribute till submission has more than half of votes,  (type: int)
                'single transferable vote',            // fixed winners, ranked, redistribute overflow and losers till hit (type: int)
                
                'diminishing/depreciating vote',       // if vote limit > 1, the more votes the less they are worth, uniformly. most votes wins (type: int/bool, upvote/downvote compat +1/-1)
                'weighted random',                     // vote skews random selection (type: numeric)

                // for rankings
                'largest average',                     // average ranking values and take the top
                'largest mode',                        // mode ranking and take the top

                // for binary comparison
                'win percentage',                       // what ever has highest win rate
                'condorcet'                             // if submission limit <= 5. unanimous winner
              ]
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
