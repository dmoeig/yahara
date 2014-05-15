Yahara.AlbumsIndexRoute = Ember.Route.extend( Yahara.ResetScroll, {
  model: function() {
    return this.modelFor('application').albums;
  }
});
