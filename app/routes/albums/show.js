Yahara.AlbumsShowRoute = Ember.Route.extend({
  model: function(params) {
    return this.modelFor('application').albums.findBy('slug', params.slug);
  }
});
