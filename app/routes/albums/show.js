Yahara.AlbumsShowRoute = Ember.Route.extend( Yahara.ResetScroll, {
  model: function(params) {
    return this.modelFor('application').albums.findBy('slug', params.slug);
  }
});
