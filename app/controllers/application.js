Yahara.ApplicationController = Ember.ObjectController.extend({
  searchString: null,
  albums: Ember.A(),

  getAlbums: function(){
    this.get('filteredAlbums');
  }.on('init'),

  filteredAlbums: function(){
    var searchString = this.get('searchString');
    if (searchString) {
      return this.get('albums').filter(function(album) {
          var regex = new RegExp('\\b'+ searchString, 'i');
          return regex.test([album.get('title'), album.get('artist_name')].join(" "));
      });
    }
    else {
      return this.get('albums');
    }
    return this.get('albums');
  }.property('albums.[]', 'searchString'),

  searchTransition: function(){
    if (this.get('filteredAlbums.length') === 1){
      this.transitionToRoute('albums.show', this.get('filteredAlbums.firstObject'));
    }
    else {
      this.transitionToRoute('/');
    }
  }.observes('searchString')
});
