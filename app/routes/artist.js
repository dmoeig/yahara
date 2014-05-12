Yahara.ArtistRoute = Ember.Route.extend({
  model: function(params) {
    return ic.ajax.request(ENV.HOST + "/artist/" + params.artistSlug)
  }
});
