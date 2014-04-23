Yahara.AlbumsIndexController = Ember.ArrayController.extend({
  needs: ['application'],
  searchString: Ember.computed.alias('controllers.application.searchString'),

  filteredContent: function(){
    var searchString = this.get('searchString');
    if (searchString) {
      return this.get('content').filter(function(album) {
          return album.get('title').toLowerCase().indexOf(searchString.toLowerCase()) !== -1 ||
                 album.get('artist_name').toLowerCase().indexOf(searchString.toLowerCase()) !== -1;
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
