Yahara.AlbumsShowRoute = Ember.Route.extend({
  model: function(params) {
    return this.modelFor('albums').findBy('slug', params.slug);
  },

  actions: {
    playPause: function (track){
      if (track.get('playing')) {
        this.controllerFor('player').send('pause');
      }
      else {
        this.controllerFor('player').send('play', track);
      }
    },

    collect: function(){
      if (Yahara.currentUser.get('authorized')) {
        var album = this.modelFor('application').toJSON();

        ic.ajax.request({
          type: "POST",
          url: ENV.HOST + "/collection",
          data: album
        });
      } else {
        this.send('openModal');
      }
    }
  }
});