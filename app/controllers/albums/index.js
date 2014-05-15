Yahara.AlbumsIndexController = Ember.ArrayController.extend({
  needs: ['application'],
  searchString: Ember.computed.alias('controllers.application.searchString'),
  filteredAlbums: Ember.computed.alias('controllers.application.filteredAlbums'),
  empty: Ember.computed.empty('filteredAlbums.[]')
});
