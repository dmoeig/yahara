Yahara.ArtistController = Ember.ObjectController.extend({

  songkick: null,

  hasSongkick: function(){
    return !Ember.isEmpty(this.get('songkick'));
  }.property('songkick'),

  hasEvents: function(){
    return this.get('songkick.resultsPage.totalEntries') > 0;
  }.property('songkick')
});
