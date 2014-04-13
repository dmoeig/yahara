Yahara.ArtistRoute = Ember.Route.extend({
  model: function(params) {
    return this.modelFor('application').albums.findBy('artistSlug', params.artistSlug);
  }
});
