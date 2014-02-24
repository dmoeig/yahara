Yahara.AlbumsIndexRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('albums');
  }
});