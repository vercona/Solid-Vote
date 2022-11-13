# Agnostic Multi-Modal Voting Manager


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


  // idk what to do for ties etc.



I think i need to:
  • assign components to types (aside from star, most inputs are basic html)
  • write frontend code to generate ui (ez)
  • add validators to both visibility and datatypes ( use a key to move validators to their own objects and map them ie like components)
  • write algorithms to get winners
  • add database to crud data

  • simulate submissions and voting to test

  • move algorithms and schema to their own repo (share as package, document considerations for database schema) 


explicit submission and vote periods? simultaneous vote and submit?
idk if managing “can submit”, “can vote” or “vote start” would make sense
prob not

for multiple winners, should they retain "place"/"rank" or should they all be treated equally?

is 100% those who vote or member ship (those who can vote)
cuz not everyone will vote...


was thinking of both individual vote limits and shared. 
but ultimately, a shared vote could just be a custom termination condition


what options to provide vs what can be managed externally
like the vote system could simple wait to receive a “stop” event/callback, to end voting.
then devs could track vote count and emit “stop” via their own system


let formBuilderSchema = [
  {
    key: '',  // maps to selection object for validation (must be unique)
    label:'', // display name - if applicable
    type:'',  // type will map to a component
    content: [], // child components, elements, and values
    show() {},  // given data in selection, is this item visible/disabled
    validate() {}  // is data in selection, valid for given key?
  }
]


vote timeout

similar input aggregation

most submitted vote

replace entirety of voting app with custom plugin if needs not satisfied

live vote count

roles who can submit vs who can vote

moderator - accept to sub to enable voting

maintainer - controls what makes it or not

manual events vs recurring, scheduled events.

elimination voting

submission exportation

rfc's (request for comments)

how to handle live vote view, if at all

can inly see votes after submit
can only vote if has submitted
selection locked after vote: “no take backsies”
