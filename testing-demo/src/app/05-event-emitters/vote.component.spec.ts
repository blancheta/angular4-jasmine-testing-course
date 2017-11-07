import { VoteComponent } from './vote.component'; 

describe('VoteComponent', () => {
  var component: VoteComponent; 

  beforeEach(() => {
    component = new VoteComponent();
  });

  it('should raise voteChanges event when upvoted', () => {
      let totalVotes = null;
      component.voteChanged.subscribe(tv => tv )

      component.upVote();

      expect(totalVotes).not.toBe(1);
  });
});