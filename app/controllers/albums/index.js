Yahara.AlbumsIndexController = Ember.ArrayController.extend({
  needs: ['application'],
  searchString: Ember.computed.alias('controllers.application.searchString'),
  empty: Ember.computed.empty('filteredContent.[]'),

  filteredContent: function(){
    var searchString = this.get('searchString');
    if (searchString) {
      return this.get('content').filter(function(album) {
          var regex = new RegExp('\\b'+ searchString, 'i');
          return regex.test([album.get('title'), album.get('artist_name')].join(" "));
      });
    }
    else {
      return this.get('content');
    }
    return this.get('content');
  }.property('content', 'searchString'),

  mover: function(){
    if (this.get('filteredContent.length') === 1){
      this.transitionToRoute('albums.show', this.get('filteredContent.firstObject'));
    }
    else {
      this.transitionToRoute('/');
    }
  }.observes('filteredContent.@each')

});
