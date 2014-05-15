Yahara.ArtistRoute = Ember.Route.extend( Yahara.ResetScroll, {
  model: function(params) {
    return ic.ajax.request(ENV.HOST + "/artist/" + params.artistSlug);
  }
});
