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

multiRate: eg, rating multiple qualities of something. say a story where you are rating character, plot, etc

spectrum rating: for polar rating  simple<==>complex

ability to Veto

what if you want 2 winners via two diff algos? e.g. i want he mean and mode

how do i init default values on keyArr/valArr tho?...
actually, it may be difficult to provide defaults given the interconnected nature of the validators. a simple change could invalidate the whole form.

what about simply point allocation rather than strictly percentage...?

binary comparison is a little tough as it must format how submissions are displayed...

how to handle simultaneous votes [2 diff role groups, or for two diff rating/positions] on the same dataset/submission-set

how to handle comment/sub level voting?
(
  i don't want to create a new voting event for each sub level...
  and data may need to be shared... hmm
)


TODO:

so i’ll replace ‘key’ with ‘value’
i’ll add ‘show’ all elements
show: 'category-…' or 'choice-…'
not everything needs show
but anything could at any point down the line
to generate show arr, look for both show and value keys
perhaps there is a way to mark/denote an el/component produces a value?
valueStore will be init with null and values must be explicitly set. if a previously set value is changed and invalidation occurs, alert to errors if possible else… reset invalid to null?

enable conversion to html/yml

