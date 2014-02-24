Yahara.AlbumsRoute = Ember.Route.extend({
  model: function() {
    return Yahara.Album.fetch();
  }
});
