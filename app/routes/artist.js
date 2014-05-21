Yahara.ArtistRoute = Ember.Route.extend( Yahara.ResetScroll, {
  model: function(params) {
    return ic.ajax.request(ENV.HOST + "/artist/" + params.artistSlug);
  },

  setupController: function(controller, model){
    this._super(controller, model);
    if (!Ember.isEmpty(model.songkick_artist_id)){
      ic.ajax.request(ENV.HOST+"/songkick/"+model.songkick_artist_id).then(function(resp){
        controller.set('songkick', JSON.parse(resp));
      });
    } else {
      controller.set('songkick', null)
    }
  }
});
