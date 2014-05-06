Yahara.AlbumsShowRoute = Ember.Route.extend({
  model: function(params) {
    return this.modelFor('application').albums.findBy('slug', params.slug);
  },

  actions: {
    download: function(format){
      this.modelFor('albums.show').download(format);
    }
  }
});
